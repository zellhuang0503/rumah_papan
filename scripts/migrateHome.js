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

// Mapping from HeroSection.tsx
const heroContent = [
    {
        key: 'about',
        title: "一間為新村存放記憶的厝",
        body: "班厝是一間收集故事的厝，牆上是老照片，桌上是新朋友，讓一條班達馬蘭新村的記憶持續被看見。",
        bubbleText: "關於班厝",
        isLarge: false
    },
    {
        key: 'bkt',
        title: "來碗班達馬蘭肉骨茶",
        body: "在班達馬蘭新村，清晨不是咖啡香，而是一鍋熱騰騰的肉骨茶，陪你慢慢開始一天的新村步調。",
        bubbleText: "來碗班達馬蘭肉骨茶",
        isLarge: false
    },
    {
        key: 'walk',
        title: "用腳一步一步讀完班達馬蘭",
        body: "跟著導覽在巷口轉彎，廟前停下，聽人把班達馬蘭的過去現在，慢慢說成你聽得懂的故事。",
        bubbleText: "想不想用走的認識新村？",
        isLarge: true
    },
    {
        key: 'sustainability',
        title: "把永續活在每天的小事裡",
        body: "班厝，永續不是口號，而是一起把廚餘變養分、果皮變酵素、菜園當作共同的責任。",
        bubbleText: "永續生活",
        isLarge: false
    },
    {
        key: 'exchange',
        title: "來班厝，換一個故事回去",
        body: "有人帶著旅程來，有人帶著生活來，在班厝，每次聊天都多一個人，記得這條班達馬蘭新村。",
        bubbleText: "下個來交換故事的人會是你嗎？",
        isLarge: true
    },
    {
        key: 'festivals',
        title: "一起過節好嗎？",
        body: "設香案、掛燈籠、桌椅排滿街；在班達馬蘭新村，過節就是整條街一起動起來，你來就多一副筷子。",
        bubbleText: "一起過節好嗎？",
        isLarge: true
    },
    {
        key: 'stay',
        title: "技能換宿",
        body: "有人幫忙除草澆花，有人拿相機記錄；你把時間和專長留在這裡，新村就慢慢把你當自己人。",
        bubbleText: "技能換宿",
        isLarge: false
    }
];

async function migrateHome() {
    console.log('🚀 Starting Home page migration...');

    try {
        // Check if home document exists
        const homeDoc = await client.fetch(`*[_type == "home"][0]`);

        const doc = {
            _type: 'home',
            title: 'Rumah Papan Home',
            heroBubbles: heroContent,
            content: [], // can be filled later
        };

        if (homeDoc) {
            console.log(`📝 Updating existing Home document (ID: ${homeDoc._id})...`);
            await client.patch(homeDoc._id).set(doc).commit();
            console.log('✅ Home document updated!');
        } else {
            console.log(`📝 Creating new Home document...`);
            const res = await client.create(doc);
            console.log(`✅ Home document created! (ID: ${res._id})`);
        }

    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    }
}

migrateHome();
