export default function Head() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Mirha & Co.",
    description:
      "Mid-century modern office decor and authentic Bombay Art Deco collectibles.",
    url: "https://mirhaandco.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "India",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
