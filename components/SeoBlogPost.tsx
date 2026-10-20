import Link from "next/link";
import BlogFooterTools from "@/components/BlogFooterTools";
import { AffiliateCard } from "@/components/AffiliateCard";
import { getLocalizedContent, Currency } from "@/lib/globalization";
import { getRelatedPosts } from "@/lib/blog-utils";

type Section = {
  title: string;
  body: string[];
  sectionAsins?: string[];
};

// ── Inline markdown: **bold**, *italic*, `code`, [text](url)
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Pattern: **bold**, *italic*, `code`, [text](url)
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[([^\]]+)\]\(([^)]+)\))/g;
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
    } else if (match[0].startsWith("[")) {
      const linkText = match[5];
      const linkHref = match[6];
      const isExternal = linkHref.startsWith("http");
      parts.push(
        <a
          key={match.index}
          href={linkHref}
          style={{ color: "#fc2779", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "2px" }}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {linkText}
        </a>
      );
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
  views,
  slug,
  tags,
  asins,
  thumbnail,
  currency = "INR",
  children,
}: {
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  sections: Section[];
  views?: number;
  slug?: string;
  tags?: string[];
  asins?: string[];
  thumbnail?: string;
  currency?: Currency;
  children?: React.ReactNode;
}) {
  const localizeContent = (text: string) => getLocalizedContent(text, currency);

  // Compute related posts by tag overlap — only if caller passes slug + tags
  const relatedPosts = slug && tags?.length
    ? getRelatedPosts(slug, tags, 3)
    : [];

  const hasInlinePicks = sections.some(s => s.sectionAsins && s.sectionAsins.length > 0);
  const showFallbackPicks = !hasInlinePicks && asins && asins.length > 0;

  const postUrl = slug ? `https://www.mirhaandco.com/blog/${slug}` : "https://www.mirhaandco.com/blog";

  let isoDate = "2026-10-12T00:00:00.000Z";
  try {
    if (date) {
      const parsed = new Date(`${date} 01:00:00 UTC`);
      if (!isNaN(parsed.getTime())) {
        isoDate = parsed.toISOString();
      }
    }
  } catch {
    // fallback
  }

  const fullImageUrl = thumbnail
    ? (thumbnail.startsWith("http") ? thumbnail : `https://www.mirhaandco.com${thumbnail}`)
    : "https://www.mirhaandco.com/opengraph-image.png";

  const totalWords = sections.reduce(
    (acc, s) => acc + s.title.split(/\s+/).length + s.body.join(" ").split(/\s+/).length,
    0
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
    "headline": title,
    "description": description,
    "image": [fullImageUrl],
    "datePublished": isoDate,
    "dateModified": isoDate,
    "inLanguage": "en-IN",
    "wordCount": totalWords,
    "author": {
      "@type": "Organization",
      "name": "Mirha & Co. Research Team",
      "url": "https://www.mirhaandco.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mirha & Co.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mirhaandco.com/icon.png"
      }
    },
    "articleSection": category,
    "keywords": tags ? tags.join(", ") : category
  };

  const faqQuestions = slug === "dussehra-skincare-detox-glow-protocol" ? [
    {
      q: "How do I detox my skin after 9 nights of heavy festive makeup and sweat?",
      a: "Switch from harsh abrasive scrubs to a gentle, soap-free cleanser. Layer a physiological pH 5.5 care gel to neutralize Cutibacterium acnes, rehydrate with snail mucin or humectants, and seal with a bio-identical 3:1:1 ceramide moisturizer."
    },
    {
      q: "Why is October festive smoke and pollution damaging to the skin barrier?",
      a: "Dussehra effigy smoke, firework particulates, and autumn smog generate free radicals that induce oxidative stress and degrade dermal collagen. Broad-spectrum SPF with antioxidant Centella Asiatica provides crucial environmental protection."
    },
    {
      q: "How do I soothe redness and chafing caused by heavy festive jewelry?",
      a: "Avoid exfoliants or acidic actives on irritated zones. Apply a ceramide, cholesterol, and fatty acid barrier repair cream directly over the jawline and neck to accelerate lipid stratum repair."
    },
    {
      q: "Can I use strong chemical peels immediately after Dussehra?",
      a: "No. After 9 nights of heat, sweat, and makeup friction, your skin barrier is in a sensitized state. Wait 4 to 5 days while using barrier-strengthening ceramides before reintroducing strong AHAs or retinoids."
    }
  ] : slug === "navratri-skincare-garba-survival-guide" ? [
    {
      q: "How can I prevent sweat acne and breakouts during 9 nights of Navratri Garba?",
      a: "Prep with an oil-free hyaluronic acid water gel rather than heavy cold creams, avoid powdering directly over dried salty sweat, and double cleanse with a 100% soap-free cleanser at 2 AM to clear the follicles without barrier damage."
    },
    {
      q: "Why does kajal smudge during Garba and how do I prevent panda eyes?",
      a: "Body temperatures exceed 37°C during vigorous dancing, melting traditional wax kohl pencils. Use polymer-bound waterproof kajal and set the lower lash line with a sweep of translucent powder to form an oil-resistant barrier."
    },
    {
      q: "How do I heal jewelry chafing and necklace rashes from heavy festive ornaments?",
      a: "Apply physiological ceramides, cholesterol, and fatty acids in a 3:1:1 ratio before sleeping to rebuild the intercellular lipid matrix and soothe mechanical friction micro-tears."
    },
    {
      q: "What is the emergency fix for a sudden sweat pimple between Garba nights?",
      a: "Do not pop or squeeze the pimple. Apply a medical-grade hydrocolloid pimple patch overnight onto clean, dry skin to aseptically extract trapped fluid and flatten the bump without scarring."
    }
  ] : slug === "ac-face-air-conditioning-dehydration-fix" ? [
    {
      q: "Why does office air conditioning cause both dry skin and sudden afternoon oiliness?",
      a: "Commercial HVAC chillers condense and extract ambient humidity, dropping indoor relative humidity below 20%. This causes rapid Transepidermal Water Loss (TEWL). To protect against microscopic cracking, your sebaceous glands overcompensate by pumping out excess sebum, creating surface shine over dehydrated cells."
    },
    {
      q: "Why does Hyaluronic Acid make my skin drier in an air-conditioned room?",
      a: "Hyaluronic acid is an atmospheric humectant that draws moisture from its surroundings. In dry AC air with less than 30% humidity, there is no water in the air to bind. Via osmosis, the molecule reverses direction, drawing water out of your deeper dermis up to the surface where it evaporates instantly."
    },
    {
      q: "What is the best way to protect your skin barrier in a corporate office all day?",
      a: "Apply humectants (like hyaluronic acid or snail mucin) exclusively onto damp skin, and immediately seal them with a physiological ceramide barrier cream (in a 3:1:1 ratio of ceramides, cholesterol, and fatty acids) before stepping into climate-controlled rooms."
    },
    {
      q: "Should I spray a facial mist at my desk when my face feels tight?",
      a: "No. Pure water or floral mists evaporate rapidly in low-humidity air conditioning, stripping away your skin's natural moisturizing factors (NMF) in the process. If your skin feels tight, gently press a pea-sized amount of barrier cream over dry areas instead."
    }
  ] : [];

  const faqJsonLd = faqQuestions.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqQuestions.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  } : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.mirhaandco.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Journal",
        "item": "https://www.mirhaandco.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": postUrl
      }
    ]
  };

  return (
    <main className="seo-post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .seo-post {
          background: #fbf7f1;
          color: #161412;
          min-height: 100vh;
          font-family: var(--font-dm-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
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
          padding: 42px 0 32px;
          border-bottom: 1px solid #e3d8ce;
          margin-bottom: 36px;
        }

        .eyebrow {
          color: #fc2779;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 14px;
          font-family: var(--font-dm-sans), sans-serif;
        }

        .post-hero h1 {
          font-family: var(--font-dm-serif), 'DM Serif Display', Georgia, serif;
          font-size: clamp(26px, 4.5vw, 42px);
          line-height: 1.18;
          font-weight: 400;
          margin: 0 0 16px;
          letter-spacing: -0.015em;
          color: #161412;
        }

        .post-description {
          color: #5c534c;
          font-size: 16px;
          line-height: 1.75;
          margin: 0 0 20px;
          max-width: 680px;
          font-family: var(--font-dm-sans), sans-serif;
        }

        .post-meta {
          color: #8c8179;
          font-size: 11.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 500;
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
          font-family: var(--font-dm-serif), 'DM Serif Display', Georgia, serif;
          font-size: 16px;
          font-weight: 400;
          margin: 0 0 6px;
          color: #a27b5c;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .trust-box p {
          color: #756b63;
          font-size: 13.5px;
          line-height: 1.7;
          margin: 0;
          font-family: var(--font-dm-sans), sans-serif;
        }

        /* ── Sections */
        .post-section {
          margin: 42px 0;
        }

        .post-section h2 {
          font-family: var(--font-dm-serif), 'DM Serif Display', Georgia, serif;
          font-size: clamp(21px, 3.5vw, 29px);
          line-height: 1.25;
          font-weight: 400;
          margin: 0 0 16px;
          color: #161412;
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
          font-family: var(--font-dm-serif), 'DM Serif Display', Georgia, serif;
          font-size: 20px;
          font-weight: 400;
          color: #161412;
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
          .bottom-picks-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Fallback bottom recommendations */
        .bottom-recommendations {
          margin: 48px 0 0;
          padding-top: 32px;
          border-top: 1px solid #e3d8ce;
        }
        .bottom-recommendations h2 {
          margin-bottom: 8px !important;
        }
        .bottom-recommendations-sub {
          font-size: 13px;
          color: #6f6963;
          margin-bottom: 24px !important;
          line-height: 1.6;
        }
        .bottom-picks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        html.dark .bottom-recommendations, .dark .bottom-recommendations {
          border-top-color: #283044 !important;
        }
        html.dark .bottom-recommendations-sub, .dark .bottom-recommendations-sub {
          color: #9ca3af !important;
        }

        /* ── Frequently Asked Questions ── */
        .post-faq {
          margin: 48px 0 0;
          padding-top: 32px;
          border-top: 1px solid #e3d8ce;
        }
        .post-faq-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 20px;
        }
        .post-faq-item {
          background: #ffffff;
          border: 1px solid #e3d8ce;
          border-radius: 12px;
          padding: 20px 22px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .post-faq-item:hover {
          border-color: #c9b9aa;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }
        .post-faq-q {
          font-size: 16px;
          font-weight: 700;
          color: #161412;
          margin: 0 0 10px;
          line-height: 1.4;
          font-family: 'DM Sans', sans-serif;
        }
        .post-faq-a {
          font-size: 14.5px;
          color: #4a4340;
          line-height: 1.75;
          margin: 0;
        }

        /* ── Dark Mode Overrides */
        html.dark .seo-post, .dark .seo-post {
          background: #0b0f19 !important;
          color: #f8fafc !important;
        }
        html.dark .post-faq, .dark .post-faq {
          border-top-color: #283044 !important;
        }
        html.dark .post-faq-item, .dark .post-faq-item {
          background: #111827 !important;
          border-color: #1f2937 !important;
        }
        html.dark .post-faq-q, .dark .post-faq-q {
          color: #f9fafb !important;
        }
        html.dark .post-faq-a, .dark .post-faq-a {
          color: #cbd5e1 !important;
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
            Updated {date} &nbsp;·&nbsp; {readTime} read &nbsp;·&nbsp; {views ? `${views.toLocaleString()} reads · ` : ""}Affiliate links disclosed
          </div>
        </header>

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

        {/* Fallback bottom recommendations section */}
        {showFallbackPicks && (
          <section className="post-section bottom-recommendations">
            <h2>Recommended Formulations</h2>
            <p className="bottom-recommendations-sub">
              Formulations analyzed for ingredient quality, climate performance, and skin compatibility.
            </p>
            <div className="bottom-picks-grid">
              {asins.map((asin) => (
                <AffiliateCard key={asin} asin={asin} compact />
              ))}
            </div>
          </section>
        )}

        {/* ── Frequently Asked Questions (Visible for Search Snippets & Readers) ── */}
        {faqQuestions.length > 0 && (
          <section className="post-section post-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="post-faq-list">
              {faqQuestions.map((item, idx) => (
                <div key={idx} className="post-faq-item">
                  <h3 className="post-faq-q">{item.q}</h3>
                  <p className="post-faq-a">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 🛡️ Research Disclosures at End of Article */}
        <div className="trust-box" style={{ marginTop: "3rem" }}>
          <h2>Editorial Note</h2>
          <p>
            Mirha &amp; Co. reviews skincare using ingredient analysis, formulation pH compatibility, and regional tap water hardness data. Simple guides for educational purposes—always patch test new products on your skin.
          </p>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            fontSize: "12px",
            color: "#5c5249",
            background: "#f4ede4",
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1px solid #e3d8ce",
            marginTop: "14px"
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600, color: "#161412" }}>
              <span style={{ color: "#fc2779" }}>✓</span> Independent Formulation Research
            </span>
            <span style={{ color: "#c2b5a9" }}>|</span>
            <span>💧 City Tap Water Telemetry</span>
            <span style={{ color: "#c2b5a9" }}>|</span>
            <span>✍️ Mirha &amp; Co.</span>
          </div>
        </div>

        {children}

        {/* ── Related Articles ────────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <div style={{
            marginTop: "3rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid #e3d8ce",
          }}>
            <p style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#a27b5c",
              fontWeight: 700,
              marginBottom: "1.2rem",
              fontFamily: "monospace",
            }}>Further Reading</p>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}>
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1rem 1.1rem",
                    background: "#fffaf4",
                    border: "1px solid #e3d8ce",
                    borderRadius: "10px",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                >
                  {/* Category dot */}
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#fc2779",
                    flexShrink: 0,
                    marginTop: "6px",
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: "0 0 4px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#161412",
                      lineHeight: 1.35,
                    }}>
                      {post.title}
                    </p>
                    <p style={{
                      margin: "0 0 5px",
                      fontSize: "0.78rem",
                      color: "#756b63",
                      lineHeight: 1.5,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}>
                      {post.excerpt}
                    </p>
                    <span style={{
                      fontSize: "0.68rem",
                      color: "#9a8f86",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      {post.category} · {post.readTime}
                    </span>
                  </div>
                  <span style={{
                    fontSize: "1rem",
                    color: "#a27b5c",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

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
