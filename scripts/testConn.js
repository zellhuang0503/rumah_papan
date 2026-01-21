import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
    apiVersion: '2024-03-24',
    // token: process.env.SANITY_API_WRITE_TOKEN, // Commented out
    useCdn: false,
});

async function test() {
    try {
        const result = await client.fetch('*[_type == "system.project"][0]');
        console.log('Fetch successful without token (using session)!');
    } catch (err) {
        console.error('Fetch failed without token:', err.message);
    }
}

test();
