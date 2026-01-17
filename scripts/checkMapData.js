import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
    projectId: 'vm3p10fe',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN
});

async function checkData() {
    const data = await client.fetch(`*[_type == "village"][0]{map}`);
    console.log(JSON.stringify(data, null, 2));
}

checkData();
