const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Read lib/products.ts
  const tsContent = fs.readFileSync(path.join(__dirname, 'lib', 'products.ts'), 'utf8');
  
  // Extract the PRODUCTS array text
  const arrayStart = tsContent.indexOf('export const PRODUCTS = [');
  if (arrayStart === -1) throw new Error('Could not find PRODUCTS array');
  
  // Find where getProductAffiliateUrl starts to locate the boundary of the array
  const arrayEnd = tsContent.indexOf('export function getProductAffiliateUrl');
  if (arrayEnd === -1) throw new Error('Could not find getProductAffiliateUrl boundary');
  
  let arrayText = tsContent.substring(arrayStart, arrayEnd).trim();
  // Strip "export const PRODUCTS = "
  arrayText = arrayText.replace('export const PRODUCTS =', '').trim();
  // Remove trailing semicolon if present
  if (arrayText.endsWith(';')) {
    arrayText = arrayText.slice(0, -1);
  }
  
  // Evaluate the array text to parse it as a Javascript array
  const products = eval(arrayText);
  
  console.log(`Parsed ${products.length} products from lib/products.ts`);
  
  // Upsert all products into the database
  let count = 0;
  for (const p of products) {
    if (!p.asin) {
      console.warn(`Skipping product with missing ASIN: ${p.name || p.id}`);
      continue;
    }
    const skinType = p.specs?.["Skin Type"] || "All Skin Types";
    const keyIngredient = p.specs?.["Key Ingredient"] || p.specs?.["Key Ingredients"] || "";
    
    await prisma.product.upsert({
      where: { asin: p.asin },
      update: {
        name: p.name,
        brand: p.brand,
        price: parseFloat(p.price) || 0,
        discount: p.mrp ? (parseFloat(p.mrp) - parseFloat(p.price)) : null,
        category: p.category,
        ingredients: keyIngredient,
        concerns: p.concerns ? p.concerns.join(', ') : '',
        skinTypes: skinType,
        reviewUrl: p.link || null,
        imageUrl: p.image || null,
        rating: p.rating ? parseFloat(p.rating) : null,
      },
      create: {
        asin: p.asin,
        name: p.name,
        brand: p.brand,
        price: parseFloat(p.price) || 0,
        discount: p.mrp ? (parseFloat(p.mrp) - parseFloat(p.price)) : null,
        category: p.category,
        ingredients: keyIngredient,
        concerns: p.concerns ? p.concerns.join(', ') : '',
        skinTypes: skinType,
        reviewUrl: p.link || null,
        imageUrl: p.image || null,
        rating: p.rating ? parseFloat(p.rating) : null,
      }
    });
    count++;
  }
  
  console.log(`Successfully synced ${count} products to the database.`);

  // Upsert default demo user for instant login
  const bcrypt = require('bcryptjs');
  const demoEmail = 'demo@mirhaandco.com';
  const demoPasswordHash = await bcrypt.hash('password123', 10);

  const demoUser = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {
      name: 'Mirha Demo User',
      passwordHash: demoPasswordHash,
    },
    create: {
      email: demoEmail,
      name: 'Mirha Demo User',
      passwordHash: demoPasswordHash,
    }
  });

  // Ensure demo user has active Pro subscription
  await prisma.subscription.upsert({
    where: { userId: demoUser.id },
    update: {
      tier: 'pro',
      status: 'active'
    },
    create: {
      userId: demoUser.id,
      tier: 'pro',
      status: 'active'
    }
  });

  console.log('Successfully seeded default demo user: demo@mirhaandco.com / password123');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

