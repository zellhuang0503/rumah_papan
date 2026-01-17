import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
    projectId: 'vm3p10fe',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN
});

async function uploadMap() {
    try {
        const imagePath = path.join(__dirname, '../src/assets/images/village_full_map_16_9.png');
        console.log(`Reading image from: ${imagePath}`);

        const imageData = readFileSync(imagePath);

        console.log('Uploading image to Sanity...');
        const asset = await client.assets.upload('image', imageData, {
            filename: 'village_full_map_16_9.png'
        });

        console.log(`Image uploaded! Asset ID: ${asset._id}`);

        console.log('Finding village document...');
        const villageDoc = await client.fetch('*[_type == "village"][0]');

        if (!villageDoc) {
            console.error('Village document not found!');
            return;
        }

        console.log(`Updating village document (${villageDoc._id})...`);
        await client
            .patch(villageDoc._id)
            .set({
                'map.mapImage': {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id
                    }
                }
            })
            .commit();

        console.log('✅ Success! Backend map image updated.');
    } catch (error) {
        console.error('❌ Failed to upload/update map image:', error);
    }
}

uploadMap();
