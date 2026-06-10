"use client";

import { useState } from "react";
import { submitLeadAction } from "@/app/(saas)/actions";
import { Building2, User, Mail, Link as LinkIcon, Compass, Sparkles } from "lucide-react";

export default function CollabForm() {
 const [formData, setFormData] = useState({
 brandName: "",
 contactName: "",
 email: "",
 productUrl: "",
 actives: "",
 });

 const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
 const [loadingStep, setLoadingStep] = useState(0);
 const [errorMessage, setErrorMessage] = useState("");

 const steps = [
 "Establishing secure audit channel...",
 "Scanning key active concentrations...",
 "Auditing formulation safety parameters...",
 "Registering review with Curation Board...",
 ];

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!formData.brandName || !formData.contactName || !formData.email) {
 setErrorMessage("Please fill in all required fields.");
 setStatus("error");
 return;
 }

 setStatus("loading");
 setLoadingStep(0);

 // Simulate audit verification steps
 const interval = setInterval(() => {
 setLoadingStep((prev) => {
 if (prev < steps.length - 1) {
 return prev + 1;
 }
 clearInterval(interval);
 return prev;
 });
 }, 700);

 try {
 const result = await submitLeadAction(
 formData.email,
 "collab",
 JSON.stringify({
 brandName: formData.brandName,
 contactName: formData.contactName,
 productUrl: formData.productUrl,
 actives: formData.actives,
 })
 );

 clearInterval(interval);

 if (result && "error" in result) {
 setStatus("error");
 setErrorMessage(result.error || "Submission failed. Please try again.");
 } else {
 // Complete the loading transition smoothly
 setLoadingStep(steps.length);
 setTimeout(() => {
 setStatus("success");
 }, 500);
 }
 } catch (err) {
 clearInterval(interval);
 console.error(err);
 setStatus("error");
 setErrorMessage("Form submission failed. Please check your network.");
 }
 };

 return (
 <div className="collab-container">
 <style>{`
 .collab-container {
 max-width: 580px;
 margin: 0 auto;
 width: 100%;
 }

 .collab-card {
 background: rgba(255, 255, 255, 0.45);
 backdrop-filter: blur(16px);
 -webkit-backdrop-filter: blur(16px);
 border: 1px solid rgba(255, 255, 255, 0.25);
 border-radius: 24px;
 padding: 3rem 2.5rem;
 box-shadow: 0 30px 60px rgba(0, 0, 0, 0.04), 
 inset 0 0 0 1px rgba(255, 255, 255, 0.3);
 position: relative;
 overflow: hidden;
 transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
 }

 .collab-card:hover {
 border-color: rgba(162, 123, 92, 0.3);
 box-shadow: 0 35px 70px rgba(162, 123, 92, 0.05),
 inset 0 0 0 1px rgba(255, 255, 255, 0.5);
 }

 .dark-theme-override {
 background: rgba(12, 10, 9, 0.95);
 border: 1px solid rgba(255, 255, 255, 0.06);
 color: #fff;
 }

 .form-grid {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 1.2rem;
 margin-bottom: 1.5rem;
 }

 @media (max-width: 600px) {
 .form-grid {
 grid-template-columns: 1fr;
 }
 .collab-card {
 padding: 2rem 1.5rem;
 }
 }

 .form-group {
 display: flex;
 flex-direction: column;
 gap: 0.5rem;
 }

 .form-group.full-width {
 grid-column: span 2;
 }

 @media (max-width: 600px) {
 .form-group.full-width {
 grid-column: span 1;
 }
 }

 .form-label {
 font-size: 0.65rem;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 font-weight: 700;
 color: #8c8179;
 display: flex;
 align-items: center;
 gap: 6px;
 }

 .input-wrapper {
 position: relative;
 display: flex;
 align-items: center;
 }

 .input-icon {
 position: absolute;
 left: 14px;
 color: #8c8179;
 opacity: 0.7;
 }

 .collab-input,
 .collab-textarea {
 width: 100%;
 background: rgba(255, 255, 255, 0.6);
 border: 1px solid rgba(0, 0, 0, 0.08);
 border-radius: 10px;
 padding: 12px 14px 12px 40px;
 font-size: 0.88rem;
 color: #2b2826;
 outline: none;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 }

 .collab-textarea {
 padding-left: 14px;
 resize: vertical;
 min-height: 80px;
 }

 .collab-input:focus,
 .collab-textarea:focus {
 background: #fff;
 border-color: #a27b5c;
 box-shadow: 0 0 0 3px rgba(162, 123, 92, 0.12);
 }

 .submit-btn {
 width: 100%;
 background: #111;
 color: #fff;
 border: none;
 border-radius: 10px;
 padding: 14px;
 font-size: 0.75rem;
 letter-spacing: 0.15em;
 text-transform: uppercase;
 font-weight: 700;
 cursor: pointer;
 transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 8px;
 box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
 position: relative;
 overflow: hidden;
 }

 .submit-btn:hover {
 background: #000;
 transform: translateY(-2px);
 box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
 }

 .submit-btn::after {
 content: "";
 position: absolute;
 top: 0; left: -100%; width: 50%; height: 100%;
 background: linear-gradient(
 90deg,
 transparent,
 rgba(255, 255, 255, 0.2),
 transparent
 );
 transform: skewX(-25deg);
 transition: 0.75s;
 }

 .submit-btn:hover::after {
 left: 125%;
 transition: 0.75s cubic-bezier(0.16, 1, 0.3, 1);
 }

 .badge-trust {
 font-size: 0.62rem;
 text-align: center;
 color: #8c8179;
 margin-top: 1.2rem;
 line-height: 1.5;
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 6px;
 }

 /* Loading Overlay Styling */
 .loading-overlay {
 position: absolute;
 inset: 0;
 background: rgba(255, 255, 255, 0.95);
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 padding: 2rem;
 text-align: center;
 z-index: 10;
 animation: fadeIn 0.3s ease;
 }

 .spinner-pearly {
 width: 48px;
 height: 48px;
 border-radius: 50%;
 background: conic-gradient(from 0deg, transparent 30%, #a27b5c 100%);
 -webkit-mask: radial-gradient(circle, transparent 58%, #000 60%);
 mask: radial-gradient(circle, transparent 58%, #000 60%);
 animation: spin 1s linear infinite;
 margin-bottom: 1.5rem;
 }

 .loading-title {
 font-size: 0.95rem;
 font-weight: 600;
 color: #2b2826;
 margin-bottom: 0.5rem;
 }

 .loading-step-text {
 font-size: 0.8rem;
 color: #8c8179;
 min-height: 1.2rem;
 animation: pulse 1s infinite alternate;
 }

 /* Success screen styling */
 .success-screen {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 text-align: center;
 padding: 1rem 0;
 animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
 }

 .check-circle {
 width: 64px;
 height: 64px;
 border-radius: 50%;
 background: #fbf7f2;
 border: 1px solid #ded7cf;
 color: #a27b5c;
 display: flex;
 align-items: center;
 justify-content: center;
 margin-bottom: 1.5rem;
 box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
 }

 .success-title {
 font-family: var(--font-playfair), serif;
 font-size: 1.8rem;
 font-weight: 700;
 color: #111;
 margin-bottom: 1rem;
 }

 .success-desc {
 font-size: 0.95rem;
 color: #8c8179;
 line-height: 1.6;
 margin-bottom: 1.5rem;
 }

 .error-banner {
 background: #fdf2f2;
 border: 1px solid #fbd5d5;
 color: #9b1c1c;
 border-radius: 8px;
 padding: 10px;
 font-size: 0.8rem;
 margin-bottom: 1.2rem;
 text-align: center;
 }

 @keyframes spin {
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
 }

 @keyframes fadeIn {
 from { opacity: 0; }
 to { opacity: 1; }
 }

 @keyframes scaleUp {
 from { opacity: 0; transform: scale(0.95); }
 to { opacity: 1; transform: scale(1); }
 }

 @keyframes pulse {
 from { opacity: 0.6; }
 to { opacity: 1; }
 }
 `}</style>

 <div className="collab-card">
 {status === "loading" && (
 <div className="loading-overlay">
 <div className="spinner-pearly"></div>
 <div className="loading-title">Curation Verification</div>
 <div className="loading-step-text">
 {loadingStep < steps.length ? steps[loadingStep] : "Finalizing registry..."}
 </div>
 </div>
 )}

 {status === "success" ? (
 <div className="success-screen">
 <div className="check-circle">
 <Sparkles size={28} />
 </div>
 <h3 className="success-title">Audit Initiated</h3>
 <p className="success-desc">
 Your formulation data for <strong>{formData.brandName}</strong> has been logged. 
 We've dispatched an verification receipt containing our clinical audit pathway parameters to <strong>{formData.email}</strong>.
 </p>
 </div>
 ) : (
 <form onSubmit={handleSubmit}>
 {status === "error" && (
 <div className="error-banner">
 {errorMessage}
 </div>
 )}

 <div className="form-grid">
 <div className="form-group">
 <label className="form-label">
 <Building2 size={12} /> Brand / Lab Name
 </label>
 <div className="input-wrapper">
 <span className="input-icon"><Building2 size={14} /></span>
 <input
 type="text"
 required
 placeholder="e.g. Solved Labs"
 value={formData.brandName}
 onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
 className="collab-input"
 />
 </div>
 </div>

 <div className="form-group">
 <label className="form-label">
 <User size={12} /> Contact Name
 </label>
 <div className="input-wrapper">
 <span className="input-icon"><User size={14} /></span>
 <input
 type="text"
 required
 placeholder="e.g. Dr. Rohan Dev"
 value={formData.contactName}
 onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
 className="collab-input"
 />
 </div>
 </div>

 <div className="form-group full-width">
 <label className="form-label">
 <Mail size={12} /> Business Email
 </label>
 <div className="input-wrapper">
 <span className="input-icon"><Mail size={14} /></span>
 <input
 type="email"
 required
 placeholder="e.g. formulations@yourbrand.com"
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="collab-input"
 />
 </div>
 </div>

 <div className="form-group full-width">
 <label className="form-label">
 <LinkIcon size={12} /> Product Website / Link
 </label>
 <div className="input-wrapper">
 <span className="input-icon"><LinkIcon size={14} /></span>
 <input
 type="url"
 placeholder="e.g. https://yourbrand.com/product"
 value={formData.productUrl}
 onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
 className="collab-input"
 />
 </div>
 </div>

 <div className="form-group full-width">
 <label className="form-label">
 <Compass size={12} /> Key Active Ingredients
 </label>
 <textarea
 placeholder="e.g. 10% Vitamin C, 0.5% Ferulic Acid (explain concentrations or unique delivery systems)"
 value={formData.actives}
 onChange={(e) => setFormData({ ...formData, actives: e.target.value })}
 className="collab-textarea"
 />
 </div>
 </div>

 <button type="submit" className="submit-btn">
 Submit Formulation for Audit
 </button>

 <div className="badge-trust">
 <Sparkles size={11} /> Curation is entirely merit-based. We do not charge or accept sponsorship for placement.
 </div>
 </form>
 )}
 </div>
 </div>
 );
}
