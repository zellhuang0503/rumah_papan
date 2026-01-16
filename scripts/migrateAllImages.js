import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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

const IMAGES_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');

// Helper to upload image
async function uploadImage(filename) {
    const filePath = path.join(IMAGES_DIR, filename);
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Image not found: ${filename}`);
        return null;
    }
    try {
        const stream = fs.createReadStream(filePath);
        const asset = await client.assets.upload('image', stream, {
            filename: filename
        });
        console.log(`✅ Uploaded ${filename} -> ${asset._id}`);
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id
            }
        };
    } catch (err) {
        console.error(`❌ Failed to upload ${filename}:`, err.message);
        return null;
    }
}

// Data Definitions
const ABOUT_DATA_MAP = {
    heroStory: { image: 'Image_house_story_gallery.jpg' },
    heroCards: [
        { title: '環境介紹', image: 'Image_garden.jpeg' },
        { title: '好物介紹', image: 'Image_mulberry_tea.jpeg' },
        { title: '場地租借', image: 'Image_living_room_rental.jpg' }
    ],
    environment: [
        { title: '彩虹小徑', image: 'Image_rainbow_path.jpeg' },
        { title: '客廳／交誼廳', image: 'Image_living_room.jpg' },
        { title: '住宿房間', image: 'Image_room.jpg' },
        { title: '菜園', image: 'Image_garden.jpeg' },
        { title: '前院涼亭', image: 'Image_pavilion.jpeg' },
        { title: '彩繪輪胎', image: 'Image_tires.jpeg' }
    ],
    products: [
        { title: '桑葉茶包系列', image: 'Image_mulberry_tea.jpeg' },
        { title: '班厝肉骨茶包', image: 'Image_bak_kut_teh.jpeg' },
        { title: '咖啡豆五粒子', image: 'Image_five_stones.png' },
        { title: '艾草香包', image: 'Image_mugwort_sachet.png' },
        { title: '九層塔青醬', image: 'Image_basil_pesto.jpeg' },
        { title: '木鱉果香皂', image: 'Image_gac_soap.jpeg' }
    ],
    rentalHighlights: [
        { title: '場地與設備', image: 'Image_whole_venue.jpg' },
        { title: '餐飲服務', image: 'Image_bkt_table.jpg' },
        { title: '活動支援', image: 'Image_rental_support.jpg' }
    ]
};

const VILLAGE_DATA_MAP = {
    activities: [
        { title: '走村導覽', image: 'Image_village_tour.jpg' },
        { title: '拜天公', image: 'Image_pray_heaven.jpg' },
        { title: '中秋賞月', image: 'Image_mid_autumn.jpg' },
        { title: '新村節市集', image: 'Image_village_market.jpg' },
        { title: '班厝工作坊', image: 'Image_workshop.jpg' }
    ],
    stay: [
        { title: '故事裡的房間', image: 'Image_story_room.jpg' },
        { title: '老房間', image: 'Image_old_room.jpg' },
        { title: '單人床', image: 'Image_single_bed.jpg' },
        { title: '班厝客廳', image: 'Image_living_room_stay.jpg' },
        { title: '夜燈下的小書桌', image: 'Image_writing_desk.jpg' }
    ],
    workSwap: [
        { title: '工作內容', image: 'Image_work_content.jpg' },
        { title: '技能專長', image: 'Image_skill_swap.jpg' },
        { title: '故事交換', image: 'Image_story_exchange.jpg' },
        { title: '找到更多可能', image: 'Image_possibilities.jpg' },
        { title: '行前提醒', image: 'Image_travel_prep.jpg' }
    ]
};

async function migrateAllImages() {
    console.log('🚀 Starting Comprehensive Image Migration...');

    // 1. UPDATE ABOUT DOCUMENT
    try {
        const aboutDoc = await client.fetch(`*[_type == "about"][0]`);
        if (aboutDoc) {
            console.log('📝 Processing About Document...');

            // Hero Story Image
            const heroStoryImg = await uploadImage(ABOUT_DATA_MAP.heroStory.image);

            // Hero Cards Images
            const heroCardsWithImages = await Promise.all(aboutDoc.heroCards.map(async (card, idx) => {
                const mapItem = ABOUT_DATA_MAP.heroCards[idx]; // Assuming order matches
                const img = mapItem ? await uploadImage(mapItem.image) : null;
                return { ...card, image: img || undefined };
            }));

            // Environment
            // Start with data from previous aboutData.ts manually since it wasn't in aboutDoc before
            const environmentItems = [
                { title: "彩虹小徑", desc: "通往後院的小徑，兩旁種滿了香草與果樹..." },
                { title: "客廳／交誼廳", desc: "保留了舊時的新村板屋格局，藤椅..." },
                { title: "住宿房間", desc: "簡單乾淨的空間，保留了老房子的通風與採光..." },
                { title: "菜園", desc: "班厝後院有一片生機勃勃的菜園..." },
                { title: "前院涼亭", desc: "適合午後乘涼、聊天的地方..." },
                { title: "彩繪輪胎", desc: "利用廢棄輪胎做成的裝置藝術..." }
            ];
            const environmentWithImages = await Promise.all(environmentItems.map(async (item, idx) => {
                const mapItem = ABOUT_DATA_MAP.environment.find(m => m.title === item.title) || ABOUT_DATA_MAP.environment[idx];
                const img = mapItem ? await uploadImage(mapItem.image) : null;
                return { ...item, image: img || undefined };
            }));

            // Products
            const productItems = [
                { title: "桑葉茶包系列", desc: "採摘自班厝菜園的無毒桑葉..." },
                { title: "班厝肉骨茶包", desc: "獨家配方，傳承巴生好味道..." },
                { title: "咖啡豆五粒子", desc: "手沖咖啡豆，喚醒早晨的香氣..." },
                { title: "艾草香包", desc: "天然艾草製作，驅蚊避邪..." },
                { title: "九層塔青醬", desc: "新鮮九層塔製作，濃郁香氣..." },
                { title: "木鱉果香皂", desc: "溫和滋潤，呵護肌膚..." }
            ];
            const productsWithImages = await Promise.all(productItems.map(async (item, idx) => {
                const mapItem = ABOUT_DATA_MAP.products.find(m => m.title === item.title) || ABOUT_DATA_MAP.products[idx];
                const img = mapItem ? await uploadImage(mapItem.image) : null;
                return { ...item, image: img || undefined };
            }));

            // Rental
            // Reconstruct basic rental structure
            const rentalHighlightsData = [
                { title: "場地與設備", desc: "適合舉辦講座、工作坊、小型聚會..." },
                { title: "餐飲服務", desc: "可代訂新村特色餐點、茶點..." },
                { title: "活動支援", desc: "提供投影機、音響等基本設備..." }
            ];
            const rentalHighlightsWithImages = await Promise.all(rentalHighlightsData.map(async (item, idx) => {
                const mapItem = ABOUT_DATA_MAP.rentalHighlights.find(m => m.title === item.title) || ABOUT_DATA_MAP.rentalHighlights[idx];
                const img = mapItem ? await uploadImage(mapItem.image) : null;
                return { ...item, image: img || undefined };
            }));

            const rentalData = {
                highlights: rentalHighlightsWithImages,
                process: [
                    { step: "01", title: "需求確認", desc: "確認活動性質、人數、時間" },
                    { step: "02", title: "場地預約", desc: "支付訂金保留檔期" },
                    { step: "03", title: "活動執行", desc: "現場設備測試與佈置" }
                ],
                plans: [
                    { name: "半日方案", sub: "4小時", items: ["場地獨享", "基本設備", "茶水供應"] },
                    { name: "全日方案", sub: "8小時", items: ["場地獨享", "基本設備", "茶水供應", "餐點代訂優惠"] }
                ],
                contact: { desc: "歡迎透過 Facebook 或 WhatsApp 聯繫我們" }
            };


            const aboutPatch = {
                ...(heroStoryImg ? { 'heroStory.image': heroStoryImg } : {}),
                heroCards: heroCardsWithImages,
                environment: environmentWithImages,
                products: productsWithImages,
                rental: rentalData
            };

            await client.patch(aboutDoc._id).set(aboutPatch).commit();
            console.log('✅ About Document Updated with Images!');
        }
    } catch (err) {
        console.error('❌ About Migration Failed:', err);
    }

    // 2. UPDATE VILLAGE DOCUMENT
    try {
        const villageDoc = await client.fetch(`*[_type == "village"][0]`);
        if (villageDoc) {
            console.log('📝 Processing Village Document...');

            // Activities
            if (villageDoc.activities && villageDoc.activities.items) {
                const newItems = await Promise.all(villageDoc.activities.items.map(async (item) => {
                    const mapItem = VILLAGE_DATA_MAP.activities.find(m => m.title === item.title);
                    const img = mapItem ? await uploadImage(mapItem.image) : null;
                    return { ...item, image: img || undefined };
                }));
                await client.patch(villageDoc._id).set({ 'activities.items': newItems }).commit();
            }

            // Stay
            if (villageDoc.stay && villageDoc.stay.rooms) {
                const newRooms = await Promise.all(villageDoc.stay.rooms.map(async (item) => {
                    const mapItem = VILLAGE_DATA_MAP.stay.find(m => m.title === item.title);
                    const img = mapItem ? await uploadImage(mapItem.image) : null;
                    return { ...item, image: img || undefined };
                }));
                await client.patch(villageDoc._id).set({ 'stay.rooms': newRooms }).commit();
            }

            // Work Swap
            if (villageDoc.workSwap && villageDoc.workSwap.items) {
                const newWorkSwapItems = await Promise.all(villageDoc.workSwap.items.map(async (item) => {
                    const mapItem = VILLAGE_DATA_MAP.workSwap.find(m => m.title === item.title);
                    const img = mapItem ? await uploadImage(mapItem.image) : null;
                    return { ...item, image: img || undefined };
                }));
                await client.patch(villageDoc._id).set({ 'workSwap.items': newWorkSwapItems }).commit();
            }

            console.log('✅ Village Document Updated with Images!');
        }
    } catch (err) {
        console.error('❌ Village Migration Failed:', err);
    }
}

migrateAllImages();
