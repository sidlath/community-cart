'use client';

import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  scale?: number;
}

export default function PhoneFrame({ children, scale = 1 }: PhoneFrameProps) {
  return (
    <div
      style={{
        width: 320 * scale,
        height: 660 * scale,
        background: '#1a1208',
        borderRadius: 44 * scale,
        padding: 12 * scale,
        position: 'relative',
        boxShadow: 'inset 0 0 0 2px #3a2a1c, 0 0 0 1px #1a1208',
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: 'absolute',
          top: 18 * scale,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 110 * scale,
          height: 28 * scale,
          background: '#1a1208',
          borderRadius: 14 * scale,
          zIndex: 10,
        }}
      />
      {/* Screen */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F5EDE0',
          borderRadius: 32 * scale,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 44 * scale,
            padding: `${14 * scale}px ${24 * scale}px ${4 * scale}px`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13 * scale,
            fontWeight: 600,
            color: '#2A1810',
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 4 * scale, alignItems: 'center' }}>
            <svg width={16 * scale} height={11 * scale} viewBox="0 0 16 11" fill="currentColor">
              <rect x="0" y="6" width="3" height="5" rx="0.5" />
              <rect x="4" y="4" width="3" height="7" rx="0.5" />
              <rect x="8" y="2" width="3" height="9" rx="0.5" />
              <rect x="12" y="0" width="3" height="11" rx="0.5" />
            </svg>
            <svg width={14 * scale} height={11 * scale} viewBox="0 0 16 11" fill="currentColor" style={{ marginLeft: 2 }}>
              <path d="M8 1.5C5.5 1.5 3.2 2.4 1.4 3.9L0 2.5C2.2 0.7 5 0 8 0s5.8 0.7 8 2.5L14.6 3.9C12.8 2.4 10.5 1.5 8 1.5z" />
              <path d="M8 4.5C6.5 4.5 5 5 3.8 5.8L2.4 4.4C4 3.2 6 2.5 8 2.5s4 0.7 5.6 1.9L12.2 5.8C11 5 9.5 4.5 8 4.5z" />
              <path d="M8 7C7 7 6.2 7.3 5.5 7.7L4.2 6.4C5.3 5.7 6.6 5.3 8 5.3s2.7 0.4 3.8 1.1L10.5 7.7C9.8 7.3 9 7 8 7z" />
              <circle cx="8" cy="9.5" r="1.5" />
            </svg>
            <div style={{ width: 24 * scale, height: 11 * scale, border: '1.5px solid currentColor', borderRadius: 3, position: 'relative', marginLeft: 2 }}>
              <div style={{ position: 'absolute', inset: 1, background: 'currentColor', borderRadius: 1, width: '85%' }} />
            </div>
          </div>
        </div>
        <div style={{ height: `calc(100% - ${44 * scale}px)`, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
