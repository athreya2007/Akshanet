import React, { useState } from 'react';
import {
  GraduationCap,
  Landmark,
  Building2,
  Briefcase,
  Users,
  ShieldCheck,
  ArrowRight,
  Lock,
  CheckCircle2,
  LogIn,
  Fingerprint,
  FileText,
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff,
  QrCode,
  LogOut,
  X,
  Award,
  BookOpen,
  Calendar,
  AlertCircle
} from 'lucide-react';
import '../login-dashboard.css';

export default function LoginDashboard({ onConnectInstitution, onConnectAicte, onConnectStudent }) {
  const [activeModalRole, setActiveModalRole] = useState(null);
  const [activeRoleView, setActiveRoleView] = useState(null); // 'Student' | 'Employee' | null
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    otpOrId: '',
  });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const roles = [
    {
      id: 'student',
      name: 'Student',
      badge: '4,280 Enrolled',
      icon: GraduationCap,
      tagline: 'DigiLocker & APAAR Credit Gateway',
      description:
        'Access your official academic transcripts, degree credentials, Academic Bank of Credits (ABC), and verify course credits.',
      meta: 'APAAR ID / Roll No. / DigiLocker Mobile OTP',
      primaryActionText: 'Login as Student',
      defaultUsername: '21CS014 / 9876543210',
      defaultOtp: '849201',
    },
    {
      id: 'aicte',
      name: 'AICTE',
      badge: 'Regulatory Council',
      isAicte: true,
      icon: Landmark,
      tagline: 'Compliance & Accreditation Oversight',
      description:
        'Regulatory body inspection portal for institutional intake approvals, faculty-to-student ratios, NEP 2020 alignment, and academic quality assurance.',
      meta: 'AICTE Institute Code / DSC Token Key',
      primaryActionText: 'Enter AICTE Dashboard →',
      defaultUsername: 'AICTE-TN-1-39482910',
      defaultOtp: 'DSC-VALID-2025',
    },
    {
      id: 'institution',
      name: 'Institution',
      badge: 'Connected Portal',
      isInstitution: true,
      icon: Building2,
      tagline: 'Saveetha Engineering College',
      description:
        'Administrative authority for batch student awards lodgment, DigiLocker academic sync, template management, and institutional registry.',
      meta: 'Institution APAAR / Nodal Officer Credentials',
      primaryActionText: 'Enter Institution Dashboard →',
      defaultUsername: 'SEC-ADMIN-OFFICE',
      defaultOtp: 'APAR-SEC-2025',
    },
    {
      id: 'employee',
      name: 'Employee',
      badge: 'Faculty & Staff',
      icon: Briefcase,
      tagline: 'Academics & Continuous Evaluation',
      description:
        'Faculty and staff portal for internal assessments, CE continuous evaluation mark sheets (SUB1_CE_MRKS), student mentorship, and attendance.',
      meta: 'Staff Employee ID / Institutional SSO',
      primaryActionText: 'Login as Employee',
      defaultUsername: 'EMP-SEC-FAC-084',
      defaultOtp: 'SSO-ACTIVE',
    },
  ];

  const handleCardClick = (role) => {
    if (role.isInstitution) {
      onConnectInstitution();
    } else if (role.isAicte && onConnectAicte) {
      onConnectAicte();
    } else if (role.id === 'student' && onConnectStudent) {
      onConnectStudent();
    } else {
      setActiveModalRole(role);
      setCredentials({
        username: role.defaultUsername,
        password: '••••••••••••',
        otpOrId: role.defaultOtp,
      });
    }
  };

  const handleRoleLoginSubmit = (e) => {
    e.preventDefault();
    const role = activeModalRole;
    setActiveModalRole(null);
    if (role.isAicte && onConnectAicte) {
      onConnectAicte();
    } else if (role.id === 'student' && onConnectStudent) {
      onConnectStudent();
    } else {
      setActiveRoleView(role.name);
      showToast(`Authenticated successfully as ${role.name}!`);
    }
  };

  const handleQuickDemoLaunch = (role) => {
    setActiveModalRole(null);
    if (role.isAicte && onConnectAicte) {
      onConnectAicte();
    } else if (role.id === 'student' && onConnectStudent) {
      onConnectStudent();
    } else {
      setActiveRoleView(role.name);
      showToast(`Loaded ${role.name} workspace overview!`);
    }
  };

  return (
    <div className="login-portal-wrapper">
      {/* Top Navbar */}
      <header className="login-portal-header">
        <div className="login-brand-group">
          <div className="login-brand-logo">A</div>
          <div className="login-brand-text">
            <h1>Akshanet Portal Gateway</h1>
            <p>Unified Higher Education & Accreditation Ecosystem</p>
          </div>
        </div>

        <div className="login-header-badges">
          <div className="login-status-pill">
            <span className="status-dot-green"></span>
            <span>DigiLocker & APAAR Synchronized</span>
          </div>
          <button
            onClick={onConnectStudent}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#f5f3ff',
              color: '#6d28d9',
              border: '1px solid #ddd6fe',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <GraduationCap size={16} />
            <span>Student (DigiLocker)</span>
          </button>
          <button
            onClick={onConnectAicte}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#ffffff',
              color: '#0b2545',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Landmark size={16} />
            <span>AICTE Dashboard</span>
          </button>
          <button
            onClick={onConnectInstitution}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#0b2545',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Building2 size={16} />
            <span>Institution Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      {activeRoleView ? (
        /* Role Mock Demonstration View */
        <div className="role-mock-view-container">
          <div className="role-mock-banner">
            <div className="role-mock-meta">
              <div className="role-mock-avatar">
                {activeRoleView === 'Student' && <GraduationCap size={24} />}
                {activeRoleView === 'AICTE' && <Landmark size={24} />}
                {activeRoleView === 'Employee' && <Briefcase size={24} />}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0b2545', margin: 0 }}>
                    {activeRoleView === 'Student' && 'Student Academic Portal — Gokulnath S (21CS014)'}
                    {activeRoleView === 'AICTE' && 'AICTE Institutional Compliance & Inspection Desk'}
                    {activeRoleView === 'Employee' && 'Faculty Assessment & Evaluation Desk — Dr. K. Ramanathan'}
                  </h2>
                  <span
                    style={{
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '999px',
                      padding: '2px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#475569',
                    }}
                  >
                    Active Session
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.86rem' }}>
                  {activeRoleView === 'Student' && 'Saveetha Engineering College • B.Tech Computer Science (2021-25) • APAAR Verified'}
                  {activeRoleView === 'AICTE' && 'Southern Regional Office • Mandatory Disclosure & National Institutional Ranking Monitoring'}
                  {activeRoleView === 'Employee' && 'Department of Computer Science & Engineering • Academic Term 2024-25'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={onConnectInstitution}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0b2545',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Building2 size={16} />
                <span>Switch to Institution Dashboard</span>
              </button>
              <button
                onClick={() => setActiveRoleView(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <LogOut size={16} />
                <span>Sign Out / Switch Role</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics for the selected role */}
          {activeRoleView === 'Student' && (
            <>
              <div className="role-mock-cards-row">
                <div className="role-mock-card">
                  <div className="role-mock-card-lbl">Academic Credits (ABC)</div>
                  <div className="role-mock-card-num">142 Credits</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Cumulative Grade Point: 8.84 CGPA</div>
                </div>
                <div className="role-mock-card">
                  <div className="role-mock-card-lbl">Verified DigiLocker Awards</div>
                  <div className="role-mock-card-num">6 Certificates</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Degree, 4 Sem Marksheets, Diploma</div>
                </div>
                <div className="role-mock-card">
                  <div className="role-mock-card-lbl">APAAR Account Status</div>
                  <div className="role-mock-card-num">Linked & Active</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ID: 8492-1049-3910</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #dbe2ea', padding: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#0b2545', marginBottom: '14px' }}>My DigiLocker Academic Certificates</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '10px 14px' }}>Award Title</th>
                      <th style={{ padding: '10px 14px' }}>Issuing Authority</th>
                      <th style={{ padding: '10px 14px' }}>Issued Date</th>
                      <th style={{ padding: '10px 14px' }}>Verification Hash</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: 'Bachelor of Technology in CSE', auth: 'Saveetha Engineering College', date: 'May 2025', hash: 'SHA256:8f3c...19a' },
                      { title: 'Semester VII Marksheet', auth: 'Saveetha Engineering College', date: 'Dec 2024', hash: 'SHA256:7b21...49c' },
                      { title: 'Semester VI Marksheet', auth: 'Saveetha Engineering College', date: 'May 2024', hash: 'SHA256:4a90...93e' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>{row.title}</td>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{row.auth}</td>
                        <td style={{ padding: '12px 14px' }}>{row.date}</td>
                        <td style={{ padding: '12px 14px' }}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{row.hash}</code></td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          <button
                            onClick={() => showToast(`Downloaded certificate for ${row.title}`)}
                            style={{ background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 10px', fontSize: '0.78rem', cursor: 'pointer' }}
                          >
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeRoleView === 'AICTE' && (
            <>
              <div className="role-mock-cards-row">
                <div className="role-mock-card">
                  <div className="role-mock-card-lbl">Approval Status (2025-26)</div>
                  <div className="role-mock-card-num">Approved (EOA)</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Extension of Approval Valid</div>
                </div>
                <div className="role-mock-card">
                  <div className="role-mock-card-lbl">Faculty-to-Student Ratio</div>
                  <div className="role-mock-card-num">1 : 15 (Compliant)</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Mandatory Cadre Norms Fulfilled</div>
                </div>
                <div className="role-mock-card">
                  <div className="role-mock-card-lbl">Mandatory Disclosures</div>
                  <div className="role-mock-card-num">100% Uploaded</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Audited by Council on 14 Jan 2025</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #dbe2ea', padding: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#0b2545', marginBottom: '14px' }}>AICTE Approved Academic Programs for Saveetha Engineering College</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '10px 14px' }}>Program Name</th>
                      <th style={{ padding: '10px 14px' }}>Level</th>
                      <th style={{ padding: '10px 14px' }}>Approved Intake</th>
                      <th style={{ padding: '10px 14px' }}>Accreditation Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Computer Science and Engineering', lvl: 'UG (4 Yrs)', intake: '240', acc: 'NBA Accredited (6 Years)' },
                      { name: 'Artificial Intelligence & Data Science', lvl: 'UG (4 Yrs)', intake: '180', acc: 'NBA Tier-1 Valid' },
                      { name: 'Electronics and Communication Engineering', lvl: 'UG (4 Yrs)', intake: '180', acc: 'NBA Accredited' },
                      { name: 'Master of Business Administration (MBA)', lvl: 'PG (2 Yrs)', intake: '120', acc: 'AICTE Approved' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>{row.name}</td>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{row.lvl}</td>
                        <td style={{ padding: '12px 14px' }}>{row.intake} Students</td>
                        <td style={{ padding: '12px 14px', color: '#1e293b' }}>{row.acc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeRoleView === 'Employee' && (
            <>
              <div className="role-mock-cards-row">
                <div className="role-mock-card">
                  <div className="role-mock-card-lbl">Assigned Batches</div>
                  <div className="role-mock-card-num">3 Sections</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>B.Tech CSE Semester VI (A, B, C)</div>
                </div>
                <div className="role-mock-card">
                  <div className="role-mock-card-lbl">Internal CE Marks Pending</div>
                  <div className="role-mock-card-num">12 Entries</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SUB1_CE_MRKS continuous evaluation</div>
                </div>
                <div className="role-mock-card">
                  <div className="role-mock-card-lbl">Student Mentorship Cohort</div>
                  <div className="role-mock-card-num">24 Mentees</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>All KYC & Demographics Logged</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #dbe2ea', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', color: '#0b2545', margin: 0 }}>Faculty Continuous Evaluation (CE) Submission Queue</h3>
                  <button
                    onClick={() => showToast('Internal evaluation batch submitted for DigiLocker sync!')}
                    style={{ background: '#0b2545', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Submit CE Marks Batch
                  </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '10px 14px' }}>Roll / PRN</th>
                      <th style={{ padding: '10px 14px' }}>Student Name</th>
                      <th style={{ padding: '10px 14px' }}>Course Code</th>
                      <th style={{ padding: '10px 14px' }}>Continuous Eval (SUB1_CE)</th>
                      <th style={{ padding: '10px 14px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { roll: '21CS011', name: 'Abishek D', code: 'CS3601 - Cloud Computing', marks: '42 / 50', status: 'Draft' },
                      { roll: '21CS015', name: 'Bhuvanesh S', code: 'CS3601 - Cloud Computing', marks: '38 / 50', status: 'Draft' },
                      { roll: '21CS019', name: 'Janani R', code: 'CS3601 - Cloud Computing', marks: '47 / 50', status: 'Draft' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>{row.roll}</td>
                        <td style={{ padding: '12px 14px' }}>{row.name}</td>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{row.code}</td>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>{row.marks}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Main Role Selection Dashboard */
        <>
          <section className="login-hero-section">
            <div className="login-hero-tag">
              <ShieldCheck size={14} />
              <span>Unified Academic Depository & Authentication</span>
            </div>
            <h2 className="login-hero-title">Select Your Authentication Portal</h2>
            <p className="login-hero-subtitle">
              Sign in to manage academic records, review council accreditations, lodge student certificates, or access personal degree transcripts.
            </p>
          </section>

          {/* 4 Cards Grid */}
          <div className="login-roles-container">
            <div className="login-roles-grid">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <div
                    key={role.id}
                    className={`login-role-card ${role.isInstitution ? 'highlighted-institution' : ''}`}
                    onClick={() => handleCardClick(role)}
                  >
                    <span className="login-card-badge">{role.badge}</span>
                    <div className="login-card-icon-wrap">
                      <Icon size={26} strokeWidth={2} />
                    </div>

                    <div>
                      <h3 className="login-card-title">{role.name}</h3>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0b2545', marginBottom: '6px' }}>
                        {role.tagline}
                      </div>
                      <p className="login-card-desc">{role.description}</p>
                    </div>

                    <div>
                      <div className="login-card-meta">
                        <Lock size={13} color="#94a3b8" />
                        <span>{role.meta}</span>
                      </div>
                      <button
                        className={`login-role-btn ${role.isInstitution ? 'primary' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(role);
                        }}
                      >
                        <span>{role.primaryActionText}</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Role Authentication Modal */}
      {activeModalRole && (
        <div className="nad-modal-overlay">
          <div className="login-active-dialog">
            <div className="login-dialog-header">
              <h3>
                {activeModalRole.name === 'Student' && <GraduationCap size={20} />}
                {activeModalRole.name === 'AICTE' && <Landmark size={20} />}
                {activeModalRole.name === 'Employee' && <Briefcase size={20} />}
                <span>Sign in as {activeModalRole.name}</span>
              </h3>
              <button
                className="nad-modal-close-btn"
                onClick={() => setActiveModalRole(null)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRoleLoginSubmit}>
              <div className="login-dialog-body">
                <div style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '16px' }}>
                  Authenticate via institutional credentials or authorized identity tokens:
                </div>

                <div className="login-quick-demo-pill">
                  <span>Demo credentials pre-filled for rapid inspection</span>
                  <button
                    type="button"
                    className="login-quick-demo-btn"
                    onClick={() => handleQuickDemoLaunch(activeModalRole)}
                  >
                    Direct Preview →
                  </button>
                </div>

                <div className="login-input-group">
                  <label>
                    {activeModalRole.name === 'Student' && 'Student Roll No / APAAR ABC ID'}
                    {activeModalRole.name === 'AICTE' && 'AICTE Nodal Officer Code'}
                    {activeModalRole.name === 'Employee' && 'Faculty Employee Code / Staff ID'}
                  </label>
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                  />
                </div>

                <div className="login-input-group">
                  <label>Password / Institutional PIN</label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                </div>

                <div className="login-input-group">
                  <label>
                    {activeModalRole.name === 'Student' && 'DigiLocker Verification OTP'}
                    {activeModalRole.name === 'AICTE' && 'Digital Signature Certificate (DSC) Token'}
                    {activeModalRole.name === 'Employee' && 'Two-Factor Authenticator Code'}
                  </label>
                  <input
                    type="text"
                    value={credentials.otpOrId}
                    onChange={(e) => setCredentials({ ...credentials, otpOrId: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="login-dialog-footer">
                <button
                  type="button"
                  className="nad-btn-secondary"
                  onClick={() => setActiveModalRole(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="nad-btn-primary-action"
                >
                  Confirm & Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="login-portal-footer">
        <div>
          © 2025 Saveetha Engineering College • Academic Depository & DigiLocker Gateway
        </div>
        <div style={{ display: 'flex', gap: '18px' }}>
          <span>Security & Compliance</span>
          <span>Terms of Access</span>
          <span>Council Directives</span>
        </div>
      </footer>

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
