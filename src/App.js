import React, { useState, useEffect } from "react";
import Header from './components/Header';
import Features from './components/Features';

function App() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);

  // New States for Features
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const themes = ['dark', 'dark-blue', 'light'];

  // Button Hover States
  const [hoveredBtn, setHoveredBtn] = useState(null);

  // Floating Lamp Pull State
  const [isPullingLamp, setIsPullingLamp] = useState(false);

  // WebGL Fluid Background Simulator
  useEffect(() => {
    // Initialize WebGL Fluid if the script is loaded
    if (window.WebGLFluid) {
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
  const API_BASE_URL = process.env.REACT_APP_API_URL || "https://pretty-art-production-ba0d.up.railway.app";
  
  // Debug: Log API URL on mount
  useEffect(() => {
    console.log("🔗 API Base URL:", API_BASE_URL);
    console.log("🔗 Environment Variable:", process.env.REACT_APP_API_URL || "NOT SET");
  }, [API_BASE_URL]);

  // STEP 1: GET INFO
  const getInfo = async () => {
    if (!url) return;
    setIsLoadingInfo(true);
    setVideo(null); // hide previous
    try {
      console.log("🚀 Fetching from:", `${API_BASE_URL}/api/info`);
      const res = await fetch(`${API_BASE_URL}/api/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      console.log("📊 Response Status:", res.status, res.statusText);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error Response:", res.status, errorText);
        alert(`Error: ${res.status} - ${errorText}`);
        return;
      }

      const data = await res.json();
      console.log("📥 Info Response:", data);
      setVideo(data.videoDetails || data);
    } catch (err) {
      console.error("🔴 Fetch Error:", err.message);
      alert("Error fetching info: " + err.message);
    } finally {
      setIsLoadingInfo(false);
    }
  };

  // STEP 2: DOWNLOAD
  const download = async (type) => {
    setIsDownloading(true);
    try {
      console.log("🚀 Downloading from:", `${API_BASE_URL}/api/download`);
      const res = await fetch(`${API_BASE_URL}/api/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, type }),
      });

      console.log("📊 Download Response Status:", res.status, res.statusText);
      
      const text = await res.text();

      if (!res.ok) {
        console.error("❌ Download Error:", res.status, text);
        alert("Error: " + text);
        return;
      }

      const data = JSON.parse(text);
      console.log("📥 Download Data:", data);

      if (!data.downloadUrl) {
        alert("No download link");
        return;
      }

      window.open(data.downloadUrl);

    } catch (err) {
      console.error("🔴 Download Error:", err.message);
      alert("Error downloading file: " + err.message);
    } finally {
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
                      disabled={isLoadingInfo || isDownloading}
                    />
                    <button
                      onClick={getInfo}
                      className={`form-submit-btn ${hoveredBtn === 'getInfo' ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredBtn('getInfo')}
                      onMouseLeave={() => setHoveredBtn(null)}
                      disabled={isLoadingInfo || isDownloading || !url}
                    >
                      {isLoadingInfo ? 'Authenticating...' : 'Get Info'}
                    </button>
                  </div>
                </div>

                {isLoadingInfo && (
                  <div className="glass-panel loader-box animate-fade-in">
                    <div className="loader-spinner"></div>
                    <p className="loader-text">Fetching media information. Please wait...</p>
                  </div>
                )}

                {isDownloading && (
                  <div className="glass-panel loader-box animate-fade-in">
                    <div className="loader-spinner secondary"></div>
                    <p className="loader-text">Downloading media file. Almost there...</p>
                  </div>
                )}

                {!isLoadingInfo && video && (
                  <div className="glass-panel video-wrapper animate-fade-in">
                    <div className="video-info-container">
                      <img src={video?.thumbnail || "https://via.placeholder.com/300"} alt="Video thumbnail" className="video-thumbnail" />
                      <div className="video-details">
                        <h3 className="video-title">{video?.title || "No title"}</h3>
                        <div className="video-action-row">
                          <button
                            onClick={() => download("video-only")}
                            className={`download-btn ${hoveredBtn === 'video-only' ? 'hovered' : ''}`}
                            onMouseEnter={() => setHoveredBtn('video-only')}
                            onMouseLeave={() => setHoveredBtn(null)}
                            disabled={isDownloading}
                          >
                            Download Video
                          </button>
                        </div>
                      </div>
                    </div>
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