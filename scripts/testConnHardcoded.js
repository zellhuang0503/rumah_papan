import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'pt01rhvf',
    dataset: 'production',
    apiVersion: '2024-03-24',
    token: 'sk9L1wSmpjEktNvf2B7MafOBt81KSqWrERKsCDLKdxZ9UlLg6YgcIjHfL6t8MCwHK2tYXAhgiQ32RZyBvm652MFOijXDu9GBHlK3yXWYbRvRmPffyyt1CTSvNpfONsVz4ry1kzUnZ0bhVL4UbBioRr5XDzh4UEjWtJ2oMRYN3fjUXzsB247L',
    useCdn: false,
});

async function test() {
    try {
        const result = await client.fetch('count(*[_type == "system.group"])');
        console.log('Fetch with hardcoded token successful! Result:', result);
    } catch (err) {
        console.error('Fetch with hardcoded token failed:', err.message);
    }
}

test();
