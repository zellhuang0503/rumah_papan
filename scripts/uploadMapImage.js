
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚠️ Using Hardcoded Token due to env issues verified earlier
const client = createClient({
    projectId: 'vm3p10fe',
    dataset: 'production',
    apiVersion: '2024-03-24',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

async function uploadMap() {
    console.log('🚀 Starting Map Image Upload...');

    // Path to the image found in assets
    const imagePath = path.join(__dirname, '../src/assets/images/traffic_journey_map.png');

    if (!fs.existsSync(imagePath)) {
        console.error('❌ Image file not found at:', imagePath);
        return;
    }

    try {
        console.log('⬆️ Uploading image asset...');
        const imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
            filename: 'traffic_journey_map.png'
        });
        console.log('✅ Image uploaded! Asset ID:', imageAsset._id);

        console.log('📝 Patching Village document...');
        const villageDoc = await client.fetch(`*[_type == "village"][0]`);

        if (villageDoc) {
            await client.patch(villageDoc._id)
                .set({
                    'traffic.map.image': {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: imageAsset._id
                        }
                    }
                })
                .commit();
            console.log('✅ Village document updated with map image!');
        } else {
            console.error('❌ Village document not found!');
        }

    } catch (err) {
        console.error('❌ Upload failed:', err);
    }
}

uploadMap();
