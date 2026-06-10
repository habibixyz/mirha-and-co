"use client";

import { useState } from "react";

import { submitLeadAction } from "@/app/(saas)/actions";

export default function NewsletterForm() {
 const [email, setEmail] = useState("");
 const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
 const [message, setMessage] = useState("");

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!email) return;

 setStatus("loading");

 try {
 const res = await submitLeadAction(email, "newsletter");
 if (res && 'error' in res) {
 setStatus("error");
 setMessage(res.error || "Failed to subscribe.");
 } else {
 setStatus("success");
 setMessage("Thanks for subscribing! Check your inbox soon.");
 setEmail("");
 // Fallback store in localStorage as well
 try {
 const subscribers = JSON.parse(localStorage.getItem("mirha_subscribers") || "[]");
 if (!subscribers.includes(email)) {
 subscribers.push(email);
 localStorage.setItem("mirha_subscribers", JSON.stringify(subscribers));
 }
 } catch (err) {
 console.error(err);
 }
 }
 } catch (err) {
 console.error(err);
 setStatus("error");
 setMessage("Subscription failed. Please try again.");
 }
 };

 return (
 <div className="newsletter-container" style={{ width: "100%" }}>
 <style>{`
 .newsletter-form-wrapper {
 display: flex;
 gap: 8px;
 width: 100%;
 }
 .newsletter-input {
 flex: 1;
 background: rgba(255, 255, 255, 0.05);
 border: 1px solid rgba(255, 255, 255, 0.12);
 border-radius: 8px;
 padding: 12px 16px;
 color: #fff;
 font-size: 0.85rem;
 outline: none;
 transition: all 0.2s ease;
 }
 .newsletter-input:focus {
 border-color: var(--rose, #c8473a);
 background: rgba(255, 255, 255, 0.08);
 box-shadow: 0 0 0 2px rgba(200, 71, 58, 0.15);
 }
 .newsletter-submit {
 background: var(--rose, #c8473a);
 color: #fff;
 border: none;
 border-radius: 8px;
 padding: 12px 20px;
 font-size: 0.85rem;
 font-weight: 600;
 cursor: pointer;
 transition: all 0.2s ease;
 display: flex;
 align-items: center;
 justify-content: center;
 min-width: 110px;
 }
 .newsletter-submit:hover {
 background: #b23b2f;
 transform: translateY(-1px);
 }
 .newsletter-submit:active {
 transform: translateY(0);
 }
 .newsletter-submit:disabled {
 opacity: 0.7;
 cursor: not-allowed;
 }
 .newsletter-success {
 font-size: 0.85rem;
 color: #2d8a5c;
 margin-top: 8px;
 animation: fadeIn 0.3s ease;
 }
 @keyframes fadeIn {
 from { opacity: 0; transform: translateY(4px); }
 to { opacity: 1; transform: translateY(0); }
 }
 `}</style>
 
 {status === "success" ? (
 <div className="newsletter-success">
 ✓ {message}
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="newsletter-form-wrapper">
 <input
 type="email"
 placeholder="Enter your email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className="newsletter-input"
 disabled={status === "loading"}
 />
 <button
 type="submit"
 className="newsletter-submit"
 disabled={status === "loading"}
 >
 {status === "loading" ? "Joining..." : "Subscribe"}
 </button>
 </form>
 )}
 </div>
 );
}
