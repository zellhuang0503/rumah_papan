import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;

async function addCors() {
    try {
        const url = `https://${projectId}.api.sanity.io/v1/projects/${projectId}/cors`;
        console.log(`Adding CORS origin for http://localhost:5175 to project ${projectId}...`);

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                origin: 'http://localhost:3334',
                allowCredentials: true
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        console.log('✅ CORS origin added successfully!');
    } catch (err) {
        console.error('❌ Failed to add CORS origin:', err.message);
    }
}

addCors();
