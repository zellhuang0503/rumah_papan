import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'vm3p10fe',
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-03-24',
    useCdn: false, // Set to false to ensure we get fresh data from Sanity immediately after publishing
});

const builder = imageUrlBuilder(client);

// Defensive wrapper: a single malformed CMS image reference (e.g. an
// incomplete asset _ref like "image-828x384") must never crash the whole
// page. We build the URL lazily and swallow any error, returning '' so the
// <img> simply renders empty instead of throwing during render.
export function urlFor(source: any) {
    return {
        url: (): string => {
            try {
                return builder.image(source).url();
            } catch (error) {
                console.warn('[urlFor] Skipping invalid image reference:', (error as Error)?.message);
                return '';
            }
        },
    };
}
