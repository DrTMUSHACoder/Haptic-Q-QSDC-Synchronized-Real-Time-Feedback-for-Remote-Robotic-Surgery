"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [predictionActive, setPredictionActive] = useState(false);
  const [isQuantumNetwork, setIsQuantumNetwork] = useState(false);
  const [isHijacked, setIsHijacked] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [coords, setCoords] = useState({ x: 154, y: 102 });
  const [delay, setDelay] = useState(230);
  const [forceData, setForceData] = useState(new Array(30).fill({ val: 0 }));
  const [integrityData, setIntegrityData] = useState(new Array(30).fill({ val: 98 }));

  // KEYBOARD CONTROLS
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'p') setPredictionActive(prev => !prev);
      if (key === 'k') setIsQuantumNetwork(prev => !prev);
      if (key === 'h') setIsHijacked(true);
      if (key === 'r') setIsHijacked(false);

      // Manual Coords (W,A,S,D)
      if (['w', 'a', 's', 'd'].includes(key)) {
        setIsMoving(true);
        if (key === 'w') setCoords(prev => ({ ...prev, y: Math.max(0, prev.y - 10) }));
        if (key === 's') setCoords(prev => ({ ...prev, y: Math.min(255, prev.y + 10) }));
        if (key === 'a') setCoords(prev => ({ ...prev, x: Math.max(0, prev.x - 10) }));
        if (key === 'd') setCoords(prev => ({ ...prev, x: Math.min(255, prev.x + 10) }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) setIsMoving(false);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // CAMERA ACCESS
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Please allow camera access to view the live feed.");
    }
  };

  // TELEMETRY SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHijacked) {
        // Erratic movements when hijacked
        setCoords({
          x: Math.floor(Math.random() * 255),
          y: Math.floor(Math.random() * 255)
        });
        setIntegrityData(prev => [...prev.slice(1), { val: 20 + Math.random() * 40 }]);
        setDelay(Math.floor(Math.random() * 1000));
      } else {
        // Normal behavior: Coords are now manual (W,A,S,D)
        if (isQuantumNetwork) {
          setDelay(Math.floor(Math.random() * 2));
        } else {
          setDelay(prev => Math.max(180, prev + (Math.random() * 10 - 5)));
        }
      }

      // Update Graphs logic
      let newForce = 0;
      let newIntegrity = 100;

      if (isHijacked) {
        newForce = 10;
        newIntegrity = 20 + Math.random() * 40;
      } else {
        newIntegrity = predictionActive ? (98.5 + Math.random() * 1.5) : 100;
        // Force only active if moving
        if (isMoving) {
          newForce = 3 + Math.floor(Math.random() * 5);
        } else {
          newForce = 0;
        }
      }

      setForceData(prev => [...prev.slice(1), { val: newForce }]);
      setIntegrityData(prev => [...prev.slice(1), { val: newIntegrity }]);
    }, 200);

    return () => clearInterval(interval);
  }, [isHijacked, isQuantumNetwork, predictionActive, isMoving]);

  return (
    <div className="console-container">
      {/* HEADER */}
      <header className="header" style={isHijacked ? { color: 'var(--red)' } : {}}>
        <h1>HAPTIC-Q SURGEON CONSOLE</h1>
        <div className="secure-status">
          <div className="label" style={isHijacked ? { color: 'var(--red)' } : {}}>
            {isHijacked ? 'HIJACKED: ACCESS LOST' : 'SECURE LINK: ACTIVE'}
          </div>
          <div className="sub-label" style={isHijacked ? { color: 'var(--red)', opacity: 1 } : {}}>
            {isHijacked ? '!!! EMERGENCY LOCKOUT !!!' : '[ FAIL-SAFE: READY ]'}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className={`main-layout ${isHijacked ? 'hijack-mode' : ''}`}>

        {/* LEFT PANEL */}
        <div className="left-panel">

          {/* VIDEO FEED */}
          <div className="video-container" style={{ position: 'relative' }}>
            {isHijacked && (
              <div className="hijack-alert-overlay">
                <div className="warning-icon">⚠</div>
                <h2>BREACH DETECTED</h2>
                <p>UNAUTHORIZED ACCESS ATTEMPT</p>
                <p className="pulse">PRESS [R] TO RESTORE SECURITY</p>
              </div>
            )}

            {!cameraActive && !isHijacked && (
              <div className="camera-overlay">
                <button className="start-cam-btn" onClick={startCamera}>
                  INITIALIZE LIVE FEED
                </button>
                <p style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.6 }}>ENCRYPTED VIDEO CHANNEL: STANDBY</p>
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="video-feed-element"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: cameraActive ? 'block' : 'none'
              }}
            />
            <div className="scanline"></div>
            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>
          </div>

          {/* INNOVATION & MISSION PANEL */}
          <div className="innovation-panel">
            <div className="innovation-header">
              <div className="dot pulse"></div>
              <span>HACKATHON INNOVATION: HAPTIC-Q MISSION OBJECTIVES</span>
            </div>
            <div className="mission-grid">
              <div className={`mission-item ${isQuantumNetwork ? 'solved' : ''}`}>1. Network Latency: {isQuantumNetwork ? 'SOLVED' : 'CLASSICAL DELAY'}</div>
              <div className={`mission-item ${!isHijacked ? 'solved' : 'warning'}`}>2. Data Security: {!isHijacked ? 'SECURE' : 'BREACH DETECTED'}</div>
              <div className={`mission-item ${predictionActive ? 'solved' : ''}`}>3. Long-Distance Prediction: {predictionActive ? 'QML ACTIVE' : 'DISABLED'}</div>
              <div className="mission-item solved">4. Network Stability: Q-UDP ACTIVE</div>
              <div className="mission-item solved">5. Failure Risk: FAIL-SAFE READY</div>
              <div className="mission-item solved">6. Protocols: Q-ENC STANDARD</div>
            </div>
          </div>

          {/* HARDWARE LINK STATUS */}
          <div className="hardware-banner">
            <div className="h-item">[ ROBOT: 6-DOF ARM ]</div>
            <div className="h-item">[ SENSORS: STRAIN-GAUGE ]</div>
            <div className="h-item">[ INPUT: FORCE-JOYSTICK ]</div>
            <div className="h-item">[ BRAIN: JETSON-NANO ]</div>
          </div>

          {/* BOTTOM GRID */}
          <div className="bottom-grid">

            {/* Coordinate Box */}
            <div className="stat-box h-stream">
              <h3>HAPTIC COORDINATE STREAM</h3>
              <div className="coordinate-display">
                <div className="coord-mini-map">
                  <div className="coord-dot" style={{
                    left: `${(coords.x / 255) * 100}%`,
                    top: `${(coords.y / 255) * 100}%`
                  }}></div>
                </div>
                <div className="value">X: {coords.x} | Y: {coords.y}</div>
              </div>
            </div>

            {/* Protocol Box */}
            <div className={`stat-box protocol-box ${isQuantumNetwork ? 'quantum-mode' : ''} ${isHijacked ? 'hijack-mode' : ''}`}>
              <h3>PROTOCOL: STANDARD: Q-UDP/ENC</h3>
              <div className="value route" style={{ color: isHijacked ? 'var(--red)' : (isQuantumNetwork ? 'var(--cyan)' : 'var(--red)') }}>
                {isHijacked ? 'NETWORK UNSTABLE' : (isQuantumNetwork ? 'QUANTUM NETWORK' : 'CLASSICAL ROUTE')}
              </div>
              <div className="delay" style={{ color: isHijacked ? 'var(--red)' : (isQuantumNetwork ? 'var(--green)' : 'var(--red)') }}>
                {isHijacked ? 'SIGNAL INTERFERENCE' : `R-DELAY: ${delay} ms`}
              </div>
              <div style={{ fontSize: '0.7rem', color: isHijacked ? 'var(--red)' : (isQuantumNetwork ? 'var(--green)' : '#00cc66') }}>
                {isHijacked ? '!!! DATA LOSS !!!' : (isQuantumNetwork ? 'TP-LINK: 100% RELIABLE' : 'SYNC RATE: 99.70%')}
              </div>
              <div style={{ fontSize: '0.6rem', opacity: 0.5, marginTop: '4px' }}>[WASD]-JOY | [K]-NET | [H]-HIJACK | [R]-RESET</div>
            </div>

            {/* Prediction Box */}
            <div className={`stat-box prediction-box ${predictionActive ? 'active' : ''}`}>
              <span className="badge" style={{ background: predictionActive ? '#00cc66' : '#a855f7' }}>
                {predictionActive ? 'AI TRACKING' : 'QML ADVANTAGE'}
              </span>
              <h3>QUANTUM PREDICTION</h3>
              <div className="value" style={{ color: predictionActive ? '#00cc66' : '#94a3b8' }}>
                {predictionActive ? 'ACTIVE AT' : 'PRED DISABLED'}
              </div>
              <div style={{ fontSize: '0.7rem' }}>PRESS [ P ] TO TOGGLE</div>
              <div style={{ fontSize: '0.6rem', opacity: 0.6, marginTop: '4px' }}>
                Expert Mode: {predictionActive ? 'ONLINE' : 'OFFLINE'}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL (CHARTS) */}
        <div className="right-panel">

          {/* Force Chart */}
          <div className="chart-card force">
            <div className="chart-header">
              <span className="title">Haptic Force Applied (mN)</span>
              <span className="val" style={{ color: '#f59e0b' }}>{forceData[forceData.length - 1].val}</span>
            </div>
            <div style={{ width: '100%', height: '140px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forceData}>
                  <CartesianGrid stroke="#1e293b" vertical={false} />
                  <XAxis hide />
                  <YAxis hide domain={[0, 10]} />
                  <Line type="stepAfter" dataKey="val" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Integrity Chart */}
          <div className="chart-card integrity">
            <div className="chart-header">
              <span className="title">Quantum Link Integrity (1-QBER%)</span>
              <span className="val integrity-val">{integrityData[integrityData.length - 1].val.toFixed(1)}</span>
            </div>
            <div style={{ width: '100%', height: '140px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={integrityData}>
                  <CartesianGrid stroke="#1e293b" vertical={false} />
                  <XAxis hide />
                  <YAxis hide domain={[90, 100]} />
                  <Line type="monotone" dataKey="val" stroke="#00ff88" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fail-safe Box */}
          <div className="fail-safe-outer">
            <div className="fail-safe-box">QUANTUM FAIL-SAFE</div>
            <div className="qber-stats">
              <div>
                <div>QBER [Error Rate]: 1.28%</div>
                <div>LINK STABILITY: 96.2%</div>
                <div>QEC: ACTIVE | REPAIRS: 3015</div>
              </div>
              <div className="secure-badge">SECURE</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
