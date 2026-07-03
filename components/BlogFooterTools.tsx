import Link from "next/link";

export default function BlogFooterTools() {
 return (
 <aside className="bft-wrap">
 <style>{`
 .bft-wrap {
 margin-top: 4rem;
 background: #0c0a09;
 border-radius: 12px;
 padding: 1.75rem 2rem;
 font-family: var(--font-dm-sans), sans-serif;
 border: 1px solid rgba(255,255,255,0.07);
 }

 .bft-top {
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-bottom: 1.25rem;
 padding-bottom: 1rem;
 border-bottom: 1px solid rgba(255,255,255,0.08);
 gap: 1rem;
 flex-wrap: wrap;
 }

 .bft-label {
 font-size: 0.6rem;
 letter-spacing: 0.25em;
 text-transform: uppercase;
 color: #fc2779;
 font-weight: 700;
 }

 .bft-tagline {
 font-size: 0.78rem;
 color: rgba(255,255,255,0.45);
 font-style: italic;
 }

 .bft-grid {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 1px;
 background: rgba(255,255,255,0.06);
 border-radius: 8px;
 overflow: hidden;
 }

 .bft-tool {
 background: #0c0a09;
 padding: 1.1rem 1.25rem;
 display: flex;
 flex-direction: column;
 gap: 0.3rem;
 text-decoration: none;
 transition: background 0.2s ease;
 position: relative;
 }

 .bft-tool:hover {
 background: #161210;
 }

 .bft-tool-eyebrow {
 font-size: 0.58rem;
 letter-spacing: 0.18em;
 text-transform: uppercase;
 color: rgba(255,255,255,0.35);
 font-weight: 600;
 }

 .bft-tool-name {
 font-family: var(--font-playfair), serif;
 font-size: 1rem;
 color: #ffffff;
 font-weight: 400;
 line-height: 1.25;
 }

 .bft-tool-cta {
 font-size: 0.65rem;
 letter-spacing: 0.12em;
 text-transform: uppercase;
 color: #fc2779;
 margin-top: 0.4rem;
 transition: letter-spacing 0.2s ease;
 }

 .bft-tool:hover .bft-tool-cta {
 letter-spacing: 0.18em;
 }

 @media (max-width: 640px) {
 .bft-wrap {
 padding: 1.25rem 1.25rem;
 margin-top: 3rem;
 }
 .bft-grid {
 grid-template-columns: 1fr;
 }
 .bft-tagline { display: none; }
 }
 `}</style>

 <div className="bft-top">
 <span className="bft-label">Interactive Tools</span>
 <span className="bft-tagline">From reading to doing — test your own skin.</span>
 </div>

 <div className="bft-grid">
 <Link href="/tools/hard-water" className="bft-tool">
 <span className="bft-tool-eyebrow">Free Calculator</span>
 <span className="bft-tool-name">Hard Water Test</span>
 <span className="bft-tool-cta">Check your city →</span>
 </Link>

 <Link href="/tools/dupes" className="bft-tool">
 <span className="bft-tool-eyebrow">Savings Tool</span>
 <span className="bft-tool-name">Dupe Finder</span>
 <span className="bft-tool-cta">Find dupes →</span>
 </Link>

 <Link href="/tools/ingredients" className="bft-tool">
 <span className="bft-tool-eyebrow">Label Science</span>
 <span className="bft-tool-name">Ingredient Parser</span>
 <span className="bft-tool-cta">Analyse label →</span>
 </Link>
 </div>
 </aside>
 );
}
