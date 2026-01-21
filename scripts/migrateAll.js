
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

// --- HOME DATA ---
const HOME_DOC = {
    _type: 'home',
    _id: 'home-settings',
    title: "首頁設定",
    title_en: "Home Settings",
    description: "班厝是一間收集故事的厝，牆上是老照片，桌上是新朋友，讓一條班達馬蘭新村的記憶持續被看見。",
    description_en: "Rumah Papan is a place that collects stories. Old photos on the walls, new friends on the tables—keeping the memories of Pandamaran New Village visible.",
    heroBubbles: [
        { _key: 'about', key: 'about', title: '一間為新村存放記憶的厝', title_en: 'A House that Keeps Memories', body: '班厝是一間收集故事的厝...', body_en: 'Rumah Papan is a place...', bubbleText: '關於班厝', bubbleText_en: 'About Us' },
        { _key: 'bkt', key: 'bkt', title: '來碗班達馬蘭肉骨茶', title_en: 'Have a Bowl of BKT', body: '在班達馬蘭新村，清晨不是咖啡香...', body_en: "In Pandamaran New Village, the morning isn't about the smell of coffee...", bubbleText: '肉骨茶', bubbleText_en: 'Bak Kut Teh' },
        { _key: 'walk', key: 'walk', title: '用腳一步一步讀完班達馬蘭', title_en: 'Read Pandamaran Step by Step', body: '跟著導覽在巷口轉彎...', body_en: 'Follow the guide to turn at the alley...', bubbleText: '走讀新村', bubbleText_en: 'Village Walk' }
    ],
    introSlides: [
        { _key: 's1', title: '厝邊頭尾導覽', title_en: 'Neighborhood Tour', desc: '館長親自帶路...', desc_en: 'Personally guided by the curator...' },
        { _key: 's2', title: '雞公碗', title_en: 'Rooster Bowl', desc: '馬來西亞最大的華人新村入口...', desc_en: 'The entrance to Malaysia\'s largest Chinese new village...' }
    ]
};

// --- ABOUT DATA ---
const ABOUT_DOC = {
    _type: 'about',
    _id: 'about-settings',
    title: "關於我們設定",
    title_en: "About Settings",
    heroStory: {
        title: "故事誌", title_en: "Stories",
        subtitle: "把新村寫進日常", subtitle_en: "Writing the New Village into Daily Life",
        tag: "about RUMAH PAPAN", tag_en: "about RUMAH PAPAN",
        path: "/stories"
    },
    heroCards: [
        { _key: 'c1', title: "環境介紹", title_en: "Environment", subtitle: "走一圈，認識班厝的每個角落", subtitle_en: "Walk around, know every corner", path: "/about/environment" },
        { _key: 'c2', title: "農作產品", title_en: "Farm Products", subtitle: "從種植到桌上的班厝禮物", subtitle_en: "Gifts from planting to table", path: "/products" },
        { _key: 'c3', title: "場地租借", title_en: "Venue Rental", subtitle: "把想做的事，放進班厝這個場景", subtitle_en: "Put what you want to do into the scene", path: "/about/rental" }
    ],
    environment: [
        { _key: 'e1', title: "彩虹小徑", title_en: "Rainbow Path", desc: "走過彩色步道，推開鐵門...", desc_en: "Walk through the colorful path..." },
        { _key: 'e2', title: "客廳／交誼廳", title_en: "Living Room", desc: "牆上的看板和老照片...", desc_en: "Old photos and boards on the wall..." }
    ],
    products: [
        { _key: 'p1', title: "桑葉茶包系列", title_en: "Mulberry Tea Bags", desc: "無咖啡因，桑葉搭配藥材...", desc_en: "Caffeine-free, Mulberry leaves with herbs..." },
        { _key: 'p2', title: "班厝肉骨茶包", title_en: "BKT Pack", desc: "在家就能燉出巴生在地人最熟悉的暖身熱湯。", desc_en: "Stew the warming soup most familiar to Klang locals at home." }
    ],
    rental: {
        highlights: [
            { _key: 'rh1', title: "班厝全館｜拍攝場景租借", title_en: "Full House Filming Rental", desc: "廣告、MV、短片、電視劇..." },
            { _key: 'rh2', title: "客廳｜活動場地租借", title_en: "Living Room Event Rental", desc: "適合工作坊、分享會..." }
        ],
        process: [
            { _key: 'rp1', step: "01", title: "聯繫＆提出需求", title_en: "Contact & Request", desc: "分享預計日期、人數與用途。" },
            { _key: 'rp2', step: "02", title: "場勘＆報價確認", title_en: "Site Visit & Quote", desc: "回覆可用檔期、提供正式報價。" }
        ],
        plans: [
            { _key: 'pl1', name: "方案 A", name_en: "Plan A", sub: "全館拍攝租借", sub_en: "Full House Filming", items: ["時段：07:00–22:00", "費用：每小時 RM150"] },
            { _key: 'pl2', name: "方案 B", name_en: "Plan B", sub: "客廳／空間租借", sub_en: "Living Room Rental", items: ["設備：冷氣、投影機", "容納：30-50人"] }
        ]
    }
};

