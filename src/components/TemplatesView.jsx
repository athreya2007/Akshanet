import React, { useState } from 'react';
import { NAD_CSV_HEADER, SAMPLE_RAW_CSV_CONTENT, downloadSampleCsvTemplate } from '../data/studentRecordsTemplate';
import { Download, Copy, Check, FileSpreadsheet, ShieldCheck, Layers, FileCode } from 'lucide-react';

export default function TemplatesView({ showToast }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('raw');

  const handleCopyHeader = () => {
    navigator.clipboard.writeText(NAD_CSV_HEADER);
    setCopied(true);
    showToast('CSV Template Header copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const schemaCategories = [
    {
      title: '1. Organization & Institution Metadata (Columns 1-7)',
      fields: ['ORG_CODE', 'ORG_NAME', 'ORG_NAME_L', 'ORG_ADDRESS', 'ORG_CITY', 'ORG_STATE', 'ORG_PIN'],
      desc: 'Institutional identifiers, AISHE/University codes, physical campus address.'
    },
    {
      title: '2. Academic Course & Program Structure (Columns 8-22)',
      fields: ['ACADEMIC_COURSE_ID', 'COURSE_NAME', 'COURSE_SUBTITLE', 'ADMISSION_YEAR', 'DEPARTMENT', 'STREAM', 'SPECIALIZATION_MAJOR', 'SPECIALIZATION_MINOR', 'SESSION'],
      desc: 'Degree specification, department classification, specialization, and academic cohort.'
    },
    {
      title: '3. Student Identity & Government Registries (Columns 23-41)',
      fields: ['REGN_NO', 'RROLL', 'ABC_ACCOUNT_ID (APAAR)', 'CNAME', 'AADHAAR_NAME', 'GENDER', 'DOB', 'MOBILE', 'EMAIL', 'FNAME', 'MNAME', 'STUDENT_ADDRESS'],
      desc: 'DigiLocker APAAR / ABC ID mapping with student bio details.'
    },
    {
      title: '4. Degree Award, Result & Verification (Columns 42-65)',
      fields: ['RESULT', 'RESULT_TH', 'RESULT_PR', 'YEAR', 'MONTH', 'DIVISION', 'GRADE', 'PERCENT', 'DOI', 'DOV', 'CERT_NO', 'THESIS', 'REMARKS'],
      desc: 'Graduation certification, date of issue, date of verification, honors, and project theses.'
    },
    {
      title: '5. Grand Totals, CGPA & Credits (Columns 66-105)',
      fields: ['TOT', 'TOT_MAX', 'TOT_MRKS', 'GRAND_TOT_MAX', 'CGPA', 'SGPA', 'TOT_GRADE_POINTS', 'TOT_CREDIT'],
      desc: 'Cumulative performance, scale metrics (10-point scale), semester credit points.'
    },
    {
      title: '6. Modular Subject & Paper Breakdown (Columns 106-180+)',
      fields: ['SUB1NM', 'SUB1', 'SUB1MAX', 'SUB1_TH_MRKS', 'SUB1_PR_MRKS', 'SUB1_CE_MRKS', 'SUB1_GRADE', 'SUB1_CREDIT', 'SUB1_STATUS'],
      desc: 'Fine-grained subject theory, lab practical, internal continuous evaluation (CE), and vivas.'
    }
  ];

  return (
    <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #dbe2ea', padding: '28px' }}>
      {/* Template Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.45rem', color: '#0b2545', fontWeight: 600 }}>
              Master Student Record Template (CSV Schema v2.4)
            </h2>
            <span style={{
              background: '#dcfce7',
              color: '#15803d',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.74rem',
              fontWeight: 700
            }}>
              Active & Verified
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            Official standardized 180+ column schema for DigiLocker award & marksheet lodgement.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="nad-btn-secondary"
            onClick={handleCopyHeader}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
            <span>{copied ? 'Header Copied!' : 'Copy CSV Header'}</span>
          </button>
          <button
            className="nad-btn-upload"
            onClick={() => {
              downloadSampleCsvTemplate();
              showToast('Sample template CSV downloaded!');
            }}
          >
            <Download size={16} />
            <span>Download Sample CSV Template</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '20px', gap: '10px' }}>
        <button
          onClick={() => setActiveTab('raw')}
          style={{
            padding: '10px 16px',
            border: 'none',
            background: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
            cursor: 'pointer',
            borderBottom: activeTab === 'raw' ? '3px solid #0b2545' : '3px solid transparent',
            color: activeTab === 'raw' ? '#0b2545' : '#64748b',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FileCode size={16} />
          <span>Raw CSV Template & Sample Rows</span>
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          style={{
            padding: '10px 16px',
            border: 'none',
            background: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
            cursor: 'pointer',
            borderBottom: activeTab === 'schema' ? '3px solid #0b2545' : '3px solid transparent',
            color: activeTab === 'schema' ? '#0b2545' : '#64748b',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Layers size={16} />
          <span>Schema Field Hierarchy & Rules</span>
        </button>
      </div>

      {/* Content based on tab */}
      {activeTab === 'raw' ? (
        <div>
          <div style={{
            background: '#0f172a',
            color: '#e2e8f0',
            borderRadius: '10px',
            padding: '18px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.82rem',
            overflowX: 'auto',
            maxHeight: '440px',
            lineHeight: '1.6',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)'
          }}>
            <div style={{ color: '#38bdf8', marginBottom: '8px', fontWeight: 600 }}>
              # Student_Master_Record_Template.csv
            </div>
            <pre style={{ margin: 0, whiteSpace: 'pre' }}>{SAMPLE_RAW_CSV_CONTENT}</pre>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Includes official JNTUA sample row + Saveetha Engineering College (SEC) synthetic rows.
            </span>
            <button
              onClick={downloadSampleCsvTemplate}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#1d4ed8',
                fontWeight: 600,
                fontSize: '0.86rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Direct Download (.csv)
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {schemaCategories.map((cat, i) => (
            <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
              <div style={{ fontWeight: 600, color: '#0b2545', fontSize: '0.95rem', marginBottom: '4px' }}>
                {cat.title}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: '10px' }}>
                {cat.desc}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cat.fields.map((fld, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '0.76rem',
                      fontFamily: 'monospace',
                      color: '#1e293b',
                      fontWeight: 500
                    }}
                  >
                    {fld}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
