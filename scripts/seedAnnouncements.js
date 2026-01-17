import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
    apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-03-24',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

const announcements = [
    {
        _type: 'announcement',
        title: "雪州新村節《 新村玩+ 造起來！ 》小花車裝飾比賽",
        date: "2026-01-13",
        category: 'latest',
        link: "https://www.facebook.com/RumahPapanPandamaran/posts/pfbid0259p9v99v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v", // Placeholder FB link
        isNewBadge: true
    },
    {
        _type: 'announcement',
        title: "新村好品開張啦！咦～班厝的木鱉果養生酵素也來駐店了？",
        date: "2026-01-11",
        category: 'latest',
        link: "https://www.facebook.com/RumahPapanPandamaran/posts/pfbid0259p9v99v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v",
        isNewBadge: true
    },
    {
        _type: 'announcement',
        title: "新村 Long Gai 去！帶著紙箱布料一起出門 YouKui 啦！",
        date: "2025-11-21",
        category: 'event',
        link: "https://www.facebook.com/RumahPapanPandamaran/posts/pfbid0259p9v99v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v",
        isNewBadge: false
    },
    {
        _type: 'announcement',
        title: "住進故事裡的新村：2天1夜班厝旅宿體驗",
        date: "2025-11-06",
        category: 'announcement',
        link: "https://www.facebook.com/RumahPapanPandamaran/posts/pfbid0259p9v99v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v",
        isNewBadge: false
    }
];

async function seed() {
    console.log('Starting seed...');
    for (const announcement of announcements) {
        try {
            await client.create(announcement);
            console.log(`Created: ${announcement.title}`);
        } catch (error) {
            console.error(`Failed to create ${announcement.title}:`, error.message);
        }
    }
    console.log('Seed completed.');
}

seed();
