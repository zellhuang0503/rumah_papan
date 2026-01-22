import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const client = createClient({
    projectId: 'vm3p10fe',
    dataset: 'production',
    apiVersion: '2024-03-24',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

if (false) { // Skip env check
    console.error('❌ Error: SANITY_API_WRITE_TOKEN is missing');
    process.exit(1);
}

const aboutData = {
    story: {
        title: "故事誌",
        subtitle: "把新村寫進日常",
        tag: "about\nRUMAH PAPAN",
        path: "/stories"
    },
    cards: [
        {
            title: "環境介紹",
            subtitle: "走一圈，認識班厝的每個角落",
            path: "/about/environment"
        },
        {
            title: "農作產品",
            subtitle: "從種植到桌上的班厝禮物",
            path: "/products"
        },
        {
            title: "場地租借",
            subtitle: "把想做的事，放進班厝這個場景",
            path: "/about/rental"
        }
    ]
};

async function migrateAbout() {
    console.log('🚀 Starting About page migration...');

    try {
        const aboutDoc = await client.fetch(`*[_type == "about"][0]`);

        const doc = {
            _type: 'about',
            title: '關於我們 (About)',
            heroStory: aboutData.story,
            heroCards: aboutData.cards,
        };

        if (aboutDoc) {
            console.log(`📝 Updating existing About document (ID: ${aboutDoc._id})...`);
            await client.patch(aboutDoc._id).set(doc).commit();
            console.log('✅ About document updated!');
        } else {
            console.log(`📝 Creating new About document...`);
            const res = await client.create(doc);
            console.log(`✅ About document created! (ID: ${res._id})`);
        }

    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    }
}

migrateAbout();
