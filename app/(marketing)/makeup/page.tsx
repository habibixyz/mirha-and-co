import { Metadata } from "next";
import Link from "next/link";
import MakeupLabClient from "@/components/MakeupLabClient";
import { 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  Sparkles as _NoSparkles, 
  CheckCircle2, 
  ArrowRight, 
  Droplets, 
  Palette, 
  Camera, 
  Layers 
} from "lucide-react";

export const metadata: Metadata = {
  title: "All-in-One Makeup Lab: Expiry Checker, AI Look Rater & Shade Matcher | Mirha & Co.",
  description:
    "Free all-in-one beauty tools: check cosmetic batch codes & expiry dates across 70+ brands, audit your makeup look with on-device AI vision, and get 3-step daily routines matched to your skin tone.",
  keywords: [
    "cosmetic batch code checker",
    "check makeup expiration date online free",
    "makeup batch code decoder",
    "ai makeup look rater",
    "am i looking good makeup test",
    "foundation shade finder across brands",
    "everyday makeup routine steps",
    "period after opening pao calculator",
    "mac cosmetics batch code",
    "maybelline manufacturing date check",
    "cerave batch code check",
    "dior batch code check",
    "k-beauty expiration date check",
    "clean girl makeup routine steps",
    "seasonal color analysis warm neutral cool undertone"
  ],
  alternates: {
    canonical: "https://www.mirhaandco.com/makeup",
  },
  openGraph: {
    title: "All-in-One Makeup Lab: Expiry Checker, AI Look Rater & Routine Guide | Mirha & Co.",
    description:
      "Free all-in-one beauty lab: check factory batch codes for 70+ brands, audit your makeup look with private on-device AI vision, and get custom 3-step morning routines.",
    url: "https://www.mirhaandco.com/makeup",
    siteName: "Mirha & Co.",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.mirhaandco.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "All-in-One Makeup Lab - Mirha & Co.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All-in-One Makeup Lab: Expiry Checker, AI Look Rater & Routine Guide | Mirha & Co.",
    description:
      "Free all-in-one beauty lab: check factory batch codes for 70+ brands, audit your makeup look with private on-device AI vision, and get custom 3-step morning routines.",
    site: "@mirhaandco",
    creator: "@mirhaandco",
    images: ["https://www.mirhaandco.com/opengraph-image.png"],
  },
};

