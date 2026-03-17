import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.logoContainer}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span style={styles.logoText}>Vid<span style={styles.highlight}>Stud</span></span>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: { padding: '1.5rem 0', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(13, 17, 23, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--surface-border)', transition: 'background-color 0.8s ease' },
  container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoText: { fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px', color: 'var(--text-primary)' },
  highlight: { color: 'var(--accent-primary)' }
};

export default Header;
