import { AffiliateCard } from "@/components/AffiliateCard";
import { SeoBlogPost } from "@/components/SeoBlogPost";

export const metadata = {
  title: "Beginner Makeup Kit in India Under Rs 2000 | Mirha & Co.",
  description:
    "A simple beginner makeup kit for India under Rs 2000: concealer, compact, kajal, mascara and lipstick without overbuying.",
};

const sections = [
  {
    title: "You do not need ten products to start",
    body: [
      "A beginner makeup kit should solve daily use first: even out small marks, control shine, define the eyes and add colour to the face. Most people do not need primer, contour, highlighter, full-coverage foundation and five brushes on day one.",
      "For Indian weather, the kit should also be easy to touch up. Heat and humidity punish heavy base makeup, so a lighter routine is usually more wearable.",
    ],
  },
  {
    title: "The five-product beginner kit",
    body: [
      "Start with concealer, compact powder, kajal or mascara, one everyday lipstick and a simple remover. This covers office, college, errands and low-effort occasions without making the face look overdone.",
      "If your skin is very oily, compact powder becomes more important. If you have pigmentation or acne marks, concealer becomes more important. Build around your face, not someone else's routine.",
    ],
  },
  {
    title: "Where to spend and where to save",
    body: [
      "Spend more carefully on base products because shade and texture matter. Save on lipstick and kajal if you are still learning what colours suit you.",
      "Do not buy a foundation just because it is popular. If your skin is mostly even, a concealer plus compact can look cleaner and more natural.",
    ],
  },
];

export default function BeginnerMakeupKitGuide() {
  return (
    <SeoBlogPost
      category="Makeup Guide"
      title="Beginner Makeup Kit in India Under Rs 2000: What to Buy First"
      description="A practical starter kit for regular users who want clean, everyday makeup without wasting money."
      date="April 28, 2026"
      readTime="7 min"
      sections={sections}
    >
      <section className="post-section">
        <h2>The starter picks</h2>
        <p>
          This is a simple kit, not a full vanity. Pick shades carefully and keep
          your first routine easy enough to repeat.
        </p>

        <AffiliateCard asin="B07WTNH18L" />
        <AffiliateCard asin="B08QSQ8T7B" />
        <AffiliateCard asin="B01BY5KDEC" />
        <AffiliateCard asin="B076PV1SQM" />

        <p>
          If you prefer mascara over kajal, swap the kajal step for mascara. The
          best beginner kit is the one you will actually use three or four times a
          week.
        </p>
      </section>

      <div className="verdict">
        <h2>Mirha verdict</h2>
        <p>
          Under Rs 2000, the smartest beginner makeup kit is base-light, eye-focused
          and easy to remove. Buy fewer products, but make sure the base shade is
          right.
        </p>
      </div>
    </SeoBlogPost>
  );
}
