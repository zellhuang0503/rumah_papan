import env1 from '../assets/images/Image_rainbow_path.jpeg';
import env2 from '../assets/images/Image_living_room.jpg';
import env3 from '../assets/images/Image_room.jpg';
import env4 from '../assets/images/Image_garden.jpeg';
import env5 from '../assets/images/Image_pavilion.jpeg';
import env6 from '../assets/images/Image_tires.jpeg';

import prod1 from '../assets/images/Image_mulberry_tea.jpeg';
import prod2 from '../assets/images/Image_bak_kut_teh.jpeg';
import prod3 from '../assets/images/Image_five_stones.png';
import prod4 from '../assets/images/Image_mugwort_sachet.png';
import prod5 from '../assets/images/Image_basil_pesto.jpeg';
import prod6 from '../assets/images/Image_gac_soap.jpeg';

import venue1 from '../assets/images/Image_whole_venue.jpg';
import venue2 from '../assets/images/Image_living_room_rental.jpg';
import venue3 from '../assets/images/Image_rental_support.jpg';

export const ABOUT_HERO_DATA_ZH = {
    story: {
        title: "故事誌",
        subtitle: "把新村寫進日常",
        tag: "about\nRUMAH PAPAN",
        path: "/stories"
    },
    cards: [
        {
            title: "環境介紹",
            subtitle: "走一圈，認識班厝的每個角落",
            path: "/about/environment"
        },
        {
            title: "農作產品",
            subtitle: "從種植到桌上的班厝禮物",
            path: "/products"
        },
        {
            title: "場地租借",
            subtitle: "把想做的事，放進班厝這個場景",
            path: "/about/rental"
        }
    ]
};

const ABOUT_HERO_DATA_EN = {
    story: {
        title: "Stories",
        subtitle: "Writing the New Village into Daily Life",
        tag: "about\nRUMAH PAPAN",
        path: "/stories"
    },
    cards: [
        {
            title: "Environment",
            subtitle: "Walk around, know every corner of Rumah Papan",
            path: "/about/environment"
        },
        {
            title: "Farm Products",
            subtitle: "Gifts from planting to table",
            path: "/products"
        },
        {
            title: "Venue Rental",
            subtitle: "Put what you want to do into the scene of Rumah Papan",
            path: "/about/rental"
        }
    ]
};

export const getAboutHeroData = (lang: 'zh' | 'en') => lang === 'zh' ? ABOUT_HERO_DATA_ZH : ABOUT_HERO_DATA_EN;
export const ABOUT_HERO_DATA = ABOUT_HERO_DATA_ZH;

const ENVIRONMENT_DATA_ZH = [
    {
        title: "彩虹小徑",
        desc: "走過彩色步道，推開鐵門，\n就是班厝一天會發生很多故事的地方。",
        image: env1
    },
    {
        title: "客廳／交誼廳",
        desc: "牆上的看板和老照片留下了班村的腳印；\n早上是早餐桌，晚上常常又成說故事的現場。",
        image: env2
    },
    {
        title: "住宿房間",
        desc: "簡單乾淨的板屋房間，\n讓你的床，真的搬進新村生活裡。",
        image: env3
    },
    {
        title: "菜園",
        desc: "菜園裡種滿蔬果和艾草，端上桌的每一道菜，大多都從這裡長出來。",
        image: env4
    },
    {
        title: "前院涼亭",
        desc: "棚下是最熱鬧的角落，\n蔗物、喝茶、聊天、辦活動，都從這裡開始。",
        image: env5
    },
    {
        title: "彩繪輪胎",
        desc: "親手彩繪的彩色輪胎，是「班厝故事館」入口活招牌，也是大家最愛停下來拍照的風景。",
        image: env6
    }
];

const ENVIRONMENT_DATA_EN = [
    {
        title: "Rainbow Path",
        desc: "Walk through the colorful path, push open the iron gate,\nthis is where many stories happen in Rumah Papan daily.",
        image: "https://placehold.co/544x454"
    },
    {
        title: "Living Room / Lounge",
        desc: "Old photos and boards on the wall leave footprints of the village;\nmorning is a breakfast table, night often becomes a storytelling scene.",
        image: "https://placehold.co/544x454"
    },
    {
        title: "Guest Rooms",
        desc: "Simple and clean wooden house rooms,\nletting your bed really move into the village life.",
        image: "https://placehold.co/544x454"
    },
    {
        title: "Vegetable Garden",
        desc: "Full of vegetables and mugwort, every dish on the table mostly grows from here.",
        image: "https://placehold.co/544x454"
    },
    {
        title: "Front Yard Pavilion",
        desc: "The liveliest corner under the shed;\nshielding, drinking tea, chatting, holding events, all start from here.",
        image: "https://placehold.co/544x454"
    },
    {
        title: "Painted Tires",
        desc: "Hand-painted colorful tires are the live signboard of 'Rumah Papan Story House', and the scenery everyone loves to stop and take photos with.",
        image: "https://placehold.co/544x454"
    }
];

