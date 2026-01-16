
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root
dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("❌ Error: SANITY_API_WRITE_TOKEN is missing in .env file.");
    process.exit(1);
}

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
    apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-03-24',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

const IMAGES_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');

// Supported extensions
const VALID_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

async function uploadAssets() {
    console.log(`🚀 Starting asset upload from: ${IMAGES_DIR}`);

    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`❌ Directory not found: ${IMAGES_DIR}`);
        return;
    }

    const files = fs.readdirSync(IMAGES_DIR);
    const validFiles = files.filter(file => VALID_EXTS.includes(path.extname(file).toLowerCase()));

    console.log(`📸 Found ${validFiles.length} images to upload.`);

    for (const file of validFiles) {
        const filePath = path.join(IMAGES_DIR, file);
        try {
            console.log(`Uploading ${file}...`);
            const buffer = fs.createReadStream(filePath);

            const asset = await client.assets.upload('image', buffer, {
                filename: file
            });

            console.log(`✅ Uploaded: ${file} -> ${asset._id}`);
        } catch (error) {
            console.error(`❌ Failed to upload ${file}:`, error.message);
        }
    }

    console.log('🏁 Asset upload complete!');
}

uploadAssets();
