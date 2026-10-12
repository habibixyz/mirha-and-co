import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const filePath = process.argv[2];
const bucketName = process.argv[3] || 'blog-images';
const customDestinationName = process.argv[4];

if (!filePath) {
  console.error('Usage: node --env-file=.env scripts/upload-to-supabase.mjs <file-path> [bucket] [destination-name]');
  process.exit(1);
}

const resolvedPath = path.resolve(filePath);
if (!fs.existsSync(resolvedPath)) {
  console.error(`File not found: ${resolvedPath}`);
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY in environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function upload() {
  const fileName = customDestinationName || path.basename(resolvedPath);
  const fileBuffer = fs.readFileSync(resolvedPath);
  const ext = path.extname(resolvedPath).toLowerCase();

  const mimeMap = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
    '.avif': 'image/avif',
  };

  const contentType = mimeMap[ext] || 'application/octet-stream';

  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, fileBuffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    console.error('Upload failed:', error.message);
    process.exit(1);
  }

  const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
  console.log('✅ Uploaded successfully!');
  console.log(`Bucket: ${bucketName}`);
  console.log(`Path: ${fileName}`);
  console.log(`Public URL: ${publicData.publicUrl}`);
}

upload().catch((err) => {
  console.error('Error during upload:', err);
  process.exit(1);
});
