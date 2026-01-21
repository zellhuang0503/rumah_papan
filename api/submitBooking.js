import { createClient } from '@sanity/client';

export default async function handler(request, response) {
    // 1. Handle CORS (Optional but good practice if needed)
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const {
            name, email, phone, nationality,
            checkInDate, checkInTime,
            checkOutDate, checkOutTime,
            roomCount, preferredBedType,
            paymentMethod, remarks
        } = request.body;

        // Basic Validation
        if (!name || !email || !phone || !checkInDate || !checkOutDate) {
            return response.status(400).json({ error: 'Missing required fields' });
        }

        // Initialize Sanity Client with Write Token
        const client = createClient({
            projectId: process.env.VITE_SANITY_PROJECT_ID,
            dataset: process.env.VITE_SANITY_DATASET,
            apiVersion: '2024-03-24',
            token: process.env.SANITY_API_WRITE_TOKEN, // Protected token for writing
            useCdn: false,
        });

        // Create Document
        const doc = {
            _type: 'booking',
            name,
            email,
            phone,
            nationality,
            checkInDate,
            checkInTime,
            checkOutDate,
            checkOutTime,
            roomCount: parseInt(roomCount) || 1,
            preferredBedType,
            paymentMethod,
            remarks,
            status: 'pending',
            submittedAt: new Date().toISOString(),
        };

        const result = await client.create(doc);

        return response.status(200).json({
            message: 'Booking submitted successfully',
            id: result._id
        });

    } catch (error) {
        console.error('Booking submission error:', error);
        return response.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
}
