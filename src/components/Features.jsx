import React from 'react';

const Features = () => {
  const featureList = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="var(--accent-primary)" /><stop offset="100%" stopColor="var(--accent-secondary)" /></linearGradient></defs>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Our dedicated backend ensures your video extracts at maximum bandwidth speeds."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
        </svg>
      ),
      title: "Pristine Quality",
      description: "Download up to 4K resolution keeping the original crystal clear quality intact."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "100% Secure",
      description: "No malware, no ads, no trackers. A completely safe utility for your media needs."
    }
  ];

  return (
    <section id="features" style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={styles.header} className="animate-fade-in delay-300">
          <h2 style={styles.heading}>Why Choose <span className="gradient-text">VidStud?</span></h2>
          <p style={styles.subtitle}>Built for professionals, available to everyone. We prioritize speed and quality above all.</p>
        </div>
        
        <div style={styles.grid}>
          {featureList.map((feature, idx) => (
            <div key={idx} className="glass-panel animate-fade-in" style={{...styles.card, animationDelay: `${400 + (idx * 100)}ms`}}>
              <div style={styles.iconWrapper}>{feature.icon}</div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { padding: '6rem 0', backgroundColor: '#0a0d14', borderTop: '1px solid rgba(255,255,255,0.03)' },
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  header: { textAlign: 'center', marginBottom: '4rem', maxWidth: '600px' },
  heading: { fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' },
  subtitle: { color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' },
  card: { padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default' },
  iconWrapper: { width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(138, 43, 226, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(138, 43, 226, 0.2)' },
  cardTitle: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text-primary)' },
  cardDesc: { color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }
};

export default Features;
