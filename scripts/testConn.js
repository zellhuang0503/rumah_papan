
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const projectId = 'vm3p10fe';
const token = process.env.SANITY_API_WRITE_TOKEN;

console.log('--- Sanity Connection Test ---');
console.log(`Project ID: ${projectId}`);
console.log(`Token Length: ${token ? token.length : 'MISSING'}`);
console.log(`Token Preview: ${token ? token.substring(0, 5) + '...' : 'N/A'}`);

if (!token) {
    console.error('❌ Error: No token found in environment.');
    process.exit(1);
}

const client = createClient({
    projectId: projectId,
    dataset: 'production',
    apiVersion: '2024-03-24',
    token: token,
    useCdn: false,
});

async function testConnection() {
    try {
        console.log('Attempting to fetch user info...');
        const user = await client.users.getCurrent();
        console.log('✅ Connection Successful!');
        console.log('User:', user);

        console.log('Attempting to write a test document...');
        const doc = { _type: 'test_connection', name: 'Connectivity Check', time: new Date().toISOString() };
        const res = await client.create(doc);
        console.log('✅ Write Successful! Doc ID:', res._id);

        // Cleanup
        await client.delete(res._id);
        console.log('✅ Cleanup Successful!');

    } catch (err) {
        console.error('❌ Connection Failed:', err);
        if (err.statusCode === 401) {
            console.error('👉 Suggestion: The token might be invalid, expired, or belongs to a different project.');
        }
    }
}

testConnection();
