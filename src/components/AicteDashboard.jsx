import React, { useState } from 'react';
import {
  Landmark,
  Building2,
  Users,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  LogOut,
  Calendar,
  Search,
  Filter,
  CheckSquare,
  QrCode,
  ShieldCheck,
  ChevronRight,
  Download,
  Eye,
  X,
  FileSpreadsheet,
  Layers,
  GraduationCap
} from 'lucide-react';
import '../aicte-dashboard.css';

export default function AicteDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRegion, setSelectedRegion] = useState('Southern Region (Tamil Nadu, Puducherry)');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollegeModal, setSelectedCollegeModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const aicteStats = {
    totalInstitutions: '10,842',
    approvedIntake: '3,248,500',
    eoaProcessed: '98.6%',
    complianceIndex: '99.2%',
  };

  const sidebarItems = [
    { name: 'Overview', icon: Landmark },
    { name: 'Extension of Approval (EOA)', icon: CheckSquare },
    { name: 'Intake & Quotas', icon: Users },
    { name: 'Faculty Cadre & Ratio', icon: Layers },
    { name: 'Accreditation & NBA', icon: Award },
    { name: 'ABC Credit Depository', icon: FileSpreadsheet },
    { name: 'Inspections & Audits', icon: ShieldCheck },
  ];

  const institutionsList = [
    {
      code: '1-39482910',
      name: 'Saveetha Engineering College',
      district: 'Chennai, Tamil Nadu',
      type: 'Autonomous / Private',
      approvedIntake: '1,840',
      eoaStatus: 'Approved (2025-26)',
      facultyRatio: '1 : 15 (Cadre Compliant)',
      nbaAccreditation: 'Accredited (Tier-1)',
      digiLockerSync: '100% Synced (4,280 Students)',
      complianceScore: '98 / 100',
    },
    {
      code: '1-48201948',
      name: 'College of Engineering, Guindy (Anna University)',
      district: 'Chennai, Tamil Nadu',
      type: 'State University / Govt',
      approvedIntake: '2,100',
      eoaStatus: 'Approved (2025-26)',
      facultyRatio: '1 : 14 (Cadre Compliant)',
      nbaAccreditation: 'Accredited (Tier-1)',
      digiLockerSync: '99.4% Synced',
      complianceScore: '99 / 100',
    },
    {
      code: '1-93048102',
      name: 'PSG College of Technology',
      district: 'Coimbatore, Tamil Nadu',
      type: 'Aided / Autonomous',
      approvedIntake: '1,950',
      eoaStatus: 'Approved (2025-26)',
      facultyRatio: '1 : 15 (Cadre Compliant)',
      nbaAccreditation: 'Accredited (Tier-1)',
      digiLockerSync: '99.8% Synced',
      complianceScore: '97 / 100',
    },
    {
      code: '1-74920194',
      name: 'Thiagarajar College of Engineering',
      district: 'Madurai, Tamil Nadu',
      type: 'Autonomous / Aided',
      approvedIntake: '1,620',
      eoaStatus: 'Approved (2025-26)',
      facultyRatio: '1 : 15 (Cadre Compliant)',
      nbaAccreditation: 'Accredited (Tier-1)',
      digiLockerSync: '99.1% Synced',
      complianceScore: '96 / 100',
    },
  ];

  const filteredInstitutions = institutionsList.filter(
    (inst) =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="aicte-app-wrapper">
      {/* Top Navbar */}
      <header className="aicte-top-navbar">
        <div className="aicte-brand-container">
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
                cursor: 'pointer',
              }}
              title="Return to Login Gateway"
            >
              <LogOut size={14} />
              <span>← Login Portal Gateway</span>
            </button>
          )}

          <div className="aicte-council-badge">
            <div className="aicte-council-icon-wrap">
              <Landmark size={20} />
            </div>
            <div>
              <div className="aicte-council-title">AICTE Regulatory Council Portal</div>
              <div className="aicte-council-sub">All India Council for Technical Education • Ministry of Education</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="aicte-user-pill-btn">
            <span>Regional Directorate (Southern Bureau)</span>
            <div className="aicte-user-avatar-circle">
              <ShieldCheck size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="aicte-main-container">
        {/* Sidebar */}
        <aside className="aicte-sidebar">
          <ul className="aicte-sidebar-menu">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <li
                  key={item.name}
                  className={`aicte-sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.name);
                    showToast(`Switched to AICTE ${item.name}`);
                  }}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Content Viewport */}
        <main className="aicte-content-viewport">
          <div className="aicte-content-header">
            <div>
              <h1 className="aicte-page-heading">AICTE Oversight & Institution Monitoring</h1>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                Academic Approval Verification, Faculty Cadre Oversight, and Mandatory Disclosures Audit (Session 2025-2026).
              </p>
            </div>
            <div className="aicte-header-actions">
              <button
                onClick={() => showToast('Generated Comprehensive Regional Accreditation Report PDF')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  backgroundColor: '#0b2545',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Download size={15} />
                <span>Export Council Report</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="aicte-filter-bar">
            <div className="aicte-filter-group">
              <div className="aicte-pill-select">
                <Filter size={15} color="#64748b" />
                <span>Region: {selectedRegion}</span>
              </div>
              <div className="aicte-pill-select">
                <Calendar size={15} color="#64748b" />
                <span>Session: 2025-2026</span>
              </div>
            </div>

            <div style={{ position: 'relative', width: '320px' }}>
              <Search
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '12px', top: '10px' }}
              />
              <input
                type="text"
                placeholder="Search college name or AICTE code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 14px 8px 36px',
                  borderRadius: '9999px',
                  border: '1px solid #dbe2ea',
                  fontSize: '0.86rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              />
            </div>
          </div>

          {/* 4 National KPI Metrics */}
          <div className="aicte-metrics-grid">
            <div className="aicte-metric-card">
              <div className="aicte-metric-icon-wrap">
                <Building2 size={24} />
              </div>
              <div>
                <div className="aicte-metric-value">{aicteStats.totalInstitutions}</div>
                <div className="aicte-metric-label">Approved Institutions</div>
              </div>
            </div>

            <div className="aicte-metric-card">
              <div className="aicte-metric-icon-wrap">
                <Users size={24} />
              </div>
              <div>
                <div className="aicte-metric-value">{aicteStats.approvedIntake}</div>
                <div className="aicte-metric-label">National Approved Intake</div>
              </div>
            </div>

            <div className="aicte-metric-card">
              <div className="aicte-metric-icon-wrap">
                <CheckSquare size={24} />
              </div>
              <div>
                <div className="aicte-metric-value">{aicteStats.eoaProcessed}</div>
                <div className="aicte-metric-label">EOA Approvals Processed</div>
              </div>
            </div>

            <div className="aicte-metric-card">
              <div className="aicte-metric-icon-wrap">
                <Award size={24} />
              </div>
              <div>
                <div className="aicte-metric-value">{aicteStats.complianceIndex}</div>
                <div className="aicte-metric-label">Council Compliance Index</div>
              </div>
            </div>
          </div>

          {/* Institution Compliance Table */}
          <div className="aicte-table-card">
            <div className="aicte-table-header">
              <div>
                <div className="aicte-table-title">Institutional Approval & Audit Registry</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                  Real-time status of affiliated colleges, approved student intake, and statutory faculty ratios.
                </div>
              </div>
              <span className="aicte-badge-pill">Showing {filteredInstitutions.length} Institutions</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="aicte-table">
                <thead>
                  <tr>
                    <th>AICTE Code</th>
                    <th>Institution Name</th>
                    <th>District / State</th>
                    <th>Approved Intake</th>
                    <th>EOA Status</th>
                    <th>Faculty Ratio</th>
                    <th>DigiLocker Records</th>
                    <th style={{ textAlign: 'right' }}>Audit Inspection</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstitutions.map((inst, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 600, color: '#0b2545' }}>{inst.code}</td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{inst.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{inst.type}</div>
                      </td>
                      <td style={{ color: '#475569' }}>{inst.district}</td>
                      <td style={{ fontWeight: 600 }}>{inst.approvedIntake} Seats</td>
                      <td>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '999px',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            backgroundColor: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            color: '#0b2545',
                          }}
                        >
                          {inst.eoaStatus}
                        </span>
                      </td>
                      <td>{inst.facultyRatio}</td>
                      <td>{inst.digiLockerSync}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedCollegeModal(inst)}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            padding: '5px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: '#0b2545',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Eye size={13} />
                          <span>View Audit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* College Audit Details Modal */}
      {selectedCollegeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              maxWidth: '680px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '18px 24px',
                backgroundColor: '#0b2545',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>AICTE Institutional Audit Report</h3>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px' }}>
                  {selectedCollegeModal.name} (Code: {selectedCollegeModal.code})
                </div>
              </div>
              <button
                onClick={() => setSelectedCollegeModal(null)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.76rem', color: '#64748b' }}>AICTE EOA Status</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0b2545', marginTop: '3px' }}>
                    {selectedCollegeModal.eoaStatus}
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Approved Intake</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0b2545', marginTop: '3px' }}>
                    {selectedCollegeModal.approvedIntake} Seats
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Council Compliance</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0b2545', marginTop: '3px' }}>
                    {selectedCollegeModal.complianceScore}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Faculty Cadre & Ratio:</strong> {selectedCollegeModal.facultyRatio}. Cadre ratio of Professors, Associate Professors, and Assistant Professors meets AICTE Approval Process Handbook (APH) 2024-27 norms.
                </p>
                <p style={{ marginBottom: '10px' }}>
                  <strong>NBA / NAAC Accreditation:</strong> {selectedCollegeModal.nbaAccreditation}. Eligible for additional intake in core engineering disciplines under Tier-1 Washington Accord guidelines.
                </p>
                <p>
                  <strong>Academic Depository Sync:</strong> {selectedCollegeModal.digiLockerSync}. Institutional student records, ABC Account IDs, and degree hashes successfully lodged into the national depository.
                </p>
              </div>
            </div>

            <div
              style={{
                padding: '14px 24px',
                backgroundColor: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
              }}
            >
              <button
                onClick={() => setSelectedCollegeModal(null)}
                style={{
                  padding: '8px 16px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  color: '#475569',
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCollegeModal(null);
                  showToast(`Dispatched official AICTE Inspection Confirmation for ${selectedCollegeModal.code}`);
                }}
                style={{
                  padding: '8px 18px',
                  background: '#0b2545',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Endorse Approval Record
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
