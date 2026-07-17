import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";
import { AffiliateCard } from "@/components/AffiliateCard";
import { cookies, headers } from "next/headers";
import { getLocalizedContent, Currency } from "@/lib/globalization";

type Section = {
  title: string;
  body: string[];
  sectionAsins?: string[];
};

// ── Inline markdown: **bold**, *italic*, `code`
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Pattern: **bold**, *italic*, `code`
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[0].startsWith("**")) {
      parts.push(<strong key={match.index}>{match[2]}</strong>);
    } else if (match[0].startsWith("`")) {
      parts.push(<code key={match.index} style={{ background: "#f2ece4", borderRadius: 4, padding: "1px 5px", fontSize: "0.88em", fontFamily: "monospace" }}>{match[4]}</code>);
    } else {
      parts.push(<em key={match.index}>{match[3]}</em>);
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts;
}

// ── Render a markdown table from an array of pipe-separated rows
function renderTable(rows: string[], localizeContent: (s: string) => string): React.ReactNode {
  const parsed = rows.map(r =>
    r.replace(/^\||\|$/g, "").split("|").map(c => c.trim())
  );
  const header = parsed[0];
  const body = parsed.slice(2); // skip separator row
  return (
    <div className="table-wrap" key={rows[0]}>
      <table>
        <thead>
          <tr>{header.map((h, i) => <th key={i}>{renderInline(localizeContent(h))}</th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{renderInline(localizeContent(cell))}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Classify each line and group into blocks
type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; rows: string[] }
  | { type: "blockquote"; text: string };

function parseBody(lines: string[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank or empty
    if (!line.trim()) { i++; continue; }

    // Table
    if (line.trimStart().startsWith("|")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableRows.push(lines[i]);
        i++;
      }
      blocks.push({ type: "table", rows: tableRows });
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line.trimStart())) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trimStart())) {
        items.push(lines[i].replace(/^[\s]*[-*]\s/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trimStart())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        items.push(lines[i].replace(/^[\s]*\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Blockquote
    if (line.trimStart().startsWith(">")) {
      blocks.push({ type: "blockquote", text: line.replace(/^[\s]*>\s?/, "") });
      i++;
      continue;
    }

    // Paragraph
    blocks.push({ type: "p", text: line });
    i++;
  }

  return blocks;
}

function renderBlocks(blocks: Block[], localizeContent: (s: string) => string): React.ReactNode[] {
  return blocks.map((block, idx) => {
    switch (block.type) {
      case "p":
        // Skip affiliate disclosure line (shown in footer already)
        if (block.text.includes("Affiliate disclosure")) {
          return null;
        }
        return (
          <p key={idx}>
            {renderInline(localizeContent(block.text))}
          </p>
        );

      case "ul":
        return (
          <ul key={idx}>
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(localizeContent(item))}</li>
            ))}
          </ul>
        );

      case "ol":
        return (
          <ol key={idx}>
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(localizeContent(item))}</li>
            ))}
          </ol>
        );

      case "table":
        return renderTable(block.rows, localizeContent);

      case "blockquote":
        return (
          <blockquote key={idx}>
            {renderInline(localizeContent(block.text))}
          </blockquote>
        );

      default:
        return null;
    }
  });
}

