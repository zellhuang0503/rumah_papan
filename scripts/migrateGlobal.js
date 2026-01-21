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

async function migrate() {
    console.log('🚀 Starting Site Settings & Contact migration...');

    try {
        // 1. Site Settings
        const siteDoc = {
            _type: 'siteSettings',
            title_zh: '班厝 Rumah Papan',
            title_en: 'Rumah Papan',
            logo: undefined,
            contactEmail: 'rumahpapanklang@gmail.com',
            phone: '012-345 6789',
            address_zh: '124, Jalan Kemanis, 42000 Pelabuhan Klang, Klang, Malaysia',
            socialLinks: {
                facebook: 'https://www.facebook.com/rumahpapan',
                instagram: 'https://www.instagram.com/rumahpapan',
            }
        };
        await client.createOrReplace({ _id: 'siteSettings', ...siteDoc });
        console.log('✅ Site Settings Migrated');

        // 2. Contact
        const contactDoc = {
            _type: 'contact',
            founderName: '創辦人',
            founderTitle: '館主',
            founderBio: '致力於推廣新村文化與故事...',
            facebookHandle: '班厝 Rumah Papan',
            facebookLink: 'https://www.facebook.com/rumahpapan',
        };
        await client.createOrReplace({ _id: 'contact', ...contactDoc });
        console.log('✅ Contact Migrated');

    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    }
}

migrate();
