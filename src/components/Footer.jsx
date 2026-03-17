import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.brand}>
          <div style={styles.logoContainer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span style={styles.logoText}>Vid<span style={styles.highlight}>Fetch</span></span>
            </div>
            <p style={styles.tagline}>The ultimate tool for media extraction.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: { backgroundColor: '#0d1117', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4rem' },
  container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' },
  brand: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoText: { fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.5px' },
  highlight: { color: 'var(--accent-primary)' },
  tagline: { color: 'var(--text-secondary)', fontSize: '0.95rem' }
};

export default Footer;
