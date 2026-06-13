const fs = require('fs');
const path = require('path');

// Read high-intent posts file content
const hipPath = path.join(__dirname, '../lib/high-intent-posts.ts');
const hipContent = fs.readFileSync(hipPath, 'utf-8');

// Read products file content
const productsPath = path.join(__dirname, '../lib/products.ts');
const productsContent = fs.readFileSync(productsPath, 'utf-8');

// Simple regex to extract ASINs from high-intent-posts.ts
const asinMatches = hipContent.match(/"[A-Z0-9]{10}"|'[A-Z0-9]{10}'/g) || [];
const customMatches = hipContent.match(/"[A-Z]{3,15}[0-9]*"|'[A-Z]{3,15}[0-9]*'/g) || [];

const referencedAsins = Array.from(new Set([...asinMatches, ...customMatches].map(m => m.replace(/['"]/g, ''))));

console.log(`Found ${referencedAsins.length} unique referenced product IDs in posts.`);

// Check which ones are in products.ts
const missing = [];
referencedAsins.forEach(asin => {
  // Check if productsContent contains this ASIN
  if (!productsContent.includes(asin)) {
    missing.push(asin);
  }
});

if (missing.length > 0) {
  console.log("Missing ASINs in lib/products.ts:");
  console.log(missing);
} else {
  console.log("All referenced product IDs exist in lib/products.ts!");
}
