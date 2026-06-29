const fs = require('fs');

const content = fs.readFileSync('./lib/products.ts', 'utf8');

const asinsToCheck = [
  'B09JBJDFHH',
  'B0CHVHGTDJ',
  'B09GP7K353',
  'B06Y15D1LH',
  'B0B3G73VF5',
  'B09GXFVMCM',
  'B00PBX3L7K',
  'B0D1FNB4C2',
  'B08ZXVVY8M'
];

console.log("Checking ASINs in products.ts:");
asinsToCheck.forEach(asin => {
  const hasAsin = content.includes(asin);
  console.log(`- ASIN ${asin}: ${hasAsin ? "FOUND" : "MISSING"}`);
  if (hasAsin) {
    // extract line containing it
    const lines = content.split('\n');
    const lineIdx = lines.findIndex(l => l.includes(asin));
    // print surrounding lines
    console.log("  Line:", lines[lineIdx].trim());
  }
});
