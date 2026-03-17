import React, { useState } from 'react';

const DownloadForm = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('1080p');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Downloading ${url} in ${quality} ${format}`);
    // Future API integration
  };

  return (
    <div className="glass-panel animate-fade-in delay-200" style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={{ ...styles.inputGroup, ...(isFocused ? styles.inputGroupFocused : {}) }}>
          <div style={styles.iconContainer}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: isFocused ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <input
            type="url"
            placeholder="Paste your video link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.optionsRow}>
          <div style={styles.selectGroup}>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              style={styles.select}
            >
              <option value="mp4">Video (MP4)</option>
              <option value="mp3">Audio (MP3)</option>
            </select>
          </div>

          <div style={styles.selectGroup}>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              style={styles.select}
              disabled={format === 'mp3'}
            >
              <option value="1080p">1080p HD</option>
              <option value="720p">720p HD</option>
              <option value="480p">480p SD</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              ...styles.submitBtn,
              ...(isHovered ? styles.submitBtnHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>Extract Now</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '2rem',
    width: '100%',
    transition: 'transform var(--transition-speed), box-shadow var(--transition-speed)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '0.75rem 1rem',
    transition: 'border-color var(--transition-speed), box-shadow var(--transition-speed)',
  },
  inputGroupFocused: {
    borderColor: 'var(--accent-primary)',
    boxShadow: '0 0 0 3px var(--focus-ring)',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  },
  input: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
    padding: '0.5rem 0',
  },
  optionsRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  selectGroup: {
    flex: 1,
    minWidth: '150px',
    position: 'relative',
  },
  select: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '1rem',
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    appearance: 'none',
    outline: 'none',
    transition: 'border-color var(--transition-speed)',
    cursor: 'pointer',
  },
  submitBtn: {
    flex: '1.5',
    minWidth: '200px',
    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem 2rem',
    fontSize: '1.05rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 14px rgba(138, 43, 226, 0.3)',
  },
  submitBtnHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(138, 43, 226, 0.4)',
  }
};

export default DownloadForm;
