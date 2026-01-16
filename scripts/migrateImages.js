import { createClient } from '@sanity/client';
import { mockStories } from '../src/data/mockStories.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
    apiVersion: process.env.VITE_SANITY_API_VERSION,
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

async function migrateImages() {
    console.log('🚀 Starting image migration...');

    for (const story of mockStories) {
        const title = story.title.zh;
        const imageUrl = story.cover_image;

        if (!imageUrl) {
            console.log(`⚠️ No image URL for "${title}", skipping.`);
            continue;
        }

        console.log(`🔍 Processing "${title}"...`);

        try {
            // 1. Find the document ID
            const query = `*[_type == "story" && title == $title][0]._id`;
            const docId = await client.fetch(query, { title });

            if (!docId) {
                console.error(`❌ Document not found for "${title}". Run migrateStories.js first.`);
                continue;
            }

            // 2. Download the image
            console.log(`  ⬇️ Downloading image from ${imageUrl}...`);
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
            const buffer = await response.arrayBuffer();
            const bufferData = Buffer.from(buffer);

            // 3. Upload to Sanity
            console.log(`  ⬆️ Uploading to Sanity Assets...`);
            const asset = await client.assets.upload('image', bufferData, {
                filename: `${title}-cover.jpg`
            });

            // 4. Patch the document
            console.log(`  🔗 Linking asset ${asset._id} to document ${docId}...`);
            await client.patch(docId)
                .set({
                    coverImage: {
                        _type: 'image',
                        asset: {
                            _type: "reference",
                            _ref: asset._id
                        }
                    }
                })
                .commit();

            console.log(`✅ Successfully updated "${title}" with image!`);

        } catch (err) {
            console.error(`❌ Error processing "${title}":`, err.message);
        }
    }

    console.log('🏁 Image migration finished!');
}

migrateImages();