export const getEnvironmentData = (lang: 'zh' | 'en') => lang === 'zh' ? ENVIRONMENT_DATA_ZH : ENVIRONMENT_DATA_EN;
export const ENVIRONMENT_DATA = ENVIRONMENT_DATA_ZH;

const PRODUCTS_DATA_ZH = [
    {
        title: "桑葉茶包系列",
        desc: "以樹葉曬乾製成無咖啡因，桑葉搭配藥材，消脂、潤肺養顏、開胃解膩，適合每天當涼喝。",
        image: prod1
    },
    {
        title: "班厝肉骨茶包",
        desc: "班厝肉骨茶包：以胡椒、蒜頭與中藥材調製，在家就能燉出巴生在地人最熟悉的暖身熱湯。",
        image: prod2
    },
    {
        title: "咖啡豆五粒子",
        desc: "把咖啡豆、相思豆收進布袋，搭配蠟染布案，一邊拋接，一邊感受咖啡與在地文化的故事。",
        image: prod3
    },
    {
        title: "艾草香包",
        desc: "採自班厝菜園的新鮮艾草曬乾製成，帶淡淡草本香氣，可掛在門口和包包裡驅蚊、防穢氣。",
        image: prod4
    },
    {
        title: "九層塔青醬",
        desc: "九層塔的香氣在鍋裡慢慢醒來，在班厝，一匙青醬，就是故事開始變好吃的瞬間。",
        image: prod5,
        imageScale: '1.3',
        imagePosition: 'object-[40%_center]'
    },
    {
        title: "木鱉果香皂",
        desc: "木鱉果的香氣被揉進香皂裡，\n洗掉一身疲憊，也把新村的陽光留在手心。",
        image: prod6,
        imagePosition: 'object-[center_70%]',
        imageScale: '1.2'
    }
];

const PRODUCTS_DATA_EN = [
    {
        title: "Mulberry Tea Bags",
        desc: "Made from dried leaves, caffeine-free. Mulberry leaves with herbs, fat-reducing, lung-moistening, beauty-enhancing, appetizing, suitable as a daily cool drink.",
        image: "https://placehold.co/544x454"
    },
    {
        title: "Rumah Papan Bak Kut Teh Pack",
        desc: "Prepared with pepper, garlic and Chinese herbs, you can stew the warming soup most familiar to Klang locals at home.",
        image: "https://placehold.co/544x454"
    },
    {
        title: "Coffee Bean Five Stones",
        desc: "Putting coffee beans and acacia seeds into cloth bags, matched with batik patterns, throwing and catching, feeling the story of coffee and local culture.",
        image: "https://placehold.co/544x454"
    },
    {
        title: "Mugwort Sachet",
        desc: "Made from fresh mugwort from the garden dried in the sun, with a faint herbal aroma, can be hung on the door or bag to repel mosquitoes.",
        image: "https://placehold.co/544x454"
    },
    {
        title: "Basil Pesto",
        desc: "The aroma of basil wakes up slowly in the pot. At Rumah Papan, a spoonful of pesto is the moment the story starts to taste good.",
        image: "https://placehold.co/544x454",
        imageScale: '1.3',
        imagePosition: 'object-[40%_center]'
    },
    {
        title: "Gac Fruit Soap",
        desc: "The aroma of Gac fruit is kneaded into soap, washing away fatigue, and keeping the sunlight of the new village in the palm of your hand.",
        image: "https://placehold.co/544x454",
        imagePosition: 'object-[center_70%]',
        imageScale: '1.2'
    }
];

export const getProductsData = (lang: 'zh' | 'en') => lang === 'zh' ? PRODUCTS_DATA_ZH : PRODUCTS_DATA_EN;
export const PRODUCTS_DATA = PRODUCTS_DATA_ZH;

