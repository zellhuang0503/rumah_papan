import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2024-03-24',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

async function count() {
    console.log('Project ID:', process.env.VITE_SANITY_PROJECT_ID);
    const counts = await client.fetch(`{
        "home": count(*[_type == "home"]),
        "about": count(*[_type == "about"]),
        "village": count(*[_type == "village"]),
        "story": count(*[_type == "story"]),
        "contact": count(*[_type == "contact"]),
        "siteSettings": count(*[_type == "siteSettings"]),
        "announcement": count(*[_type == "announcement"]),
        "images": count(*[_type == "sanity.imageAsset"])
    }`);
    console.log('Document Counts:', JSON.stringify(counts, null, 2));
}

count();
