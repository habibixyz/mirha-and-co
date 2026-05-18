const fs = require('fs');
const path = require('path');

// 1. Get ASINs from the new PRODUCTS array in lib/products.ts
const productsContent = fs.readFileSync('lib/products.ts', 'utf8');
const asinRegex = /asin:\s*["']([^"']+)["']/g;
const productsAsins = new Set();
let match;
while ((match = asinRegex.exec(productsContent)) !== null) {
  productsAsins.add(match[1]);
}

console.log(`Found ${productsAsins.size} ASINs in lib/products.ts`);

// 2. Scan app directory for ASINs
function findAsinsInDir(dir, foundAsins = new Map()) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        findAsinsInDir(fullPath, foundAsins);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const docAsinRegex = /asin=["']([^"']+)["']/g;
      let m;
      while ((m = docAsinRegex.exec(content)) !== null) {
        const asin = m[1];
        if (!foundAsins.has(asin)) {
          foundAsins.set(asin, []);
        }
        foundAsins.get(asin).push(fullPath);
      }
    }
  }
  return foundAsins;
}

const appAsins = findAsinsInDir('app');
console.log(`Found ${appAsins.size} unique ASINs in app/ directory`);

const missingAsins = [];
for (const [asin, files] of appAsins.entries()) {
  if (!productsAsins.has(asin)) {
    missingAsins.push({ asin, files: [...new Set(files)] });
  }
}

if (missingAsins.length > 0) {
  console.log('\nMissing ASINs in lib/products.ts that are used in app/:');
  missingAsins.forEach(item => {
    console.log(`${item.asin} used in: ${item.files.join(', ')}`);
  });
} else {
  console.log('\nAll ASINs used in app/ are present in lib/products.ts');
}
