import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Tag,
  Settings,
  CheckSquare,
  QrCode,
  Landmark,
  Headphones,
  Calendar,
  Upload,
  Bell,
  Award,
  BookOpen,
  GraduationCap,
  FileSpreadsheet,
  Scroll,
  Pointer,
  User,
  CreditCard,
  Shield,
  Cloud,
  Users,
  Wrench,
  LogOut,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  FileWarning,
  HelpCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import '../institution-dashboard.css';
import RecordsView from './RecordsView';
import TemplatesView from './TemplatesView';

export default function InstitutionDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('Year');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [sideTab, setSideTab] = useState('issues');
  const [selectedIssueModal, setSelectedIssueModal] = useState(null);

  // Dynamic statistics state initialized with the synthetic records dataset
  const [stats, setStats] = useState({
    totalStudents: 4280,
    awardsLodged: 7,
    awardsFetched: 3,
    degree: 5,
    marksheet: 2,
    diploma: 1,
    attemptsYesterday: 14,
    attemptsTotal: 142,
  });

  // Data problems & missing fields notifications
  const [issuesList, setIssuesList] = useState([
    {
      id: 'iss-1',
      title: 'Missing APAAR / ABC ID',
      type: 'Missing Data',
      severity: 'error',
      description: '14 student records in B.Tech CSE (2021-25) batch are missing ABC_ACCOUNT_ID.',
      affectedCount: 14,
      category: 'APAAR Registry',
      missingField: 'ABC_ACCOUNT_ID',
      sampleStudents: [
        { name: 'Gokulnath S', roll: '21CS014', dept: 'CSE', missing: 'ABC_ACCOUNT_ID' },
        { name: 'Janani R', roll: '21CS019', dept: 'CSE', missing: 'ABC_ACCOUNT_ID' },
        { name: 'Karthik V', roll: '21CS022', dept: 'CSE', missing: 'ABC_ACCOUNT_ID' },
      ],
      actionText: 'Resolve',
    },
    {
      id: 'iss-2',
      title: 'Aadhaar Name Mismatch',
      type: 'Verification Error',
      severity: 'error',
      description: '6 records have character mismatch between AADHAAR_NAME and institutional CNAME.',
      affectedCount: 6,
      category: 'Identity Sync',
      missingField: 'AADHAAR_NAME',
      sampleStudents: [
        { name: 'Manoj Kumar T', roll: '21AI012', dept: 'AI & DS', missing: 'Spelling in AADHAAR_NAME' },
        { name: 'Naveen Raj P', roll: '21AI044', dept: 'AI & DS', missing: 'Initial format in AADHAAR_NAME' },
      ],
      actionText: 'Verify',
    },
    {
      id: 'iss-3',
      title: 'Missing DOB & Blood Group',
      type: 'Missing Data',
      severity: 'warning',
      description: '8 records in MBA Finance batch missing mandatory DOB or BLOOD_GROUP entries.',
      affectedCount: 8,
      category: 'Demographics',
      missingField: 'DOB, BLOOD_GROUP',
      sampleStudents: [
        { name: 'Swetha B', roll: '23MB004', dept: 'MBA', missing: 'DOB, BLOOD_GROUP' },
        { name: 'Tharun G', roll: '23MB018', dept: 'MBA', missing: 'BLOOD_GROUP' },
      ],
      actionText: 'Fill Data',
    },
    {
      id: 'iss-4',
      title: 'Student Photo Unattached',
      type: 'Missing Attachment',
      severity: 'warning',
      description: '3 student profiles uploaded without passport-size PHOTO attachment.',
      affectedCount: 3,
      category: 'Media Registry',
      missingField: 'PHOTO',
      sampleStudents: [
        { name: 'Vigneshwaran K', roll: '21IT005', dept: 'IT', missing: 'PHOTO (Passport spec)' },
        { name: 'Pavithra M', roll: '21IT041', dept: 'IT', missing: 'PHOTO (Passport spec)' },
      ],
      actionText: 'Attach',
    },
    {
      id: 'iss-5',
      title: 'Subject Internal (CE) Marks Incomplete',
      type: 'Assessment Pending',
      severity: 'info',
      description: 'Batch BE-ECE SUB1_CE_MRKS pending faculty internal continuous evaluation upload.',
      affectedCount: 12,
      category: 'Academics',
      missingField: 'SUB1_CE_MRKS',
      sampleStudents: [
        { name: 'Abishek D', roll: '21EC011', dept: 'ECE', missing: 'SUB1_CE_MRKS' },
        { name: 'Bhuvanesh S', roll: '21EC015', dept: 'ECE', missing: 'SUB1_CE_MRKS' },
      ],
      actionText: 'Check',
    },
  ]);

  const handleResolveIssue = (issueId) => {
    setIssuesList((prev) => prev.filter((i) => i.id !== issueId));
    setSelectedIssueModal(null);
    showToast('Data validation issue marked as resolved and synchronized!');
  };

  const handleResolveAllIssues = () => {
    setIssuesList([]);
    setSelectedIssueModal(null);
    showToast('All missing fields and validation errors successfully resolved with DigiLocker registry!');
  };

  // Activity list
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'photo',
      text: '1 photos uploaded in 1951 folder',
      hasVerify: false,
    },
    {
      id: 2,
      type: 'record',
      text: '3 records uploaded',
      hasVerify: true,
    },
    {
      id: 3,
      type: 'template',
      text: 'DGMST 19 has been set as template by Deept',
      hasVerify: false,
    },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setStats((prev) => ({
      ...prev,
      awardsLodged: prev.awardsLodged + 15,
      degree: prev.degree + 10,
      marksheet: prev.marksheet + 5,
    }));
    setShowUploadModal(false);
    showToast('Records batch uploaded successfully!');
  };

  const handleVerifyAll = () => {
    setActivities((prev) =>
      prev.map((act) => (act.hasVerify ? { ...act, text: '3 records verified and approved', hasVerify: false } : act))
    );
    setStats((prev) => ({
      ...prev,
      awardsFetched: prev.awardsFetched + 3,
    }));
    setShowVerifyModal(false);
    showToast('All 3 pending records successfully verified & lodged into repository!');
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Records', icon: FileText },
    { name: 'Student Access', icon: Users },
    { name: 'Templates', icon: Tag },
    { name: 'Settings', icon: Settings },
    { name: 'Certificate Approval', icon: CheckSquare },
    { name: 'Certificate Verification', icon: QrCode },
    { name: 'Academic Bank of Credits', icon: Landmark },
    { name: 'Support', icon: Headphones },
  ];

  const userMenuItems = [
    { title: 'Institution APAAR', icon: Shield, isHighlight: false },
    { title: 'Institution Details', icon: Landmark, isHighlight: false },
    { title: 'DigiLocker Accounts', icon: Cloud, isHighlight: false },
    { title: 'User Management', icon: Users, isHighlight: false },
    { title: 'Utilities', icon: Wrench, isHighlight: true },
    { title: 'Logout', icon: LogOut, isHighlight: false, isDanger: true },
  ];

  return (
    <div className="nad-app-wrapper">
      {/* Top Navbar */}
      <header className="nad-top-navbar">
        <div className="nad-brand-container">
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#0b2545',
                cursor: 'pointer'
              }}
              title="Return to Login Portal Gateway"
            >
              <LogOut size={14} />
              <span>← Login Portal Gateway</span>
            </button>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button
            className="nad-user-pill-btn"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            title="Toggle institution profile menu"
          >
            <span>Saveetha Engineering College</span>
            <div className="nad-user-avatar-circle">
              <Landmark size={18} strokeWidth={2.2} />
            </div>
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="nad-user-dropdown-card">
              <ul className="nad-dropdown-list">
                {userMenuItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={idx}
                      className={`nad-dropdown-item ${item.isHighlight ? 'highlighted' : ''} ${item.isDanger ? 'danger' : ''}`}
                      onClick={() => {
                        if (item.title === 'Logout' && onLogout) {
                          onLogout();
                        } else {
                          showToast(`Selected: ${item.title}`);
                        }
                      }}
                    >
                      <Icon className="nad-dropdown-icon" />
                      <span>{item.title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="nad-main-container">
        {/* Navy Blue Sidebar */}
        <aside className="nad-sidebar">
          <ul className="nad-sidebar-menu">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <li
                  key={item.name}
                  className={`nad-sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.name);
                    if (item.name !== 'Dashboard') {
                      showToast(`Switched to ${item.name} view`);
                    }
                  }}
                >
                  <Icon className="nad-sidebar-icon" />
                  <span>{item.name}</span>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Content Viewport */}
        <main className="nad-content-viewport">
          {activeTab === 'Dashboard' ? (
            <>
              {/* Header Action Bar */}
              <div className="nad-content-header">
                <h1 className="nad-page-heading">Dashboard</h1>
                <div className="nad-header-actions-group">
                  <button
                    className="nad-btn-upload"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <Upload size={18} />
                    <span>Upload Records</span>
                  </button>
                  <button
                    className="nad-btn-circle-icon"
                    onClick={() => showToast('3 institutional notifications active')}
                    title="Notifications"
                  >
                    <Bell size={18} />
                  </button>
                </div>
              </div>

              {/* Year Filter Pill & Institution Student Overview Banner */}
              <div className="nad-filter-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <button
                    className="nad-year-pill-btn"
                    onClick={() => setIsYearPickerOpen(!isYearPickerOpen)}
                  >
                    <span>{selectedYear}</span>
                    <Calendar size={18} color="#64748b" />
                  </button>

                  {isYearPickerOpen && (
                    <div className="nad-year-dropdown">
                      {['All Years', '2025-26', '2024-25', '2023-24', '2022-23', '2021-22'].map((yr) => (
                        <div
                          key={yr}
                          className={`nad-year-option ${selectedYear === yr ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedYear(yr);
                            setIsYearPickerOpen(false);
                            showToast(`Filtered by year: ${yr}`);
                          }}
                        >
                          {yr}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Total Students Overview Banner */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #dbe2ea',
                    borderRadius: '9999px',
                    padding: '6px 18px 6px 14px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '0.86rem' }}>
                    <Users size={16} color="#64748b" />
                    <span>Total Enrolled Students:</span>
                  </div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b' }}>
                    {stats.totalStudents.toLocaleString()}
                  </span>
                  <span style={{ color: '#cbd5e1' }}>|</span>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.86rem', color: '#475569' }}
                    onClick={() => setSideTab('issues')}
                    title="Click to view issues in side panel"
                  >
                    <AlertTriangle size={15} color="#64748b" />
                    <span>Data Issues:</span>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>
                      {issuesList.reduce((acc, curr) => acc + curr.affectedCount, 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cards & Activity Layout */}
              <div className="nad-cards-workspace">
                {/* 6 Metric Cards Grid */}
                <div className="nad-metrics-column">
                  {/* Card 1: Total Awards Lodged */}
                  <div className="nad-metric-card-split">
                    <div className="nad-card-icon-half">
                      <Award className="nad-metric-large-icon" />
                    </div>
                    <div className="nad-card-info-half">
                      <div className="nad-metric-counter">{stats.awardsLodged}</div>
                      <div className="nad-metric-title">Total Awards Lodged</div>
                    </div>
                  </div>

                  {/* Card 2: Awards Fetched */}
                  <div className="nad-metric-card-split">
                    <div className="nad-card-icon-half">
                      <BookOpen className="nad-metric-large-icon" />
                    </div>
                    <div className="nad-card-info-half">
                      <div className="nad-metric-counter">{stats.awardsFetched}</div>
                      <div className="nad-metric-title">Awards Fetched</div>
                    </div>
                  </div>

                  {/* Card 3: Total Degree */}
                  <div className="nad-metric-card-split">
                    <div className="nad-card-icon-half">
                      <GraduationCap className="nad-metric-large-icon" />
                    </div>
                    <div className="nad-card-info-half">
                      <div className="nad-metric-counter">{stats.degree}</div>
                      <div className="nad-metric-title">Total Degree</div>
                    </div>
                  </div>

                  {/* Card 4: Total Marksheet */}
                  <div className="nad-metric-card-split">
                    <div className="nad-card-icon-half">
                      <FileSpreadsheet className="nad-metric-large-icon" />
                    </div>
                    <div className="nad-card-info-half">
                      <div className="nad-metric-counter">{stats.marksheet}</div>
                      <div className="nad-metric-title">Total Marksheet</div>
                    </div>
                  </div>

                  {/* Card 7: Total Diploma */}
                  <div className="nad-metric-card-split">
                    <div className="nad-card-icon-half">
                      <Scroll className="nad-metric-large-icon" />
                    </div>
                    <div className="nad-card-info-half">
                      <div className="nad-metric-counter">{stats.diploma}</div>
                      <div className="nad-metric-title">Total Diploma</div>
                    </div>
                  </div>

                  {/* Card 8: Total Attempts Yesterday / Total */}
                  <div className="nad-metric-card-split">
                    <div className="nad-card-icon-half">
                      <Pointer className="nad-metric-large-icon" />
                    </div>
                    <div className="nad-card-info-half">
                      <div className="nad-metric-counter">
                        {stats.attemptsYesterday} / {stats.attemptsTotal}
                      </div>
                      <div className="nad-metric-title">
                        Total Attempts Yesterday / Total
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Panel: Data Health Notifications & Problems */}
                <div className="nad-activity-panel">
                  <div className="nad-activity-heading">
                    <span>Data Health & Alerts</span>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        border: '1px solid #cbd5e1'
                      }}
                    >
                      {issuesList.reduce((acc, curr) => acc + curr.affectedCount, 0)} Issues
                    </span>
                  </div>

                  {/* Segmented Switch */}
                  <div className="side-tabs-segmented">
                    <button
                      className={`side-tab-toggle-btn ${sideTab === 'issues' ? 'active' : ''}`}
                      onClick={() => setSideTab('issues')}
                    >
                      <AlertCircle size={14} />
                      <span>Data Issues ({issuesList.length})</span>
                    </button>
                    <button
                      className={`side-tab-toggle-btn ${sideTab === 'activity' ? 'active' : ''}`}
                      onClick={() => setSideTab('activity')}
                    >
                      <FileText size={14} />
                      <span>Activity ({activities.length})</span>
                    </button>
                  </div>

                  {sideTab === 'issues' ? (
                    <div>
                      {issuesList.length > 0 ? (
                        <div className="issue-notification-list">
                          {issuesList.map((issue) => (
                            <div
                              key={issue.id}
                              className="issue-card-item"
                            >
                              <div className="issue-card-top">
                                <div className="issue-card-title">
                                  <AlertCircle size={15} color="#64748b" />
                                  <span>{issue.title}</span>
                                </div>
                                <span className="issue-type-badge">
                                  {issue.type}
                                </span>
                              </div>
                              <div className="issue-card-desc">
                                {issue.description}
                              </div>
                              <div className="issue-card-footer">
                                <span>Missing: <strong>{issue.missingField}</strong></span>
                                <button
                                  className="issue-action-btn"
                                  onClick={() => setSelectedIssueModal(issue)}
                                >
                                  {issue.actionText}
                                </button>
                              </div>
                            </div>
                          ))}

                          <button
                            onClick={handleResolveAllIssues}
                            style={{
                              marginTop: '8px',
                              width: '100%',
                              padding: '8px',
                              background: '#f1f5f9',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              color: '#0b2545',
                              fontWeight: 600,
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <CheckCircle size={14} /> Resolve & Auto-Fill All Issues
                          </button>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '28px 12px', color: '#475569' }}>
                          <CheckCircle2 size={36} color="#64748b" style={{ margin: '0 auto 8px auto' }} />
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1e293b' }}>All Student Records Complete!</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                            Zero missing fields or verification mismatches detected.
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="nad-activity-stream">
                      {activities.map((act) => (
                        <div key={act.id} className="nad-activity-row">
                          <div className="nad-activity-icon-wrap">
                            {act.type === 'photo' && <ImageIcon size={20} />}
                            {act.type === 'record' && <FileText size={20} />}
                            {act.type === 'template' && <FileSpreadsheet size={20} />}
                          </div>
                          <div className="nad-activity-content">
                            <span className="nad-activity-text">{act.text}</span>
                            {act.hasVerify && (
                              <button
                                className="nad-verify-link-btn"
                                onClick={() => setShowVerifyModal(true)}
                              >
                                Verify now
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : activeTab === 'Records' ? (
            <RecordsView showToast={showToast} />
          ) : activeTab === 'Templates' ? (
            <TemplatesView showToast={showToast} />
          ) : activeTab === 'Student Access' ? (
            <div style={{ background: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #dbe2ea' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.45rem', color: '#0b2545', fontWeight: 600 }}>Student Access & Portal Permissions</h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                    Manage student DigiLocker linking, credential downloads, and Academic Bank of Credits (ABC) access.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="nad-btn-upload" onClick={() => showToast('Invitation link dispatched to student batch!')}>
                    + Invite Student Batch
                  </button>
                  <button className="nad-btn-secondary" onClick={() => setActiveTab('Dashboard')}>
                    Back to Dashboard
                  </button>
                </div>
              </div>

              {/* Quick stats for students */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Total Linked Students</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0b2545', marginTop: '4px' }}>4,280</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>DigiLocker Verified</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#16a34a', marginTop: '4px' }}>99.2%</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Pending Access Grants</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#d97706', marginTop: '4px' }}>8 Requests</div>
                </div>
              </div>

              {/* Students Access Table */}
              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '12px 16px' }}>Student Name</th>
                      <th style={{ padding: '12px 16px' }}>Roll / PRN No</th>
                      <th style={{ padding: '12px 16px' }}>Academic Program</th>
                      <th style={{ padding: '12px 16px' }}>DigiLocker Sync</th>
                      <th style={{ padding: '12px 16px' }}>Access Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Aditya Kulkarni', roll: 'BT22CSE011', prog: 'B.Tech CS (2022-26)', sync: 'Linked', status: 'Active' },
                      { name: 'Sneha Patel', roll: 'BT22ECE045', prog: 'B.Tech ECE (2022-26)', sync: 'Linked', status: 'Active' },
                      { name: 'Kavya Raman', roll: 'MB23FIN019', prog: 'MBA Finance (2023-25)', sync: 'Pending OTP', status: 'Restricted' },
                      { name: 'Vikram Singh', roll: 'BT21MEC082', prog: 'B.Tech Mechanical (2021-25)', sync: 'Linked', status: 'Active' },
                    ].map((st, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1e293b' }}>{st.name}</td>
                        <td style={{ padding: '14px 16px', color: '#64748b' }}>{st.roll}</td>
                        <td style={{ padding: '14px 16px', color: '#334155' }}>{st.prog}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: st.sync === 'Linked' ? '#dcfce7' : '#fef3c7',
                            color: st.sync === 'Linked' ? '#15803d' : '#b45309'
                          }}>
                            {st.sync}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: st.status === 'Active' ? '#e0e7ff' : '#fee2e2',
                            color: st.status === 'Active' ? '#4338ca' : '#b91c1c'
                          }}>
                            {st.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <button
                            style={{
                              background: 'transparent',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              padding: '4px 10px',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              color: '#0b2545',
                              cursor: 'pointer'
                            }}
                            onClick={() => showToast(`Access permissions updated for ${st.name}`)}
                          >
                            Configure
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Sub-tab view for other sections */
            <div style={{ background: '#ffffff', padding: '36px', borderRadius: '12px', border: '1px solid #dbe2ea' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#0b2545', marginBottom: '12px' }}>{activeTab} Management</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>
                Manage institutional configurations, digital awards repository, and synchronized records for {activeTab}.
              </p>
              <button
                className="nad-btn-upload"
                onClick={() => setActiveTab('Dashboard')}
              >
                Return to Main Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Upload Records Modal */}
      {showUploadModal && (
        <div className="nad-modal-overlay">
          <div className="nad-modal-box">
            <div className="nad-modal-header">
              <h3>Upload Academic Records</h3>
              <button
                className="nad-modal-close-btn"
                onClick={() => setShowUploadModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUploadSubmit}>
              <div className="nad-modal-body">
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                    Select Award Type
                  </label>
                  <select
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                    required
                  >
                    <option value="degree">Degree Certificate</option>
                    <option value="marksheet">Marksheet / Transcripts</option>
                    <option value="diploma">Diploma Certificate</option>
                  </select>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                    Academic Batch / Year
                  </label>
                  <input
                    type="text"
                    defaultValue="2024-2025"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                    required
                  />
                </div>

                <div className="nad-dropzone">
                  <Upload size={32} color="#0b2545" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>
                    Drag & Drop CSV / Excel or Browse
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                    Compliant with DigiLocker CSV Schema v2.4 (Max 25MB)
                  </div>
                </div>
              </div>
              <div className="nad-modal-footer">
                <button
                  type="button"
                  className="nad-btn-secondary"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="nad-btn-primary-action">
                  Process & Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="nad-modal-overlay">
          <div className="nad-modal-box">
            <div className="nad-modal-header">
              <h3>Pending Record Verification (3 Items)</h3>
              <button
                className="nad-modal-close-btn"
                onClick={() => setShowVerifyModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="nad-modal-body">
              <div style={{ marginBottom: '14px', fontSize: '0.9rem', color: '#334155' }}>
                Please review and approve digital certificates queued for verification:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Aarav Sharma', roll: 'BT21CSE042', course: 'B.Tech Computer Science', status: 'Valid Hash' },
                  { name: 'Pooja Nair', roll: 'BT21ECE019', course: 'B.Tech Electronics', status: 'Valid Hash' },
                  { name: 'Rohan Verma', roll: 'BT21MEC033', course: 'B.Tech Mechanical', status: 'Valid Hash' },
                ].map((rec, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b' }}>
                        {rec.name} ({rec.roll})
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{rec.course}</div>
                    </div>
                    <span
                      style={{
                        background: '#dcfce7',
                        color: '#15803d',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <CheckCircle2 size={13} /> {rec.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="nad-modal-footer">
              <button
                type="button"
                className="nad-btn-secondary"
                onClick={() => setShowVerifyModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="nad-btn-primary-action"
                onClick={handleVerifyAll}
              >
                Verify & Approve All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Detail & Quick Resolve Modal */}
      {selectedIssueModal && (
        <div className="nad-modal-overlay">
          <div className="nad-modal-box" style={{ maxWidth: '640px' }}>
            <div className="nad-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="issue-type-badge">
                  {selectedIssueModal.type}
                </span>
                <h3 style={{ margin: 0 }}>{selectedIssueModal.title}</h3>
              </div>
              <button
                className="nad-modal-close-btn"
                onClick={() => setSelectedIssueModal(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="nad-modal-body">
              <div style={{ marginBottom: '14px', fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                {selectedIssueModal.description}
              </div>

              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 14px',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.85rem'
              }}>
                <div><strong>Category:</strong> {selectedIssueModal.category}</div>
                <div><strong>Missing / Target Field:</strong> <code style={{ background: '#f1f5f9', color: '#1e293b', border: '1px solid #cbd5e1', padding: '2px 6px', borderRadius: '4px' }}>{selectedIssueModal.missingField}</code></div>
                <div><strong>Affected Records:</strong> <span style={{ fontWeight: 600, color: '#1e293b' }}>{selectedIssueModal.affectedCount}</span></div>
              </div>

              <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px', color: '#475569' }}>
                Sample Affected Student Records:
              </div>

              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', textAlign: 'left', color: '#475569' }}>
                      <th style={{ padding: '8px 12px' }}>Roll / PRN</th>
                      <th style={{ padding: '8px 12px' }}>Student Name</th>
                      <th style={{ padding: '8px 12px' }}>Dept</th>
                      <th style={{ padding: '8px 12px' }}>Field State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedIssueModal.sampleStudents?.map((st, idx) => (
                      <tr key={idx} style={{ borderTop: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0b2545' }}>{st.roll}</td>
                        <td style={{ padding: '8px 12px', color: '#1e293b' }}>{st.name}</td>
                        <td style={{ padding: '8px 12px', color: '#64748b' }}>{st.dept}</td>
                        <td style={{ padding: '8px 12px', color: '#475569', fontWeight: 500 }}>
                          Missing: {st.missing}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="nad-modal-footer">
              <button
                type="button"
                className="nad-btn-secondary"
                onClick={() => setSelectedIssueModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="nad-btn-primary-action"
                onClick={() => handleResolveIssue(selectedIssueModal.id)}
              >
                Auto-Fill & Sync {selectedIssueModal.missingField}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Toast */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0b2545',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            zIndex: 300,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <CheckCircle2 size={18} color="#4ade80" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
