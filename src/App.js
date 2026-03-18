import React, { useState, useEffect } from "react";
import Header from './components/Header';
import Features from './components/Features';

function App() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);

  // Download State
  const [isDownloading, setIsDownloading] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const themes = ['dark', 'dark-blue', 'light'];

  // Button Hover States
  const [hoveredBtn, setHoveredBtn] = useState(null);

  // Floating Lamp Pull State
  const [isPullingLamp, setIsPullingLamp] = useState(false);

  // WebGL Fluid Background Simulator (disabled on mobile for better performance)
  useEffect(() => {
    // Check if device is mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Initialize WebGL Fluid only on desktop devices for performance
    if (window.WebGLFluid && !isMobile) {
      window.WebGLFluid(document.querySelector('canvas'), {
        IMMEDIATE: true,
        TRIGGER: 'hover',
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 1,
        VELOCITY_DISSIPATION: 0.2,
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 30,
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: true,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: true,
        BLOOM: true,
        BLOOM_ITERATIONS: 8,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.8,
        BLOOM_THRESHOLD: 0.6,
        BLOOM_SOFT_KNEE: 0.7,
        SUNRAYS: true,
        SUNRAYS_RESOLUTION: 196,
        SUNRAYS_WEIGHT: 1.0,
      });
    }
  }, []);

  // Theme Switcher Logic
  const toggleTheme = () => {
    const nextIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(nextIndex);
    document.documentElement.setAttribute('data-theme', themes[nextIndex]);
  };

  // Floating Lamp Pull Logic
  const handleLampPull = () => {
    setIsPullingLamp(true);
    toggleTheme();
    setTimeout(() => setIsPullingLamp(false), 300);
  };

  // Base API URL for Backend Connection (Support Local & Production Deployment)
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  
  // Test backend connection and log for debugging
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("🔗 API Base URL:", API_BASE_URL);
        console.log("🔗 Environment Variable:", process.env.REACT_APP_API_URL || "NOT SET");
        
        const response = await fetch(`${API_BASE_URL}/api/health`, { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("✅ Backend Connection Success:", data);
        } else {
          console.error("❌ Backend returned error:", response.status);
        }
      } catch (error) {
        console.error("🔴 Backend Connection Failed:", error.message);
        console.warn("Make sure backend server is running and accessible at:", API_BASE_URL);
      }
    };
    
    testConnection();
  }, [API_BASE_URL]);



  // STEP 2: DOWNLOAD MP3 - STREAMING VIA BACKEND PROXY
  const download = () => {
    if (!url) {
      alert("❌ Please enter a YouTube URL");
      return;
    }

    setIsDownloading(true);
    try {
      console.log("🚀 Starting download via backend proxy...");

      // Create download link via backend GET request
      const downloadLink = document.createElement("a");
      downloadLink.href = `${API_BASE_URL}/api/download?url=${encodeURIComponent(url)}`;
      downloadLink.download = "audio.mp3";
      downloadLink.style.display = "none";

      document.body.appendChild(downloadLink);

      console.log("⬇️ Triggering download...");
      downloadLink.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(downloadLink);
        console.log("✅ Download started!");
        setIsDownloading(false);
      }, 500);

    } catch (err) {
      console.error("🔴 Error:", err.message);
      alert("❌ Download Failed:\n" + err.message);
      setIsDownloading(false);
    }
  };

  return (
    <div className="App" style={{ position: 'relative', zIndex: 1 }}>
      {/* WebGL Fluid Canvas (Background) */}
      <canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'auto', opacity: 0.8 }}></canvas>

      {/* Floating Theme Switcher */}
      <div className="lamp-container" onMouseDown={handleLampPull}>
        <div className="lamp-pull-text">PULL</div>
        <div className="lamp-string" style={{ height: isPullingLamp ? '120px' : '80px' }}></div>
        {/* Glowing Bulb */}
        <div className="lamp-bulb-container">
          <div className="lamp-bulb-glass"></div>
          <div className="lamp-bulb-filament"></div>
          <div className="lamp-glow" style={{ opacity: isPullingLamp ? 1 : 0.8 }}></div>
        </div>
      </div>

      <Header />

      <main>
        <section className="hero-section">
          <div className="hero-background-glow"></div>
          <div className="container hero-container">
            <div className="hero-content animate-fade-in delay-100">
              <span className="hero-badge">Next-Gen Utility</span>
              <h1 className="hero-heading">
                Sheryians Downloader <br />
                <span className="gradient-text">Fast and Secure.</span>
              </h1>

              <div className="hero-form-container">
                <div className="glass-panel form-wrapper animate-fade-in delay-200">
                  <div className="form-input-group">
                    <div className="form-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}>
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                    <input
                      type="url"
                      placeholder="Paste YouTube URL here..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="form-input"
                      disabled={isDownloading}
                    />
                    <button
                      onClick={() => download()}
                      className={`form-submit-btn ${hoveredBtn === 'download' ? 'hovered' : ''}`}
                      style={{ background: 'linear-gradient(135deg, #00d4ff, #0099ff)' }}
                      onMouseEnter={() => setHoveredBtn('download')}
                      onMouseLeave={() => setHoveredBtn(null)}
                      disabled={isDownloading || !url}
                      title="Direct MP3 download"
                    >
                      {isDownloading ? '⏳ Processing...' : '⬇️ Download MP3'}
                    </button>
                  </div>
                </div>

                {isDownloading && (
                  <div className="glass-panel loader-box animate-fade-in">
                    <div className="loader-spinner secondary"></div>
                    <p className="loader-text">🎵 Preparing your MP3... Please wait (20–30 sec)</p>
                  </div>
                )}


              </div>
            </div>
          </div>
        </section>
        <Features />
      </main>
    </div>
  );
}

export default App;