export default function MakeupPage() {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.mirhaandco.com/makeup#app",
        name: "Mirha & Co. All-in-One Makeup Lab",
        url: "https://www.mirhaandco.com/makeup",
        applicationCategory: "LifestyleApplication, UtilityApplication",
        operatingSystem: "All (Web, iOS, Android, macOS, Windows)",
        description:
          "An interactive beauty platform featuring a 70+ brand cosmetic batch code expiry decoder, privacy-first on-device AI makeup look auditor, personalized 3-step daily routine generator, and seasonal color harmony shade matcher.",
        browserRequirements: "Requires modern web browser with HTML5 Canvas support.",
        featureList: [
          "Factory batch code expiration date decoder for 70+ luxury, drugstore, K-Beauty, and Indian brands",
          "Private on-device Computer Vision makeup harmony and foundation blending auditor",
          "Customized 3-step daily routine generator based on skin depth and undertone",
          "Seasonal color harmony matrix with lip and blush benchmarks"
        ],
        publisher: {
          "@type": "Organization",
          name: "Mirha & Co.",
          url: "https://www.mirhaandco.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.mirhaandco.com/logo.png"
          }
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.mirhaandco.com/makeup#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.mirhaandco.com"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "All-in-One Makeup Lab",
            item: "https://www.mirhaandco.com/makeup"
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://www.mirhaandco.com/makeup#howto",
        name: "How to Check Cosmetic Expiry Date Using a Batch Code",
        description: "Step-by-step instructions on finding and decoding the factory batch code stamped on cosmetic bottles, jars, and tube crimps.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Locate the Stamped Batch Code",
            text: "Examine the bottom of your bottle, jar, or the crimped seal of your tube for a 3-to-6 character alphanumeric code (e.g. A34, 28X301, 4B01). Do not use the retail barcode."
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Select Your Cosmetic Brand",
            text: "Choose or search for your brand in the Mirha & Co. Expiry Checker (supporting 70+ luxury, drugstore, K-Beauty, and Indian brands)."
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Instant Algorithmic Decoding",
            text: "Enter the stamped code to instantly calculate the exact manufacturing date, unopened shelf life expiration date, and remaining safe months."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.mirhaandco.com/makeup#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I find the batch code on my cosmetic or skincare product?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The batch code is stamped, embossed, or dot-matrix printed directly onto the container during factory production. It is typically found on the bottom of bottles or jars, pressed into the top crimped edge of tubes, or printed near the barcode. Unlike barcodes (which only identify the general product SKU), batch codes are typically 3 to 6 alphanumeric characters (such as A34, 28X301, or 4B01) that identify the exact day and factory run."
            }
          },
          {
            "@type": "Question",
            name: "How long does makeup last before it expires?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unopened cosmetics stored in a cool, dry environment usually have an unsealed shelf life of 24 to 36 months. Once opened, look for the Period After Opening (PAO) jar symbol. As a general rule: mascaras and liquid eyeliners last 3 to 6 months; liquid foundations and concealers last 12 months; cream blushes and lip oils last 12 to 18 months; powder eyeshadows and blushes last 24 months; and traditional lipsticks last 24 to 36 months."
            }
          },
          {
            "@type": "Question",
            name: "What does the Period After Opening (PAO) open jar symbol mean?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The PAO symbol is an icon of an open cosmetic jar with a number followed by the letter 'M' (e.g., 6M, 12M, 24M). This indicates the number of months the formulation remains safe, hygienic, and active after the protective safety seal has been broken."
            }
          },
          {
            "@type": "Question",
            name: "Does the AI Makeup Look Auditor upload my photo to external servers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The Mirha & Co. AI Makeup Auditor operates 100% locally on your device via client-side HTML5 Canvas computer vision. Your photo is never sent to external servers, cloud databases, or third-party AI APIs, guaranteeing complete personal privacy."
            }
          },
          {
            "@type": "Question",
            name: "What is the correct everyday makeup application order for zero pilling?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To prevent pilling and rolling: 1) Allow sunscreen to set for 2 full minutes before makeup. 2) Spot conceal only inner eye corners and red spots rather than painting thick foundation across the entire face. 3) Dab cream blush high along the cheekbones. 4) Lightly dust translucent powder only on the nose wings, leaving cheeks radiant. 5) Finish with brushed brows and a hydrating lip tint."
            }
          },
          {
            "@type": "Question",
            name: "How do I determine whether my skin undertone is Warm, Neutral, or Cool?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Examine the veins on the inside of your wrist in natural daylight. If your veins look greenish and gold jewelry flatters you best, you have a Warm (Golden) undertone. If your veins look blue or purplish and silver jewelry brightens your skin, you have a Cool (Rosy) undertone. If your veins are blue-green and both gold and silver look harmonious, you have a Neutral (Balanced) undertone."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      
      {/* Interactive App & Client Lab */}
      <MakeupLabClient />

      {/* ================================================================= */}
      {/* SERVER-SIDE RENDERED (SSR) EDITORIAL SEO & EDUCATIONAL FOOTPRINT  */}
      {/* ================================================================= */}
      <section 
        aria-label="Cosmetic Shelf Life & Makeup Science Guide"
        className="border-t border-black/10 bg-[#f7f5f2] px-4 py-16 text-neutral-900 transition-colors sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#141312] dark:text-[#f7f5f2]"
      >
        <div className="mx-auto max-w-5xl space-y-12 lg:max-w-6xl">
          
          {/* Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#fc2779] dark:border-white/10 dark:bg-neutral-900">
              <ShieldCheck className="h-3.5 w-3.5" /> Clinical Beauty Knowledgebase
            </span>
            <h2 className="mt-3 font-serif text-2xl font-normal text-neutral-950 sm:text-3xl lg:text-4xl dark:text-white">
              The Definitive Cosmetic Shelf Life &amp; Batch Code Guide
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
              Everything you need to know about factory lot codes, Period After Opening (PAO) safety, and how to preserve barrier health against oxidized formulas.
            </p>
          </div>

          {/* Section 1: PAO Reference Table */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-xs sm:p-8 dark:border-white/10 dark:bg-neutral-900 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fc2779]">
              <Clock className="h-4 w-4" /> Period After Opening (PAO) Quick Reference
            </div>
            <h3 className="font-serif text-xl font-normal text-neutral-950 dark:text-white sm:text-2xl">
              When should you actually discard opened cosmetics?
            </h3>
            <p className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
              Even if a batch code indicates an unsealed factory shelf life of 36 months, the internal countdown begins the moment the protective seal is broken and oxygen, humidity, and fingertip microbes enter the container.
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full min-w-[500px] text-left text-xs">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 text-neutral-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-bold">Product Category</th>
                    <th className="pb-3 font-bold">Standard PAO</th>
                    <th className="pb-3 font-bold">Degradation Warning Signs</th>
                    <th className="pb-3 font-bold">Barrier Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 text-neutral-700 dark:text-neutral-300">
                  <tr>
                    <td className="py-3 font-semibold text-neutral-900 dark:text-white">Mascara &amp; Liquid Liners</td>
                    <td className="py-3 font-mono font-bold text-[#fc2779]">3 – 6 Months</td>
                    <td className="py-3">Dry clumps, alcohol or gasoline odor</td>
                    <td className="py-3 text-rose-600 dark:text-rose-400">High (Corneal infection risk)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-neutral-900 dark:text-white">Liquid Foundation &amp; Concealer</td>
                    <td className="py-3 font-mono font-bold text-[#fc2779]">12 Months</td>
                    <td className="py-3">Water-oil separation, sour smell, darker color</td>
                    <td className="py-3 text-amber-600 dark:text-amber-400">Moderate (Acne flare-ups)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-neutral-900 dark:text-white">Cream Blush &amp; Lip Oils</td>
                    <td className="py-3 font-mono font-bold text-[#fc2779]">12 – 18 Months</td>
                    <td className="py-3">Sticky gummy texture, rancid oil odor</td>
                    <td className="py-3 text-amber-600 dark:text-amber-400">Moderate (Perioral dermatitis)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-neutral-900 dark:text-white">Powder Shadows &amp; Blushes</td>
                    <td className="py-3 font-mono font-bold text-[#fc2779]">24 Months</td>
                    <td className="py-3">Hard film on surface, loss of color payoff</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">Low (Preserves well if kept dry)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-neutral-900 dark:text-white">Lipsticks &amp; Wooden Lip Liners</td>
                    <td className="py-3 font-mono font-bold text-[#fc2779]">24 – 36 Months</td>
                    <td className="py-3">Wax sweating (beads on bullet), crayon odor</td>
                    <td className="py-3 text-neutral-500">Low (Sharpening refreshes wood)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Conglomerate Batch Coding Systems */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-neutral-900 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#fc2779]">Estée Lauder Group</span>
              <h4 className="font-serif text-lg font-normal text-neutral-950 dark:text-white">
                M·A·C, Clinique, Tom Ford, Bobbi Brown
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Uses the industry-standard 3-character alphanumeric format. The first character represents the factory batch lot, the second is the month (1–9 for Jan–Sep, A–C for Oct–Dec), and the third digit is the year of production (e.g., A34 = March 2024).
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-neutral-900 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#fc2779]">L&apos;Oréal Group</span>
              <h4 className="font-serif text-lg font-normal text-neutral-950 dark:text-white">
                Maybelline, CeraVe, Kiehl&apos;s, YSL, Lancôme
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Uses a 6-character factory code. The 3rd character represents the year of manufacture using sequential alphabet keys (T=2020, U=2021, V=2022, W=2023, X=2024, Y=2025), and the 4th character encodes the production month.
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-neutral-900 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#fc2779]">LVMH &amp; Dior Group</span>
              <h4 className="font-serif text-lg font-normal text-neutral-950 dark:text-white">
                Dior, Guerlain, Givenchy, Fenty Beauty
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Uses a 4-character format. The first digit represents the year (e.g., 4 = 2024), and the second letter represents the month based on Dior&apos;s 12-letter cycle (A through M, omitting the letter I to avoid confusion with the number 1).
              </p>
            </div>

          </div>

          {/* Section 3: Semantic FAQ Accordion Grid */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-xs sm:p-8 dark:border-white/10 dark:bg-neutral-900 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fc2779]">
              <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
            </div>
            <h3 className="font-serif text-2xl font-normal text-neutral-950 dark:text-white">
              Cosmetic Freshness, AI Look Audits &amp; Everyday Routines
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-xs leading-relaxed">
              
              <div className="space-y-1.5 rounded-2xl bg-[#faf8f5] p-4 dark:bg-neutral-800/40">
                <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
                  How do I find the batch code on my cosmetic bottle?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Look on the base of the bottle, jar, or the crimped seal of the tube. Unlike long 12-digit barcodes, batch codes are short (3 to 6 characters), often stamped in dot-matrix ink or debossed directly into the plastic or glass.
                </p>
              </div>

              <div className="space-y-1.5 rounded-2xl bg-[#faf8f5] p-4 dark:bg-neutral-800/40">
                <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
                  Does the AI Look Auditor store or upload my face?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400">
                  No. Analysis runs completely on your local device CPU/GPU via HTML5 2D Canvas colorimetry. No images, selfies, or facial data ever touch external servers or cloud AI providers.
                </p>
              </div>

              <div className="space-y-1.5 rounded-2xl bg-[#faf8f5] p-4 dark:bg-neutral-800/40">
                <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
                  What makes everyday makeup pill or roll off?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Pilling happens when silicone-based products are layered over water-based products without allowing proper drying time. Always wait 2 full minutes after applying sunscreen before tapping on concealer or blush.
                </p>
              </div>

              <div className="space-y-1.5 rounded-2xl bg-[#faf8f5] p-4 dark:bg-neutral-800/40">
                <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
                  How do I prevent my foundation from looking ashy or grey?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Ashiness occurs when cool-toned (pink) foundations are applied to warm golden or olive undertones. Use our Seasonal Color Harmonizer to check your neck undertone match before purchasing.
                </p>
              </div>

            </div>
          </div>

          {/* Section 4: Internal Links to Diagnostic Beauty Ecosystem */}
          <div className="rounded-3xl border border-black/5 bg-neutral-900 p-6 text-white sm:p-8 dark:border-white/10 dark:bg-neutral-950">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#fc2779]">
                  Mirha &amp; Co. Clinical Tools Ecosystem
                </span>
                <h3 className="font-serif text-xl font-normal text-white sm:text-2xl">
                  Explore our other diagnostic beauty intelligence
                </h3>
                <p className="mt-1 text-xs text-neutral-400 max-w-xl">
                  Evidence-based, zero-fluff tools designed to protect your skin barrier and eliminate guesswork.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs font-semibold">
              <Link 
                href="/tools/analysis" 
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-[#fc2779] hover:bg-white/10"
              >
                <span>Free Skin Scanner</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#fc2779]" />
              </Link>
              <Link 
                href="/water-quality" 
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-[#fc2779] hover:bg-white/10"
              >
                <span>City Water TDS Test</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#fc2779]" />
              </Link>
              <Link 
                href="/tools/ingredients" 
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-[#fc2779] hover:bg-white/10"
              >
                <span>Ingredient Checker</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#fc2779]" />
              </Link>
              <Link 
                href="/tools/routine" 
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-[#fc2779] hover:bg-white/10"
              >
                <span>Smart Routine Builder</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#fc2779]" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
