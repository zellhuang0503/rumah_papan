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
    apiVersion: process.env.VITE_SANITY_API_VERSION,
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

async function verifyData() {
    console.log('🔍 Verifying Sanity Data...');
    try {
        const about = await client.fetch(`*[_type == "about"][0]`);
        if (!about) {
            console.log('❌ About document not found!');
            return;
        }

        console.log('✅ About Document Found');
        console.log('Hero Story Image:', about.heroStory?.image ? 'YES' : 'NO');
        console.log('Hero Cards Count:', about.heroCards?.length || 0);
        console.log('Environment Items Count:', about.environment?.length || 0);
        console.log('Products Items Count:', about.products?.length || 0);
        console.log('Rental Highlights Count:', about.rental?.highlights?.length || 0);

        if (about.heroCards) {
            about.heroCards.forEach((c, i) => {
                console.log(`Hero Card ${i} Title:`, c.title);
                console.log(`Hero Card ${i} Path:`, c.path);
                console.log(`Hero Card ${i} Image:`, c.image ? 'YES' : 'NO');
            });
        }

        if (about.environment) {
            about.environment.forEach((e, i) => {
                console.log(`Environment ${i} Image:`, e.image ? 'YES' : 'NO');
            });
        }

    } catch (err) {
        console.error('❌ Error fetching data:', err);
    }
}

verifyData();
