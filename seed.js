const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Barrier Restoring Cream",
      brand: "Mirha & Co.",
      category: "Moisturizer",
      description: "A rich, ceramide-infused cream that deeply hydrates and repairs a compromised skin barrier.",
      ingredients: ["Ceramides", "Hyaluronic Acid", "Squalane"],
      concerns: ["dry", "redness", "sensitivity"]
    },
    {
      name: "Gentle Oat Cleanser",
      brand: "Mirha & Co.",
      category: "Cleanser",
      description: "A non-stripping daily cleanser that soothes inflammation while removing impurities.",
      ingredients: ["Colloidal Oatmeal", "Glycerin"],
      concerns: ["acne", "sensitivity", "dry"]
    },
    {
      name: "Luminous C Serum",
      brand: "Mirha & Co.",
      category: "Serum",
      description: "15% Vitamin C serum to fade dark spots and boost overall radiance.",
      ingredients: ["Vitamin C", "Ferulic Acid", "Vitamin E"],
      concerns: ["hyperpigmentation", "dullness", "aging"]
    },
    {
      name: "BHA Clarifying Liquid",
      brand: "Mirha & Co.",
      category: "Toner",
      description: "2% Salicylic acid exfoliant to clear pores and prevent breakouts.",
      ingredients: ["Salicylic Acid", "Green Tea Extract"],
      concerns: ["acne", "oiliness", "pores"]
    },
    {
      name: "Peptide Firming Eye Cream",
      brand: "Mirha & Co.",
      category: "Eye Care",
      description: "Targets fine lines and puffiness with a powerful peptide blend.",
      ingredients: ["Peptides", "Caffeine", "Niacinamide"],
      concerns: ["aging", "dark circles"]
    }
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  
  console.log(`Seeded ${products.length} products successfully.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