// --- CONTACT DATA ---
const CONTACT_DOC = {
    _type: 'contact',
    _id: 'contact-settings',
    founderName: "周鴻輝", founderName_en: "Chow Hong Hui",
    founderTitle: "創辦人", founderTitle_en: "Founder",
    founderSubtitle: "文化導遊 / 地方創生", founderSubtitle_en: "Cultural Guide / Placemaker",
    founderBio: "我出生於巴生班達馬蘭新村...", founderBio_en: "Born in Pandamaran New Village...",
    facebookHandle: "班厝. 班村故事馆", facebookLink: "https://www.facebook.com/RumahPapanPandamaran/",
    instagramHandle: "rumah_papan_pandamaran", instagramLink: "https://www.instagram.com/rumah_papan_pandamaran",
    whatsappHandle: "+60 16-219 8920", whatsappLink: "https://wa.me/60162198920"
};

// --- VILLAGE DATA (Stay, Activities, Traffic, etc.) ---
const VILLAGE_DOC_PATCH = {
    activities: {
        heroTitle: "活動體驗", heroTitle_en: "Activities",
        items: [
            { _key: 'a1', title: "走村導覽", title_en: "Village Tour", desc: "館主親自帶路..." },
            { _key: 'a2', title: "拜天公", title_en: "Praying to Jade Emperor", desc: "正月初九點燃煙火..." }
        ],
        quote: { title: "在活動裡認識一條村", title_en: "Know a Village", desc: "班厝每場活動都從這條新村長出..." },
        notices: [{ _key: 'an1', id: '01', title: '報名與收費', desc: '導覽採收費制...' }]
    },
    stay: {
        heroTitle: "住宿體驗", heroTitle_en: "Stay Experience",
        rooms: [
            { _key: 'r1', title: "故事裡的房間", title_en: "Story Room", desc: "牆上掛著老照片與地圖..." },
            { _key: 'r2', title: "老房間", title_en: "Old Room", desc: "鐵床上下鋪..." }
        ],
        quote: { title: "溫暖班厝", title_en: "Warm Rumah Papan", desc: "睡的不只是床，而是一整個新村的精神。" },
        booking: { title: "住宿預約", title_en: "Booking", button: "填寫申請表", button_en: "Apply Now" },
        notices: [{ _key: 'sn1', id: '01', title: '預約提醒', desc: '建議提前一週預約。' }]
    },
    workSwap: {
        heroTitle: "技能換宿", heroTitle_en: "Work Swap",
        items: [
            { _key: 'w1', title: "工作內容", title_en: "Job Content", desc: "協助環境整理、接待訪客..." }
        ],
        quote: { title: "把日子住進新村", title_en: "Live the Life", desc: "你不只是在幫忙，而是一起生活在一條村裡。" },
        booking: { title: "換宿預約", title_en: "Apply", button: "填寫申請表" },
        notices: [{ _key: 'wn1', id: '01', title: '申請條件', desc: '需至少換宿14天。' }]
    },
    traffic: {
        heroTitle: "交通資訊", heroTitle_en: "Traffic Info",
        methods: [
            { _key: 't1', type: "機場", type_en: "Airport", title: "從吉隆坡國際機場出發", steps: [{ _key: 'ts1', id: '01', action: '搭乘巴士', desc: '前往巴生' }] }
        ]
    }
};

async function migrateAll() {
    console.log('Starting full site migration...');

    try {
        await client.createOrReplace(HOME_DOC);
        console.log('Migrated Home settings.');

        await client.createOrReplace(ABOUT_DOC);
        console.log('Migrated About settings.');

        await client.createOrReplace(CONTACT_DOC);
        console.log('Migrated Contact settings.');

        // Update Village (already exists from previous map migration)
        const villageDoc = await client.fetch('*[_type == "village"][0]');
        if (villageDoc) {
            await client.patch(villageDoc._id).set(VILLAGE_DOC_PATCH).commit();
            console.log('Migrated Village details (Activities, Stay, Work Swap, Traffic).');
        } else {
            await client.create({ _type: 'village', title: "村落頁面設定", ...VILLAGE_DOC_PATCH });
            console.log('Created Village document with details.');
        }

        console.log('Full site migration completed successfully!');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

migrateAll();
