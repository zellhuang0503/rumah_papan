
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const client = createClient({
    projectId: 'pt01rhvf',
    dataset: 'production',
    apiVersion: '2024-03-24',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

const STORIES_ZH = [
    { id: '1', category: 'history', title: '巴生最大，全馬傳奇：班達馬蘭', description: '班達馬蘭新村（班村），成立於 1951 年，前身是「巴生港口新村」，1953 年改名為 Kampung Baru Pandamaran，作為巴生最大華人新村，班達馬蘭不只佔地廣闊，更承載著全馬數一數二的福建人口密度與文化信仰。', variant: 'banner', size: 'full', tags: ['#班達馬蘭新村史'] },
    { id: '2', category: 'history', title: '從一棵樹，到一座華人新村', description: 'Pandamaran 一名來自達馬樹 Pokok Damar。樹脂早年被用來造船黏合、上色，也有人靠採集樹脂維生，被稱「Pendamar」。這個職業，最後留下了今天這個村名。\n如今，這裡已是全馬最知名的「福建華人新村」。', variant: 'text-highlight', size: 'medium', tags: ['#班達馬蘭新村史'] },
    { id: '3', category: 'history', title: '自 1951 年以來，70+ 年新村歲月', description: '從落地紮根、搭起板屋，到今天安居樂業，班達馬蘭新村陪著好幾代人長大。透過故事館裡的老照片、口述訪談與展覽，這七十多年的生活軌跡，被重新整理成一個讓下一代看得見、讀得懂的新村歷史。', variant: 'text-overlay', size: 'medium', tags: ['#班達馬蘭新村史'] },
    { id: '4', category: 'history', title: '盛滿好運的地標', description: '雞公碗，成了班達馬蘭對每一位訪客的招呼方式。', variant: 'compact', size: 'small', tags: ['#班達馬蘭新村史'] },
    { id: '5', category: 'history', title: '班達馬蘭的新村日常', description: '無論是早市此起彼落的叫賣聲、夜晚圓桌上的家常飯香，還是天公誕繚繞的虔誠香火。', variant: 'standard', size: 'full', tags: [] },
    { id: '6', category: 'about', title: '班厝：是也是所有人的家', description: '「班厝」福建話唸作 Bān Chǔ，與「板屋」諧音，道出這棟坐落於全馬最大福建新村老屋的靈魂。\n作為首家故事館，屋外是自家果園，屋內結合私房菜、技能換宿與在地選品。', variant: 'text-highlight', size: 'large', tags: ['#關於班厝'] },
    { id: '7', category: 'about', title: '由班村人為班村人開的館', description: '班厝由土生土長的周鴻輝與陳美雲創辦，聯合厝邊志工和 Jalan-jalan Klang 導覽隊，一起整理老照片、訪問長輩、策劃展覽。', variant: 'text-overlay', size: 'medium', tags: ['#關於班厝'] },
    { id: '8', category: 'about', title: '從一句「呷飽未？」開始', description: '在班厝，故事和飯菜，都是招呼你的方式。', variant: 'compact', size: 'small', tags: ['#關於班厝'] },
    { id: '9', category: 'about', title: '帶著未知而來，裝滿故事而歸', description: '不同國家、不同背景的人，在班厝一起生活、一起學習。', variant: 'standard', size: 'full', tags: [] },
    { id: '10', category: 'exchange', title: '班厝故事館：班達馬蘭的新村客廳', description: '班厝坐落在班達馬蘭新村，是村裡第一家故事館。以一棟老木板屋為基地，收集生活物件、照片和口述歷史。', variant: 'banner', size: 'full', tags: ['#關於班厝'] },
    { id: '12', category: 'food', title: '一桌肉骨茶，一整條新村的故事', description: '有人剛下夜班補一鍋，有人帶著家人慢慢吃。肉骨茶不只是料理，也是班達馬蘭人一起過日子的方式。', variant: 'standard', size: 'large', tags: [] }
];

const STORIES_EN = {
    '1': { title: 'Largest in Klang, Legend of Malaysia: Pandamaran', description: 'Pandamaran New Village (Ban Cun), founded in 1951, formerly "Port Swettenham New Village".' },
    '2': { title: 'From a Tree, To a Chinese New Village', description: 'The name Pandamaran comes from the Pokok Damar tree.' },
    '3': { title: 'Since 1951, 70+ Years of Village Life', description: 'From taking root to living and working in peace today.' },
    '4': { title: 'Landmark Full of Good Luck', description: 'Rooster Bowl has become Pandamaran\'s way of greeting every visitor.' },
    '5': { title: 'Daily Life in Pandamaran New Village', description: 'Whether it\'s the shouting in the morning market or home-cooked meals.' },
    '6': { title: 'Rumah Papan: A Home for Everyone', description: '"Ban Chu" (Rumah Papan) sounds like "Wooden House" in Hokkien.' },
    '7': { title: 'Opened by Villagers for Villagers', description: 'Founded by locals Chow Hong Hui and Tan Bee Hoon.' },
    '8': { title: 'Starting with "Have you eaten?"', description: 'At Rumah Papan, stories and meals are both ways to greet you.' },
    '9': { title: 'Arrive Unknown, Return Full of Stories', description: 'People from different countries and backgrounds live and learn together.' },
    '10': { title: 'Rumah Papan Story House: Village Living Room', description: 'Located in Pandamaran New Village, the first story house in the village.' },
    '12': { title: 'A Table of Bak Kut Teh, A Village Story', description: 'Bak Kut Teh is the way Pandamaran people live together.' }
};

async function migrate() {
    console.log('Starting migration of stories to Sanity...');

    for (const story of STORIES_ZH) {
        const doc = {
            _type: 'story',
            _id: `story-${story.id}`,
            title_zh: story.title,
            title_en: STORIES_EN[story.id]?.title || story.title,
            description_zh: story.description,
            description_en: STORIES_EN[story.id]?.description || story.description,
            slug: {
                _type: 'slug',
                current: `story-${story.id}`
            },
            category: story.category,
            variant: story.variant,
            size: story.size,
            tags: story.tags,
            publishedAt: new Date().toISOString()
        };

        try {
            await client.createOrReplace(doc);
            console.log(`Successfully migrated story: ${story.title}`);
        } catch (err) {
            console.error(`Failed to migrate story ${story.id}:`, err);
        }
    }

    console.log('Story migration completed!');
}

migrate();
