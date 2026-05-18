import fs from 'fs';
import path from 'path';

// This is a rough simulation since I can't easily import TS files into a JS script without setup
// I will read the file as text and extract image paths

const productsFile = 'c:/MirhaProjects/mirha-and-co/lib/products.ts';
const productsContent = fs.readFileSync(productsFile, 'utf8');

const imageRegex = /image:\s*["']([^"']+)["']/g;
let match;
const missingImages = [];

while ((match = imageRegex.exec(productsContent)) !== null) {
    const imgPath = match[1];
    const fullPath = path.join('c:/MirhaProjects/mirha-and-co/public', imgPath);
    if (!fs.existsSync(fullPath)) {
        missingImages.push(imgPath);
    }
}

console.log('Missing Images:', missingImages);
