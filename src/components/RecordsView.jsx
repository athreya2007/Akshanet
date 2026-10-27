import React, { useState } from 'react';
import { SYNTHETIC_STUDENT_RECORDS, downloadSampleCsvTemplate } from '../data/studentRecordsTemplate';
import { Search, Download, Filter, Eye, CheckCircle, FileText, X } from 'lucide-react';

export default function RecordsView({ showToast }) {
  const [records, setRecords] = useState(SYNTHETIC_STUDENT_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [activeRecord, setActiveRecord] = useState(null);

  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.cname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.regnNo.includes(searchQuery) ||
      rec.rroll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.abcAccountId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.apaarId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'ALL' || rec.department.includes(selectedDept);
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #dbe2ea', padding: '24px' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', color: '#0b2545', fontWeight: 600 }}>Student Academic Records Repository</h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>
            Synthetic student datasets mapped strictly to the official 180+ column DigiLocker Academic CSV Schema.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="nad-btn-upload"
            onClick={() => {
              downloadSampleCsvTemplate();
              showToast('Exported student records CSV file!');
            }}
          >
            <Download size={16} />
            <span>Export CSV Dataset</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          padding: '8px 14px',
          flex: '1',
          minWidth: '260px'
        }}>
          <Search size={17} color="#64748b" />
          <input
            type="text"
            placeholder="Search by Student Name, Regn No, Roll No, or APAAR ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.9rem',
              color: '#1e293b'
            }}
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            fontSize: '0.88rem',
            color: '#334155',
            fontWeight: 500,
            outline: 'none'
          }}
        >
          <option value="ALL">All Departments</option>
          <option value="Computer Science">Computer Science & Engg</option>
          <option value="AI">AI & Data Science</option>
          <option value="Electronics">Electronics & Comm</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="Management">Management (MBA)</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', color: '#475569', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 16px' }}>Student Name & Regn</th>
              <th style={{ padding: '12px 16px' }}>Course & Dept</th>
              <th style={{ padding: '12px 16px' }}>ABC / APAAR ID</th>
              <th style={{ padding: '12px 16px' }}>CGPA / %</th>
              <th style={{ padding: '12px 16px' }}>Grade / Division</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((st) => (
                <tr key={st.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0b2545' }}>{st.cname}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                      Reg: {st.regnNo} | Roll: {st.rroll}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 500, color: '#1e293b' }}>{st.courseName}</div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{st.department}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#0369a1', fontWeight: 600 }}>
                      {st.abcAccountId}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{st.apaarId}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontWeight: 700, color: '#0b2545', fontSize: '0.95rem' }}>{st.cgpa}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '6px' }}>({st.percent})</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: st.grade === 'O' ? '#dcfce7' : '#e0e7ff',
                      color: st.grade === 'O' ? '#15803d' : '#3730a3',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      display: 'inline-block'
                    }}>
                      Grade {st.grade}
                    </span>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '3px' }}>
                      {st.division}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      background: '#dcfce7',
                      color: '#15803d'
                    }}>
                      <CheckCircle size={12} /> Synced
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => setActiveRecord(st)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '5px 10px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#0b2545',
                        cursor: 'pointer'
                      }}
                    >
                      <Eye size={14} /> View Fields
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                  No matching student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Record Inspection Modal */}
      {activeRecord && (
        <div className="nad-modal-overlay" style={{ display: 'flex' }}>
          <div className="nad-modal-box" style={{ maxWidth: '720px' }}>
            <div className="nad-modal-header">
              <h3>Student Academic Record Inspector</h3>
              <button className="nad-modal-close-btn" onClick={() => setActiveRecord(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="nad-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', fontSize: '0.86rem' }}>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>ORG_NAME & CODE</div>
                  <div style={{ fontWeight: 600, color: '#0b2545' }}>{activeRecord.orgName} ({activeRecord.orgCode})</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>CNAME (Student Name)</div>
                  <div style={{ fontWeight: 600, color: '#0b2545' }}>{activeRecord.cname} ({activeRecord.gender})</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>REGN_NO & RROLL</div>
                  <div style={{ fontWeight: 600 }}>{activeRecord.regnNo} / {activeRecord.rroll}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>ABC_ACCOUNT_ID</div>
                  <div style={{ fontWeight: 600, color: '#0284c7' }}>{activeRecord.abcAccountId}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>COURSE_NAME & DEPT</div>
                  <div style={{ fontWeight: 600 }}>{activeRecord.courseName}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{activeRecord.department}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>SPECIALIZATION_MAJOR</div>
                  <div style={{ fontWeight: 600 }}>{activeRecord.specializationMajor}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>CGPA & GRADE</div>
                  <div style={{ fontWeight: 700, color: '#16a34a' }}>CGPA {activeRecord.cgpa} — Grade {activeRecord.grade} ({activeRecord.percent})</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>CERT_NO & RESULT</div>
                  <div style={{ fontWeight: 600 }}>{activeRecord.certNo} ({activeRecord.result})</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>THESIS / PROJECT TITLE</div>
                  <div style={{ fontWeight: 500 }}>{activeRecord.thesis}</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>SUBJECT 1 (SUB1NM / GRADE)</div>
                  <div style={{ fontWeight: 600 }}>{activeRecord.sub1Name}: {activeRecord.sub1Marks} (Grade {activeRecord.sub1Grade})</div>
                </div>
              </div>
            </div>
            <div className="nad-modal-footer">
              <button className="nad-btn-secondary" onClick={() => setActiveRecord(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