const RENTAL_DATA_ZH = {
    highlights: [
        {
            title: "班厝全館｜拍攝場景租借",
            desc: "廣告、MV、短片、電視劇、紀錄片、學生作品，把下一支作品拍在真正的新村裡。",
            type: "scene",
            image: venue1
        },
        {
            title: "客廳｜活動場地租借",
            desc: "適合工作坊、分享會、小型發表與聚會，把活動搬進班厝裡。",
            type: "activity",
            image: venue2
        },
        {
            title: "不只是租場地，也是支持新村",
            desc: "在班厝拍片 or 辦活動， 讓班達馬蘭被看見，也讓社區更有力量。",
            type: "support",
            image: venue3
        }
    ],
    process: [
        {
            step: "Step 1",
            title: "聯繫＆提出需求",
            desc: "分享你預計的拍攝／活動日期、人數與用途，可透過表單、FB、IG、 WhatsApp 聯絡班厝。"
        },
        {
            step: "Step 2",
            title: "場勘＆報價確認",
            desc: "班厝會回覆可用檔期，如有需要可預約勘場，並提供正式報價與方案。"
        },
        {
            step: "Step 3",
            title: "確認＆進場使用",
            desc: "確認日期後簽約與付訂，劇組可提前進場佈置，活動當天由班厝協助開門與善後。"
        }
    ],
    plans: [
        {
            name: "方案 A",
            sub: "全館拍攝租借",
            items: [
                "時段：07:00–22:00",
                "費用：每小時 RM150",
                "Full Day 15hrs 優惠 RM2000（原價 RM2250）",
                "班厝負責場地提前整理與善後清潔",
                "劇組可提前進場佈置",
                "老屋內舊物可作為拍攝道具；如需外借，費用另計"
            ]
        },
        {
            name: "方案 B",
            sub: "客廳／空間租借（活動）",
            items: [
                "用途：工作坊、講座、分享會、小型聚會",
                "設備：冷氣、投影機、桌椅",
                "容納人數：約 30–50 人，依活動配置調整",
                "可加購餐飲服務，費用另計"
            ]
        }
    ],
    contact: {
        title: "聯繫班厝",
        desc: "告訴我們你想拍什麼、辦什麼活動，我們會在 3–5 個工作天內回覆。",
        address: "124, Jalan Kemanis, 42000 Pelabuhan Klang, Klang, Malaysia, 42000",
        phone: "+60 16-219 8920",
        email: "rumahpapanklang@gmail.com",
        serviceArea: "Malaysia Selangor Klang"
    }
};

const RENTAL_DATA_EN = {
    highlights: [
        {
            title: "Full House | Filming Scene Rental",
            desc: "Ads, MVs, shorts, dramas, documentaries, student works. Shoot your next work in a real new village.",
            type: "scene",
            image: venue1
        },
        {
            title: "Living Room | Event Venue Rental",
            desc: "Suitable for workshops, sharing sessions, small launches and gatherings. Move the event into Rumah Papan.",
            type: "activity",
            image: venue2
        },
        {
            title: "Not just renting a venue, but supporting the new village",
            desc: "Filming or holding events at Rumah Papan lets Pandamaran be seen and gives the community more power.",
            type: "support",
            image: venue3
        }
    ],
    process: [
        {
            step: "Step 1",
            title: "Contact & Request",
            desc: "Share your expected date, pax, and purpose. Contact via Form, FB, IG, WhatsApp."
        },
        {
            step: "Step 2",
            title: "Site Visit & Quote",
            desc: "We will reply with availability. Appointment for site visit if needed, and provide official quote and plan."
        },
        {
            step: "Step 3",
            title: "Confirm & Move In",
            desc: "Sign contract and pay deposit. Crew can enter early for setup. Rumah Papan assists with opening and cleanup."
        }
    ],
    plans: [
        {
            name: "Plan A",
            sub: "Full House Filming Rental",
            items: [
                "Time: 07:00–22:00",
                "Rate: RM150/hr",
                "Full Day 15hrs Promo RM2000 (NP RM2250)",
                "Rumah Papan handles pre-tidy and post-clean",
                "Crew can set up early",
                "Old items in house can be props; extra fee for loan"
            ]
        },
        {
            name: "Plan B",
            sub: "Living Room / Space Rental (Event)",
            items: [
                "Usage: Workshops, talks, sharing sessions, small gatherings",
                "Facilities: AC, Projector, Tables/Chairs",
                "Capacity: Approx 30–50 pax",
                "Catering add-on available"
            ]
        }
    ],
    contact: {
        title: "Contact Rumah Papan",
        desc: "Tell us what you want to film or hold, we reply in 3–5 working days.",
        address: "124, Jalan Kemanis, 42000 Pelabuhan Klang, Klang, Malaysia, 42000",
        phone: "+60 16-219 8920",
        email: "rumahpapanklang@gmail.com",
        serviceArea: "Malaysia Selangor Klang"
    }
};

export const getRentalData = (lang: 'zh' | 'en') => lang === 'zh' ? RENTAL_DATA_ZH : RENTAL_DATA_EN;
export const RENTAL_DATA = RENTAL_DATA_ZH;
