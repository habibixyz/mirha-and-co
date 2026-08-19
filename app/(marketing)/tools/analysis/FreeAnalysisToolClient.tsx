"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Camera, Upload, Check, Loader2, ArrowRight, Lock, AlertCircle } from "lucide-react";

interface AnalysisReport {
  barrierScore: number;
  acneScore: number;
  rednessScore: number;
  oilinessScore: number;
  summary: string;
  concerns: string[];
  routineAdjustments: string[];
  agentWelcomeMessage: string;
}

export default function FreeAnalysisToolClient({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [requiresSubscription, setRequiresSubscription] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size must be under 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setErrorMsg("");
      setReport(null);
      setRequiresSubscription(false);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
        setErrorMsg("");
      }
    } catch (err) {
      setErrorMsg("Unable to access camera. Please upload a photo instead.");
    }
  };

  const captureCameraPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setSelectedImage(dataUrl);

        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach((t) => t.stop());
        setIsCameraActive(false);
        setErrorMsg("");
      }
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setErrorMsg("");
    setRequiresSubscription(false);

    try {
      const res = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: selectedImage }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429 || data.requiresSubscription) {
          setRequiresSubscription(true);
          setErrorMsg(data.message || "Daily free scan limit reached (1 scan/day per IP). Subscribe to Pro for unlimited scans.");
        } else {
          setErrorMsg(data.error || data.message || "Analysis failed. Please try another photo.");
        }
        setAnalyzing(false);
        return;
      }

      const resultReport = data.analysis?.detailedJson || data.analysis;
      setReport(resultReport);
      setRecommendedProducts(data.recommendedProducts || []);
    } catch (err: any) {
      setErrorMsg(err.message || "Connection error. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const resetPhoto = () => {
    setSelectedImage(null);
    setReport(null);
    setRecommendedProducts([]);
    setErrorMsg("");
    setIsCameraActive(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mirha-editorial-tool w-full" style={{ maxWidth: "1120px", marginLeft: "auto", marginRight: "auto", width: "100%" }}>
      <style>{`
        .mirha-editorial-tool {
          --paper: #EDEAE0;
          --paper-2: #E4E0D2;
          --ink: #211E1A;
          --ink-soft: #4B4740;
          --plum: #fc2779;
          --green: #33513C;
          --green-tint: #E4EBE1;
          --gold: #A9812F;
          --line: #C9C3B3;
          --line-strong: #211E1A;
          max-width: 1120px;
          margin: 0 auto;
        }

        .dark .mirha-editorial-tool {
          --paper: #0c0a09;
          --paper-2: #161413;
          --ink: #f7f5f2;
          --ink-soft: #a3978c;
          --plum: #ff4d94;
          --green: #4ade80;
          --green-tint: rgba(74, 222, 128, 0.15);
          --gold: #facc15;
          --line: rgba(255,255,255,0.12);
          --line-strong: rgba(255,255,255,0.25);
        }

        .hero-editorial {
          padding: 16px 0 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .eyebrow-line {
          font-family: var(--font-ibm-mono, monospace), monospace;
          font-size: 11.5px;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--green);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .eyebrow-line::before {
          content: "";
          width: 7px;
          height: 7px;
          background: var(--green);
          border-radius: 50%;
          display: inline-block;
        }

        .hero-h1 {
          font-family: var(--font-playfair), serif;
          font-weight: 500;
          font-size: clamp(32px, 5vw, 54px);
          line-height: 1.08;
          margin: 0 auto 16px;
          max-width: 760px;
          letter-spacing: -.01em;
          color: var(--ink);
          text-align: center;
        }

        .hero-h1 em {
          font-style: italic;
          color: var(--plum);
        }

        .hero-desc {
          font-size: 16px;
          line-height: 1.6;
          color: var(--ink-soft);
          max-width: 620px;
          margin: 0 auto 24px;
          text-align: center;
        }

        .status-bar-box {
          width: 100%;
          max-width: 920px;
          margin: 20px auto 0;
          border: 1px solid var(--line-strong);
          background: var(--paper-2);
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          border-radius: 8px;
        }

        .status-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .status-dot-indicator {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--green);
          flex-shrink: 0;
        }

        .status-left b {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
        }

        .status-left span {
          font-size: 13px;
          color: var(--ink-soft);
        }

        .badge-active-tag {
          font-family: var(--font-ibm-mono, monospace), monospace;
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: .05em;
          color: var(--green);
          border: 1px solid var(--green);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .status-bar-box a {
          font-family: var(--font-ibm-mono, monospace), monospace;
          font-size: 12.5px;
          text-decoration: none;
          color: var(--plum);
          border-bottom: 1px solid var(--plum);
          white-space: nowrap;
          transition: opacity 0.2s;
        }

        .status-bar-box a:hover {
          opacity: 0.8;
        }

        .tool-grid {
          padding: 28px 0 60px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 28px;
          align-items: stretch;
        }

        @media (max-width: 920px) {
          .tool-grid {
            grid-template-columns: 1fr;
          }
        }

        .panel-box {
          border: 1px solid var(--line-strong);
          background: var(--paper-2);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .panel-head-bar {
          padding: 16px 20px;
          border-bottom: 1px dashed var(--line-strong);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .panel-head-bar h3 {
          font-family: var(--font-playfair), serif;
          font-style: italic;
          font-weight: 500;
          font-size: 20px;
          margin: 0;
          color: var(--ink);
        }

        .panel-head-bar span {
          font-family: var(--font-ibm-mono, monospace), monospace;
          font-size: 11px;
          color: var(--ink-soft);
        }

        .dropzone-container {
          margin: 20px;
          border: 1.5px dashed var(--line-strong);
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 32px 24px;
          background: var(--paper);
          border-radius: 8px;
          transition: background 0.2s, border-color 0.2s;
        }

        .dz-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 16px;
          color: var(--ink);
        }

        .dropzone-container h4 {
          font-family: var(--font-playfair), serif;
          font-style: italic;
          font-weight: 500;
          font-size: 22px;
          margin: 0 0 10px;
          color: var(--ink);
        }

        .dropzone-container p {
          font-size: 13.5px;
          color: var(--ink-soft);
          line-height: 1.6;
          max-width: 380px;
          margin: 0 0 20px;
        }

        .dz-actions-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-editorial {
          font-family: var(--font-ibm-mono, monospace), monospace;
          font-size: 12.5px;
          padding: 11px 22px;
          border: 1px solid var(--line-strong);
          background: transparent;
          cursor: pointer;
          color: var(--ink);
          border-radius: 6px;
          transition: background 0.2s, color 0.2s;
        }

        .btn-editorial.primary {
          background: var(--ink);
          color: var(--paper);
        }

        .btn-editorial.primary:hover {
          background: var(--plum);
          border-color: var(--plum);
          color: #ffffff;
        }

        .btn-editorial:hover {
          background: var(--paper-2);
        }

        .preview-img-box {
          max-width: 100%;
          max-height: 260px;
          margin-bottom: 18px;
          border: 1px solid var(--line-strong);
          border-radius: 8px;
          object-fit: cover;
        }

        .privacy-line-bar {
          padding: 14px 20px 20px;
          font-size: 12px;
          color: var(--ink-soft);
          line-height: 1.6;
          display: flex;
          gap: 8px;
          align-items: flex-start;
          margin-top: auto;
        }

        .privacy-line-bar .dot {
          color: var(--green);
        }

        .analyze-list-box {
          padding: 6px 20px 18px;
        }

        .a-row-item {
          padding: 14px 0;
          border-bottom: 1px solid var(--line);
        }

        .a-row-item:last-child {
          border-bottom: none;
        }

        .a-top-line {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .a-top-line b {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
        }

        .a-top-line span {
          font-family: var(--font-ibm-mono, monospace), monospace;
          font-size: 10.5px;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: .05em;
          font-weight: 600;
        }

        .a-row-item p {
          margin: 0;
          font-size: 12.5px;
          color: var(--ink-soft);
          line-height: 1.55;
        }

        .disclaimer-box-item {
          margin: 0 20px 20px;
          border: 1px solid var(--line-strong);
          padding: 14px 16px;
          font-family: var(--font-ibm-mono, monospace), monospace;
          font-size: 11px;
          line-height: 1.6;
          color: var(--ink-soft);
          border-radius: 6px;
          background: var(--paper);
        }

        .disclaimer-box-item b {
          color: var(--ink);
        }

        .result-ticket {
          padding: 20px;
          border-top: 1px dashed var(--line-strong);
          background: var(--paper);
        }

        .r-row-metric {
          margin-bottom: 14px;
        }

        .r-top-metric {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-ibm-mono, monospace), monospace;
          font-size: 11.5px;
          margin-bottom: 6px;
        }

        .r-top-metric .label {
          text-transform: uppercase;
          letter-spacing: .04em;
          color: var(--ink-soft);
        }

        .r-top-metric .score {
          font-weight: 600;
          color: var(--ink);
        }

        .bar-track {
          height: 8px;
          background: var(--paper-2);
          border: 1px solid var(--line-strong);
          overflow: hidden;
          border-radius: 4px;
        }

        .bar-fill-color {
          height: 100%;
          background: var(--green);
          transition: width 0.6s ease;
        }

        .result-summary-text {
          font-family: var(--font-ibm-mono, monospace), monospace;
          font-size: 11px;
          color: var(--ink-soft);
          border-top: 1px dashed var(--line-strong);
          padding-top: 12px;
          margin-top: 12px;
          line-height: 1.6;
        }
      `}</style>

      {/* Header & Status Section */}
      <header className="hero-editorial" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", margin: "0 auto" }}>
        <div className="eyebrow-line">1 free scan every 24 hours · 1 photo per device</div>
        
        <h1 className="hero-h1" style={{ margin: "0 auto 16px" }}>
          See what your skin is <em>actually</em> doing.
        </h1>
        
        <p className="hero-desc" style={{ margin: "0 auto 24px" }}>
          Upload one selfie for an instant read on moisture barrier strength, congestion, redness, and oil levels — built for quick cosmetic guidance, not a clinical diagnosis.
        </p>

        <div className="status-bar-box" style={{ margin: "20px auto 0" }}>
          <div className="status-left">
            <span className="status-dot-indicator"></span>
            <b>1 free scan available today</b>
            <span className="badge-active-tag">Active</span>
            <span>· Resets every 24 hours, per device</span>
          </div>
          <Link href="/pricing">Need unlimited scans? See Pro plans →</Link>
        </div>
      </header>

      {/* Tool Main Grid Section */}
      <main className="tool-grid" style={{ maxWidth: "1120px", marginLeft: "auto", marginRight: "auto", width: "100%" }}>
        {/* Left Panel: Upload Dropzone & Camera */}
        <div className="panel-box">
          <div className="panel-head-bar">
            <h3>Upload your selfie</h3>
            <span>
              {analyzing
                ? "Scanning…"
                : report
                ? "Scan complete"
                : selectedImage
                ? "Photo ready"
                : "No photo yet"}
            </span>
          </div>

          <div className="dropzone-container">
            {!isLoggedIn ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 8px" }}>
                <div className="dz-icon-circle" style={{ borderColor: "var(--plum)", color: "var(--plum)" }}>
                  <Lock size={20} />
                </div>
                <h4>Sign in to Unlock Free Scan</h4>
                <p>Join Mirha &amp; Co. to get 1 free AI skin scan every 24 hours, track your skin barrier progress over time, and unlock your personalized skincare dashboard.</p>
                <div className="dz-actions-row" style={{ marginTop: "8px" }}>
                  <Link
                    href="/login?redirect=/tools/analysis"
                    className="btn-editorial primary"
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register?redirect=/tools/analysis"
                    className="btn-editorial"
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {!selectedImage && !isCameraActive && (
                  <div>
                    <div className="dz-icon-circle">◎</div>
                    <h4>Drop a selfie here</h4>
                    <p>For the clearest read, use even lighting, face the camera straight on, and skip filters or heavy makeup.</p>
                    
                    <div className="dz-actions-row">
                      <button
                        className="btn-editorial primary"
                        onClick={() => fileInputRef.current?.click()}
                        type="button"
                      >
                        Choose photo
                      </button>
                      <button
                        className="btn-editorial"
                        onClick={startCamera}
                        type="button"
                      >
                        Take photo
                      </button>
                    </div>
                  </div>
                )}

                {/* Live Camera Viewport */}
                {isCameraActive && (
                  <div style={{ width: "100%" }}>
                    <video ref={videoRef} className="preview-img-box" style={{ width: "100%", maxHeight: "320px" }} />
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                    <div className="dz-actions-row">
                      <button className="btn-editorial primary" onClick={captureCameraPhoto} type="button">
                        Capture photo
                      </button>
                    </div>
                  </div>
                )}

                {/* Selected Image Preview & Scan Action */}
                {selectedImage && !isCameraActive && (
                  <div style={{ width: "100%" }}>
                    <img src={selectedImage} alt="Selfie preview" className="preview-img-box" />
                    <div className="dz-actions-row">
                      <button
                        className="btn-editorial primary"
                        onClick={handleRunAnalysis}
                        disabled={analyzing}
                        type="button"
                      >
                        {analyzing ? "Scanning…" : "Run free scan"}
                      </button>
                      <button
                        className="btn-editorial"
                        onClick={resetPhoto}
                        disabled={analyzing}
                        type="button"
                      >
                        Choose a different photo
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Targeted Product Recommendations */}
          {report && recommendedProducts.length > 0 && (
            <div
              style={{
                padding: "24px 20px 24px",
                borderTop: "1px dashed var(--line-strong)",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "18px",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "var(--ink)",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: "var(--plum)" }}>✦</span> Recommended Products
              </h4>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                }}
              >
                {recommendedProducts.map((prod) => (
                  <div
                    key={prod.asin}
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--line-strong)",
                      borderRadius: "8px",
                      padding: "14px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {prod.imageUrl ? (
                        <div
                          style={{
                            width: "100%",
                            height: "120px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            background: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(0,0,0,0.05)",
                          }}
                        >
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                              padding: "4px",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "120px",
                            borderRadius: "6px",
                            background: "var(--paper-2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--ink-soft)",
                            fontSize: "11px",
                          }}
                        >
                          No Image
                        </div>
                      )}

                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-ibm-mono), monospace",
                            fontSize: "9px",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: "var(--gold)",
                            fontWeight: 600,
                          }}
                        >
                          {prod.brand}
                        </span>
                        <h5
                          style={{
                            fontSize: "12.5px",
                            fontWeight: 500,
                            color: "var(--ink)",
                            margin: 0,
                            lineHeight: "1.4",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            height: "35px",
                          }}
                          title={prod.name}
                        >
                          {prod.name}
                        </h5>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginTop: "4px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
                        ₹{prod.price}
                      </span>

                      {prod.reviewUrl && (
                        <a
                          href={prod.reviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-editorial primary"
                          style={{
                            padding: "6px 12px",
                            fontSize: "10px",
                            textDecoration: "none",
                            borderRadius: "4px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          View Details
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: "none" }}
          />

          {/* Error / Rate Limit Banner */}
          {errorMsg && (
            <div style={{ padding: "0 20px 16px" }}>
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "6px",
                  border: "1px solid var(--plum)",
                  background: "rgba(252,39,121,0.08)",
                  color: "var(--ink)",
                  fontSize: "13px",
                  lineHeight: "1.5",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  {requiresSubscription ? "Daily Free Scan Limit Reached" : "Analysis Notice"}
                </div>
                <div>{errorMsg}</div>
                {requiresSubscription && (
                  <div style={{ marginTop: "12px" }}>
                    <Link
                      href="/pricing"
                      className="btn-editorial primary"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}
                    >
                      See Pro Plans <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="privacy-line-bar">
            <span className="dot">●</span>
            <span>Photos are processed for this scan only and are never stored, sold, or used for marketing. One free scan is guaranteed per device every 24 hours.</span>
          </div>
        </div>

        {/* Right Panel: What We Look At & Live Results */}
        <aside className="panel-box">
          <div className="panel-head-bar">
            <h3>What we look at</h3>
            <span>4 markers</span>
          </div>

          <div className="analyze-list-box">
            <div className="a-row-item">
              <div className="a-top-line">
                <b>Moisture barrier</b>
                <span>Hydration</span>
              </div>
              <p>Surface hydration, flaking, and general lipid balance.</p>
            </div>

            <div className="a-row-item">
              <div className="a-top-line">
                <b>Congestion</b>
                <span>Texture</span>
              </div>
              <p>Visible pore congestion, blackheads, and active breakouts.</p>
            </div>

            <div className="a-row-item">
              <div className="a-top-line">
                <b>Redness</b>
                <span>Sensitivity</span>
              </div>
              <p>Localized flushing and visible capillary patterns.</p>
            </div>

            <div className="a-row-item">
              <div className="a-top-line">
                <b>Shine</b>
                <span>Sebum</span>
              </div>
              <p>Oil concentration across the T-zone and cheeks.</p>
            </div>
          </div>

          <div className="disclaimer-box-item">
            <b>Not a medical device.</b> This scan gives general cosmetic guidance from a photo — it can't diagnose skin conditions. See a dermatologist for anything that concerns you.
          </div>

          {/* Live Diagnostic Results Ticket */}
          <div className="result-ticket">
            <div className="r-row-metric">
              <div className="r-top-metric">
                <span className="label">Moisture barrier</span>
                <span className="score">{report ? `${report.barrierScore}/100` : "—"}</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill-color"
                  style={{ width: report ? `${report.barrierScore}%` : "0%" }}
                />
              </div>
            </div>

            <div className="r-row-metric">
              <div className="r-top-metric">
                <span className="label">Congestion</span>
                <span className="score">{report ? `${report.acneScore}/100` : "—"}</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill-color"
                  style={{
                    width: report ? `${report.acneScore}%` : "0%",
                    background: report && report.acneScore < 60 ? "#d97706" : "var(--green)",
                  }}
                />
              </div>
            </div>

            <div className="r-row-metric">
              <div className="r-top-metric">
                <span className="label">Redness</span>
                <span className="score">{report ? `${report.rednessScore}/100` : "—"}</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill-color"
                  style={{
                    width: report ? `${report.rednessScore}%` : "0%",
                    background: report && report.rednessScore < 60 ? "#dc2626" : "var(--green)",
                  }}
                />
              </div>
            </div>

            <div className="r-row-metric">
              <div className="r-top-metric">
                <span className="label">Shine</span>
                <span className="score">{report ? `${report.oilinessScore}/100` : "—"}</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill-color"
                  style={{ width: report ? `${report.oilinessScore}%` : "0%" }}
                />
              </div>
            </div>

            <div className="result-summary-text">
              {report ? report.summary : "Sample scan preview — upload a photo to generate live dermatological analysis."}
            </div>

            {report?.routineAdjustments && report.routineAdjustments.length > 0 && (
              <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px dashed var(--line-strong)" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: "var(--plum)", marginBottom: "6px" }}>
                  Recommended Actives
                </div>
                <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {report.routineAdjustments.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
