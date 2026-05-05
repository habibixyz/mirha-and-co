import { AffiliateCard } from "@/components/AffiliateCard";
import { SeoBlogPost } from "@/components/SeoBlogPost";

export const metadata = {
  title: "Oily Skin Makeup Routine in India: Sweat-Friendly Base | Mirha & Co.",
  description:
    "A simple oily skin makeup routine for Indian humidity: sunscreen, light base, compact powder, eye makeup and touch-up tips.",
};

const sections = [
  {
    title: "Why oily skin makeup separates",
    body: [
      "Makeup on oily skin usually fails for three reasons: too much skincare underneath, a heavy base, or no powder where the face actually gets shiny. Indian humidity makes all three problems show up faster.",
      "The goal is not to make your face completely matte all day. The goal is to keep the base thin, set the oily areas and avoid products that slide around.",
    ],
  },
  {
    title: "The routine order that works better",
    body: [
      "Start with a lightweight sunscreen and let it settle. Then use concealer only where needed: under-eyes, marks and around the mouth if there is uneven tone. Set the T-zone with compact powder.",
      "If you use foundation, use a thin layer. But for daily wear, concealer plus compact often looks fresher than full foundation on oily skin.",
    ],
  },
  {
    title: "Touch-up rule for Indian weather",
    body: [
      "Do not keep layering powder over sweat or oil. Blot first with tissue, then add a small amount of compact. This keeps the base from becoming thick and patchy.",
      "Waterproof mascara or kajal makes sense if your eye makeup smudges easily, but remove it properly at night.",
    ],
  },
];

export default function OilySkinMakeupRoutineGuide() {
  return (
    <SeoBlogPost
      category="Makeup Guide"
      title="Oily Skin Makeup Routine in India: A Sweat-Friendly Base That Lasts"
      description="A clean everyday makeup routine for oily skin, humid weather and shine control without heavy foundation."
      date="April 28, 2026"
      readTime="8 min"
      sections={sections}
    >
      <section className="post-section">
        <h2>Products that fit this routine</h2>
        <p>
          Keep the base thin, matte where needed, and easy to touch up. These
          picks work because they solve specific oily-skin makeup problems.
        </p>

        <AffiliateCard asin="B0B45RB1RV" />
        <AffiliateCard asin="B0046VGJJA" />
        <AffiliateCard asin="B08QSQ8T7B" />
        <AffiliateCard asin="B08H46YXYH" />

        <p>
          For oily skin, the best makeup routine starts before makeup: a sunscreen
          that does not feel greasy makes the whole base easier.
        </p>
      </section>

      <div className="verdict">
        <h2>Mirha verdict</h2>
        <p>
          Oily skin does not need more makeup. It needs thinner layers, better
          setting, and smart touch-ups. Concealer plus compact is often enough for
          daily Indian weather.
        </p>
      </div>
    </SeoBlogPost>
  );
}
