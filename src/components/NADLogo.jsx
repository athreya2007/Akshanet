import React from 'react';

export default function NADLogo({ size = 38 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: '50%' }}
      >
        <circle cx="50" cy="50" r="47" stroke="#1d4ed8" strokeWidth="5" fill="#ffffff" />
        <circle cx="50" cy="50" r="41" stroke="#dc2626" strokeWidth="3" fill="#ffffff" />
        {/* Stylized NAD letters */}
        <text
          x="50%"
          y="56%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#b91c1c"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="-1"
        >
          NAD
        </text>
        {/* Subtle curve accents */}
        <path
          d="M 24 72 Q 50 82 76 72"
          stroke="#1d4ed8"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 28 27 Q 50 18 72 27"
          stroke="#1d4ed8"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
