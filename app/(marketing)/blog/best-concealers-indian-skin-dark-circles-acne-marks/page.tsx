import { AffiliateCard } from "@/components/AffiliateCard";
import { SeoBlogPost } from "@/components/SeoBlogPost";

export const metadata = {
  title: "Best Concealers for Indian Skin: Dark Circles & Acne Marks | Mirha & Co.",
  description:
    "A practical guide to choosing concealer for Indian skin, dark circles, pigmentation and acne marks, with budget picks and shade-match advice.",
};

const sections = [
  {
    title: "What Indian skin usually needs from concealer",
    body: [
      "Most concealer advice online assumes one problem: make the under-eye area lighter. For Indian skin, that is not enough. Dark circles, pigmentation, acne marks and uneven tone usually need a better undertone match, not simply a lighter shade.",
      "If the concealer is too pale, the face can look grey. If it is too orange, it can sit separately from the rest of the base. The best concealer is the one that disappears into your skin after blending.",
    ],
  },
  {
    title: "How to choose your shade",
    body: [
      "For acne marks and pigmentation, choose a shade close to your skin tone. For under-eyes, go half a shade brighter only if your under-eye area is not very deep or grey.",
      "If your dark circles are blue, purple or brown, a corrector may be needed before concealer. A concealer alone can help mild darkness, but strong pigmentation often needs colour correction first.",
    ],
  },
  {
    title: "What texture works best in Indian weather",
    body: [
      "A lightweight matte or natural-matte concealer usually works better in humidity because it sets faster and moves less. Very creamy formulas can look beautiful indoors but crease quickly if you sweat.",
      "Dry under-eyes still need prep. Use a light moisturiser first, wait a minute, then use less concealer than you think you need.",
    ],
  },
];

export default function ConcealerGuide() {
  return (
    <SeoBlogPost
      category="Makeup Guide"
      title="Best Concealers for Indian Skin: Dark Circles, Acne Marks and Pigmentation"
      description="The no-confusion guide to choosing concealer for Indian skin tones, humid weather and real-life concerns."
      date="April 28, 2026"
      readTime="8 min"
      sections={sections}
    >
      <section className="post-section">
        <h2>Mirha picks to start with</h2>
        <p>
          These are not the only good concealers, but they are useful starting
          points because they are accessible, reviewed widely and work for common
          everyday makeup needs.
        </p>

        <AffiliateCard asin="B0046VGJJA" />

        <p>
          Maybelline Fit Me is the safer everyday pick if you want a more classic
          base product. It works best when you already know your shade family and
          want something that blends without looking heavy.
        </p>

        <AffiliateCard asin="B07WTNH18L" />

        <p>
          Swiss Beauty makes sense for budget users and beginners who want more
          coverage without spending too much. The main caution is shade matching:
          check swatches before buying because affordable base products can look
          ashy if the undertone is wrong.
        </p>
      </section>

      <div className="verdict">
        <h2>Mirha verdict</h2>
        <p>
          For Indian skin, the best concealer is not the brightest one. It is the
          one that matches your undertone, sits thinly, and does not turn grey on
          acne marks or dark circles.
        </p>
      </div>
    </SeoBlogPost>
  );
}