export async function SeoBlogPost({
  category,
  title,
  description,
  date,
  readTime,
  sections,
  children,
}: {
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  sections: Section[];
  children?: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const currency = (cookieStore.get("mirha_currency")?.value || headerStore.get("x-default-currency") || "INR") as Currency;
  const localizeContent = (text: string) => getLocalizedContent(text, currency);

  return (
    <main className="seo-post">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .seo-post {
          background: #fbf7f1;
          color: #161412;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .post-shell {
          max-width: 800px;
          margin: 0 auto;
          padding: 34px 24px 80px;
        }

        .back-link {
          color: #8b8178;
          font-size: 12px;
          text-decoration: none;
          letter-spacing: 0.05em;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .back-link:hover { color: #fc2779; }

        /* ── Hero */
        .post-hero {
          padding: 52px 0 36px;
          border-bottom: 1px solid #e3d8ce;
          margin-bottom: 36px;
        }

        .eyebrow {
          color: #fc2779;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 16px;
        }

        .post-hero h1 {
          font-family: 'Playfair Display', 'DM Serif Display', Georgia, serif;
          font-size: clamp(34px, 6vw, 60px);
          line-height: 1.06;
          font-weight: 700;
          margin: 0 0 18px;
          letter-spacing: -0.01em;
          color: #111;
        }

        .post-description {
          color: #6f665f;
          font-size: 17px;
          line-height: 1.8;
          margin: 0 0 22px;
          max-width: 640px;
        }

        .post-meta {
          color: #9a8f86;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ── Trust box */
        .trust-box {
          background: #fffaf4;
          border: 1px solid #e3d8ce;
          border-left: 3px solid #a27b5c;
          border-radius: 10px;
          padding: 18px 20px;
          margin: 0 0 32px;
        }

        .trust-box h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 6px;
          color: #a27b5c;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .trust-box p {
          color: #756b63;
          font-size: 13px;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Sections */
        .post-section {
          margin: 42px 0;
        }

        .post-section h2 {
          font-family: 'Playfair Display', 'DM Serif Display', Georgia, serif;
          font-size: clamp(24px, 4vw, 32px);
          line-height: 1.15;
          font-weight: 700;
          margin: 0 0 18px;
          color: #111;
          padding-bottom: 12px;
          border-bottom: 1px solid #e8e2d9;
        }

        .post-section p {
          color: #2c2826;
          font-size: 16px;
          line-height: 1.9;
          margin: 0 0 20px;
        }

        .post-section strong {
          color: #111;
          font-weight: 700;
        }

        .post-section em {
          font-style: italic;
          color: #4a4340;
        }

        /* ── Lists */
        .post-section ul,
        .post-section ol {
          margin: 0 0 22px;
          padding-left: 24px;
        }

        .post-section li {
          color: #2c2826;
          font-size: 16px;
          line-height: 1.85;
          margin-bottom: 10px;
        }

        .post-section ul li::marker {
          color: #fc2779;
        }

        .post-section ol li::marker {
          color: #a27b5c;
          font-weight: 700;
        }

        /* ── Tables */
        .table-wrap {
          overflow-x: auto;
          margin: 0 0 28px;
          border-radius: 10px;
          border: 1px solid #e3d8ce;
        }

        .table-wrap table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          background: #fff;
        }

        .table-wrap th {
          background: #f5ede2;
          color: #a27b5c;
          font-weight: 700;
          text-align: left;
          padding: 12px 14px;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border-bottom: 1px solid #e3d8ce;
        }

        .table-wrap td {
          padding: 11px 14px;
          color: #2c2826;
          border-bottom: 1px solid #f0e8de;
          line-height: 1.6;
          vertical-align: top;
        }

        .table-wrap tr:last-child td {
          border-bottom: none;
        }

        .table-wrap tr:nth-child(even) td {
          background: #faf5ef;
        }

        /* ── Blockquotes */
        .post-section blockquote {
          border-left: 3px solid #fc2779;
          margin: 0 0 22px;
          padding: 12px 18px;
          background: #fff5f9;
          border-radius: 0 8px 8px 0;
          color: #4a4340;
          font-size: 15px;
          line-height: 1.8;
          font-style: italic;
        }

        /* ── Inline section picks */
        .section-picks {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin: 20px 0 0;
          padding: 16px;
          background: #faf8f5;
          border-radius: 10px;
          border: 1px solid #ede7de;
        }
        .section-picks-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a27b5c;
          margin-bottom: 4px;
        }

        /* ── Editorial card: cap margin on mobile */
        .editorial-affiliate-card-wrapper {
          margin: 1.2rem 0 !important;
        }

        /* ── Inline product rail */
        .picks-rail {
          margin: 48px 0 8px;
          padding: 32px 28px 28px;
          background: #fff;
          border: 1px solid #e8e2d9;
          border-radius: 16px;
          position: relative;
        }
        .picks-rail::before {
          content: '';
          display: block;
          width: 40px;
          height: 3px;
          background: #fc2779;
          border-radius: 2px;
          margin-bottom: 16px;
        }
        .picks-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a27b5c;
          margin: 0 0 6px;
        }
        .picks-heading {
          font-family: 'Playfair Display', 'DM Serif Display', Georgia, serif;
          font-size: 20px;
          font-weight: 700;
          color: #111;
          margin: 0 0 4px;
        }
        .picks-subtext {
          font-size: 13px;
          color: #6f6963;
          margin: 0 0 24px;
          line-height: 1.6;
        }
        /* ── Product cards (legacy grid) */
        .cards-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin: 24px 0;
        }

        /* ── Footer */
        .post-footer {
          border-top: 1px solid #e3d8ce;
          margin-top: 48px;
          padding-top: 28px;
          color: #756b63;
          font-size: 13px;
          line-height: 1.75;
        }

        .post-footer a {
          color: #fc2779;
          text-decoration: none;
          font-weight: 700;
        }

        @media (max-width: 640px) {
          .post-shell { padding: 22px 16px 56px; }
          .post-hero { padding: 36px 0 26px; }
          .post-description { font-size: 15px; }
          .post-section h2 { font-size: 24px; }
          .post-section p, .post-section li { font-size: 15px; }
          .table-wrap table { font-size: 13px; }
        }

        /* ── Dark Mode Overrides */
        html.dark .seo-post, .dark .seo-post {
          background: #0b0f19 !important;
          color: #f8fafc !important;
        }
        html.dark .post-hero h1, .dark .post-hero h1,
        html.dark .post-section h2, .dark .post-section h2,
        html.dark .post-section strong, .dark .post-section strong {
          color: #ffffff !important;
        }
        html.dark .post-description, .dark .post-description,
        html.dark .post-section p, .dark .post-section p,
        html.dark .post-section li, .dark .post-section li {
          color: #d1d5db !important;
        }
        html.dark .post-section blockquote, .dark .post-section blockquote {
          background: #181c2a !important;
          color: #f1f5f9 !important;
          border-left-color: #fc2779 !important;
        }
        html.dark code, .dark code {
          background: #1e293b !important;
          color: #f472b6 !important;
        }
        html.dark .trust-box, .dark .trust-box {
          background: #111827 !important;
          border-color: #1f2937 !important;
          border-left-color: #fc2779 !important;
        }
        html.dark .trust-box h2, .dark .trust-box h2 {
          color: #f472b6 !important;
        }
        html.dark .trust-box p, .dark .trust-box p {
          color: #cbd5e1 !important;
        }
        html.dark .section-picks, .dark .section-picks,
        html.dark .picks-rail, .dark .picks-rail {
          background: #111827 !important;
          border-color: #1f2937 !important;
        }
        html.dark .picks-heading, .dark .picks-heading {
          color: #ffffff !important;
        }
        html.dark .table-wrap table, .dark .table-wrap table {
          background: #111827 !important;
        }
        html.dark .table-wrap th, .dark .table-wrap th {
          background: #1f2937 !important;
          color: #fc2779 !important;
          border-color: #374151 !important;
        }
        html.dark .table-wrap td, .dark .table-wrap td {
          color: #f8fafc !important;
          border-color: #1f2937 !important;
        }
        html.dark .table-wrap tr:nth-child(even) td, .dark .table-wrap tr:nth-child(even) td {
          background: #0f172a !important;
        }
      `}</style>

      <div className="post-shell">
        <Link href="/blog" className="back-link">
          ← Back to Journal
        </Link>

        <header className="post-hero">
          <p className="eyebrow">{category}</p>
          <h1>{localizeContent(title)}</h1>
          <p className="post-description">{localizeContent(description)}</p>
          <div className="post-meta">
            Updated {date} &nbsp;·&nbsp; {readTime} read &nbsp;·&nbsp; Affiliate links disclosed
          </div>
        </header>

        <div className="trust-box">
          <h2>How this guide was written</h2>
          <p>
            Mirha &amp; Co. reviews product fit by looking at ingredient context,
            formulation quality, regional climate, price, and real-world review signals.
            This is beauty guidance, not medical advice.
          </p>
        </div>

        {sections.map((section) => {
          const blocks = parseBody(section.body);
          return (
            <section className="post-section" key={section.title}>
              <h2>{localizeContent(section.title)}</h2>
              {renderBlocks(blocks, localizeContent)}
              {/* Per-section contextual picks */}
              {section.sectionAsins && section.sectionAsins.length > 0 && (
                <div className="section-picks">
                  <div className="section-picks-label">Recommended for this climate</div>
                  {section.sectionAsins.map((asin) => (
                    <AffiliateCard key={asin} asin={asin} compact />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {children}

        <BlogFooterTools />

        <div className="post-footer">
          <p>
            Product prices and availability can change on Amazon. Patch test skincare
            when your skin is reactive. For acne, melasma, severe hair fall or
            persistent irritation, speak to a qualified dermatologist.
          </p>
          <p>
            Next:{" "}
            <Link href="/tools/routine">build a simple routine</Link> or{" "}
            <Link href="/search">search by concern</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
