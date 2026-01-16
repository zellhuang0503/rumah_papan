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

async function migrate() {
    console.log('🚀 Starting migration of mock stories to Sanity...');

    for (const story of mockStories) {
        try {
            const doc = {
                _type: 'story',
                title: story.title.zh,
                slug: {
                    _type: 'slug',
                    current: story.title.en.toLowerCase().replace(/\s+/g, '-'),
                },
                excerpt: story.body_text.zh.substring(0, 100) + '...',
                publishedAt: new Date().toISOString(),
                // Note: Image migration requires downloading and uploading to Sanity assets.
                // For now, we omit the image or it can be manually uploaded.
            };

            const result = await client.create(doc);
            console.log(`✅ Migrated: ${story.title.zh} (ID: ${result._id})`);
        } catch (err) {
            console.error(`❌ Failed to migrate ${story.title.zh}:`, err.message);
        }
    }

    console.log('🏁 Migration finished!');
}

migrate();
