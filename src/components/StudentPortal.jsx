import React, { useState } from 'react';
import {
  GraduationCap,
  Cloud,
  Lock,
  ArrowRight,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Download,
  LogOut,
  FileText,
  Calendar,
  Building2,
  ChevronRight,
  KeyRound,
  ExternalLink,
  Award,
  Layers,
  Sparkles,
  Smartphone
} from 'lucide-react';
import '../digilocker-student.css';

export default function StudentPortal({ onLogoutGateway }) {
  const [authStep, setAuthStep] = useState('mobile'); // 'mobile' | 'otp' | 'qr' | 'dashboard'
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otpDigits, setOtpDigits] = useState(['8', '4', '9', '2', '0', '1']);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setAuthStep('otp');
      showToast('DigiLocker security OTP dispatched to +91 ' + mobileNumber);
    } else {
      showToast('Please enter a valid 10-digit mobile number');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setAuthStep('dashboard');
    showToast('Authenticated via DigiLocker! Welcome Gokulnath S.');
  };

  const handleQuickDemoLogin = () => {
    setMobileNumber('9876543210');
    setAuthStep('dashboard');
    showToast('Direct demo login authenticated via DigiLocker & APAAR ID!');
  };

  return (
    <div className="digilocker-page-wrapper">
      {/* Top Header - Exact DigiLocker Branding */}
      <header className="digilocker-header">
        <div className="digilocker-brand-left">
          {/* Government of India Ashoka Lion Emblem */}
          <div className="emblem-wrap">
            <svg width="26" height="34" viewBox="0 0 40 52" fill="none" stroke="#1e293b" strokeWidth="2">
              <path d="M20 4c-4 0-7 3-7 7 0 2 1 4 2 5-3 1-5 4-5 7v1H8v3h24v-3h-2v-1c0-3-2-6-5-7 1-1 2-3 2-5 0-4-3-7-7-7z" fill="#334155" />
              <rect x="6" y="32" width="28" height="6" rx="1" fill="#1e293b" />
              <circle cx="20" cy="35" r="2" fill="#ffffff" />
              <path d="M12 40h16v3H12z" fill="#475569" />
            </svg>
            <span className="emblem-text">सत्यमेव जयते</span>
          </div>

          <div className="header-divider-v"></div>

          {/* DigiLocker Cloud & Title Logo */}
          <div className="digilocker-logo-group">
            <div className="digilocker-cloud-icon">
              <Cloud size={22} fill="#ffffff" strokeWidth={1} />
            </div>
            <div>
              <div className="digilocker-text-title">DigiLocker</div>
              <div className="digilocker-text-sub">Document Wallet to Empower Citizens</div>
            </div>
          </div>
        </div>

        <button
          onClick={onLogoutGateway}
          className="btn-gateway-return"
          title="Return to Akshanet Gateway"
        >
          <LogOut size={14} />
          <span>← Back to Akshanet Gateway</span>
        </button>
      </header>

      {/* Main Body View */}
      {authStep === 'dashboard' ? (
        /* Logged In Student Academic Depository Dashboard */
        <div className="student-portal-viewport">
          <div className="student-portal-banner">
            <div className="student-meta-group">
              <div className="student-avatar-box">
                <GraduationCap size={28} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0b2545', margin: 0 }}>
                    Gokulnath S (Roll: 21CS014)
                  </h2>
                  <span
                    style={{
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '999px',
                      padding: '2px 8px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: '#0b2545',
                    }}
                  >
                    DigiLocker Verified
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.88rem' }}>
                  Saveetha Engineering College • B.Tech Computer Science and Engineering (2021–2025)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setAuthStep('mobile')}
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
                <LogOut size={15} />
                <span>Sign Out of DigiLocker</span>
              </button>
            </div>
          </div>

          {/* Academic KPIs */}
          <div className="student-metrics-row">
            <div className="student-kpi-card">
              <div className="student-kpi-lbl">Academic Bank of Credits (ABC)</div>
              <div className="student-kpi-val">142 Credits</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Cumulative Grade: 8.84 CGPA • Completed</div>
            </div>
            <div className="student-kpi-card">
              <div className="student-kpi-lbl">APAAR Permanent ID</div>
              <div className="student-kpi-val">8492-1049-3910</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Aadhaar KYC Synchronized with Institution</div>
            </div>
            <div className="student-kpi-card">
              <div className="student-kpi-lbl">Digital Awards in DigiLocker</div>
              <div className="student-kpi-val">6 Documents</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Digitally Signed by Controller of Examinations</div>
            </div>
          </div>

          {/* DigiLocker Issued Academic Documents */}
          <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #dbe2ea', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0b2545', margin: 0 }}>
                  Issued Academic Certificates & Transcripts
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                  Directly lodged by Saveetha Engineering College into national depository.
                </div>
              </div>
              <button
                onClick={() => showToast('Dispatched digital share link with employer/higher education portal')}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#0b2545',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ExternalLink size={14} />
                <span>Share DigiLocker Credentials</span>
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Document Name</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Issuing Institution</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Session / Batch</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Cryptographic Hash</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', textAlign: 'right' }}>Download</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Degree Certificate — B.Tech Computer Science', batch: '2021-2025', date: 'May 2025', hash: 'SHA256:8f3c...91a' },
                  { name: 'Semester VII Consolidated Grade Marksheet', batch: '2024-2025', date: 'Dec 2024', hash: 'SHA256:7b21...49c' },
                  { name: 'Semester VI Consolidated Grade Marksheet', batch: '2023-2024', date: 'May 2024', hash: 'SHA256:4a90...93e' },
                  { name: 'Semester V Consolidated Grade Marksheet', batch: '2023-2024', date: 'Dec 2023', hash: 'SHA256:3e10...82b' },
                ].map((doc, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1e293b' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={16} color="#0b2545" />
                        <span>{doc.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b' }}>Saveetha Engineering College</td>
                    <td style={{ padding: '14px 16px' }}>{doc.batch}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.78rem' }}>
                        {doc.hash}
                      </code>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => showToast(`Downloaded verified PDF: ${doc.name}`)}
                        style={{
                          background: '#0b2545',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <Download size={13} />
                        <span>Download PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Authentication Screen (Matches Screenshot) */
        <div className="digilocker-body-container">
          <div className="digilocker-login-card">
            {authStep === 'mobile' && (
              <>
                <h1 className="digilocker-card-title">Login or Create Account</h1>
                <p className="digilocker-card-subtitle">Enter your mobile number to proceed</p>

                <form onSubmit={handleMobileSubmit}>
                  {/* Outlined purple box with +91 and Mobile number input */}
                  <div className="digilocker-mobile-input-wrap">
                    <div className="mobile-code-prefix">+91</div>
                    <div className="mobile-input-divider"></div>
                    <input
                      type="tel"
                      className="mobile-number-field"
                      placeholder="Mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      maxLength={10}
                      autoFocus
                      required
                    />
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className={`digilocker-btn-continue ${mobileNumber.length >= 10 ? 'active' : ''}`}
                  >
                    Continue
                  </button>
                </form>

                <div className="digilocker-terms-text">
                  By continuing, I agree to the <a href="#terms" onClick={(e) => { e.preventDefault(); showToast('DigiLocker Terms of Service: Academic Depository access authorized under IT Act 2000.'); }}>Terms of Service</a>
                </div>

                <div className="digilocker-divider-or">
                  <span>or</span>
                </div>

                {/* Login using QR Code Card */}
                <button
                  type="button"
                  className="digilocker-qr-card-btn"
                  onClick={() => setAuthStep('qr')}
                >
                  <div className="qr-icon-wrap">
                    <QrCode size={22} />
                  </div>
                  <div>
                    <div className="qr-card-title">Login using QR Code</div>
                    <div className="qr-card-sub">Scan using <a href="#app">DigiLocker Mobile App</a></div>
                  </div>
                </button>

                {/* Quick 1-Click Demo Helper */}
                <div className="digilocker-demo-helper">
                  <span>Demo: Gokulnath S (21CS014)</span>
                  <button
                    type="button"
                    className="digilocker-demo-btn"
                    onClick={handleQuickDemoLogin}
                  >
                    1-Click Demo Login →
                  </button>
                </div>
              </>
            )}

            {authStep === 'otp' && (
              <form onSubmit={handleOtpSubmit}>
                <h1 className="digilocker-card-title">Enter Security OTP</h1>
                <p className="digilocker-card-subtitle">
                  6-digit verification code sent to <strong>+91 {mobileNumber}</strong>
                </p>

                <div className="otp-boxes-group">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="otp-digit-box"
                      value={digit}
                      maxLength={1}
                      onChange={(e) => {
                        const newDigits = [...otpDigits];
                        newDigits[idx] = e.target.value;
                        setOtpDigits(newDigits);
                      }}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="digilocker-btn-continue active"
                >
                  Verify & Access Academic Records
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', marginTop: '14px' }}>
                  Didn't receive code?{' '}
                  <span
                    style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => showToast('Resent DigiLocker OTP to +91 ' + mobileNumber)}
                  >
                    Resend OTP
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setAuthStep('mobile')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    width: '100%',
                    marginTop: '16px',
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                  }}
                >
                  ← Change Mobile Number
                </button>
              </form>
            )}

            {authStep === 'qr' && (
              <div style={{ textAlign: 'center' }}>
                <h1 className="digilocker-card-title">Scan DigiLocker QR</h1>
                <p className="digilocker-card-subtitle">
                  Open your DigiLocker app & scan the QR to authenticate
                </p>

                <div
                  style={{
                    padding: '20px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    display: 'inline-block',
                    marginBottom: '18px',
                  }}
                >
                  <QrCode size={180} color="#0b2545" />
                </div>

                <button
                  type="button"
                  className="digilocker-btn-continue active"
                  onClick={handleQuickDemoLogin}
                >
                  Simulate QR Approval →
                </button>

                <button
                  type="button"
                  onClick={() => setAuthStep('mobile')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    width: '100%',
                    marginTop: '12px',
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                  }}
                >
                  ← Back to Mobile Number Login
                </button>
              </div>
            )}
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
