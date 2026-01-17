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
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

const LOCATIONS = [
    // --- Food ---
    {
        id: 'f1',
        name: '三美肉骨茶', name_en: 'Samy Bak Kut Teh',
        subName: 'Restoran Samy Bak Kut Teh (HQ)', subName_en: 'Restoran Samy Bak Kut Teh (HQ)',
        address: '164A, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        address_en: '164A, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['在地人非常愛，早上人多到爆棚那種。', '湯頭偏鹹香、帶一點點藥材甜味，不是那種很厚重的藥味型。'],
        featureDescription_en: ['Loved by locals, practically overflowing in the mornings.', 'The soup is savory and fragrant with a mild herbal sweetness, not the heavy herbal type.'],
        distanceInfo: '距離班厝：同在 Pandamaran，開車大概 5 分鐘左右。',
        distanceInfo_en: 'Distance from Rumah Papan: Within Pandamaran, about a 5-minute drive.',
        coordinateX: 55, coordinateY: 40
    },
    {
        id: 'f2',
        name: '福文肉骨茶', name_en: 'Fuh Wen Bak Kut Teh',
        subName: 'Fuh Wen Bak Kut Teh', subName_en: 'Fuh Wen Bak Kut Teh',
        address: '158 D, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        address_en: '158 D, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        category: 'food',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['湯頭濃郁回甘、中藥味與肉香平衡，內臟處理乾淨無異味，提供瓦煲或不鏽鋼碗裝，特別是小火慢燉保溫設計，讓湯汁與食材風味更佳。'],
        featureDescription_en: ['Rich and sweet aftertaste, balanced herbal and meaty aroma, clean offal without odor. Served in clay pots or stainless steel bowls, specially designed to simmer on low heat to keep warm, enhancing the flavor of the soup and ingredients.'],
        coordinateX: 52, coordinateY: 45
    },
    {
        id: 'f3',
        name: 'Ah Her 肉骨茶', name_en: 'Ah Her Bak Kut Teh',
        subName: 'Ah Her Bak Kut Teh', subName_en: 'Ah Her Bak Kut Teh',
        address: '818, Jalan Susur Besar, Pandamaran, 42000 Port Klang, Selangor, Malaysia',
        address_en: '818, Jalan Susur Besar, Pandamaran, 42000 Port Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['是比較「濃縮型」的湯，湯不多但很稠、很濃，油飯也很香。', '下午／晚上營業那種，很多人專程去吃晚餐。'],
        featureDescription_en: ['A "concentrated" type of soup—little broth but very thick and rich, served with fragrant oil rice.', 'Open in the afternoon/evening, a spot many drive specifically to for dinner.'],
        coordinateX: 50, coordinateY: 50
    },
    {
        id: 'f4',
        name: '新順明茶餐室', name_en: 'Soon Beng Kopitiam',
        subName: 'Soon Beng Kopitiam - Port Klang HQ', subName_en: 'Soon Beng Kopitiam - Port Klang HQ',
        address: '92, Jalan Tengku Badar, Kampung Raja Uda, 42000 Pelabuhan Klang, Selangor',
        address_en: '92, Jalan Tengku Badar, Kampung Raja Uda, 42000 Pelabuhan Klang, Selangor',
        category: 'food',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['經典家鄉麵包，那是一份純樸的味道，椰香加上半熟蛋，口感交織美味，再配上KTM,堪稱一絕。'],
        featureDescription_en: ['Classic hometown bread, a rustic taste. Coconut jam with half-boiled eggs creates a delicious texture. Paired with Kopi O, it is absolutely superb.'],
        coordinateX: 60, coordinateY: 35
    },
    {
        id: 'f5',
        name: '連春老字號', name_en: 'Lanchun Old Brand',
        address: 'Kampung Sijangkang, 42000 Port Klang, Selangor',
        address_en: 'Kampung Sijangkang, 42000 Port Klang, Selangor',
        category: 'food',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['大推紅酒麵線，充滿酒糟香氣的麵線，份量十足，麵線軟但不爛，好吃！'],
        featureDescription_en: ['Highly recommended Red Wine Mee Sua. Full of wine sediment aroma, generous portion, noodles are soft but not mushy. Delicious!'],
        coordinateX: 58, coordinateY: 38
    },
    {
        id: 'a1',
        name: '黃澄澄菜包嬸', name_en: 'Cai Bao Chium',
        subName: 'Cai Bao Chium', subName_en: 'Cai Bao Chium',
        address: '250, Jalan Lai, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        address_en: '250, Jalan Lai, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        category: 'food',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['在地獨有的菜包美食，跟你想像的菜包是不一樣的，鹹香味道，也包滿蔬菜，很好吃，一口接一口。'],
        featureDescription_en: ['A unique local vegetable bun delicacy, different from what you might imagine. Savory taste, packed with vegetables, very delicious, bite after bite.'],
        coordinateX: 45, coordinateY: 55
    },
    // --- Temple ---
    {
        id: 't1',
        name: '觀天宮', name_en: 'Kuan Tian Gong',
        subName: 'Kuan Tien Klang', subName_en: 'Kuan Tien Klang',
        address: 'Pandamaran, 42000 Port Klang, Selangor',
        address_en: 'Pandamaran, 42000 Port Klang, Selangor',
        category: 'temple',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['位於 Jalan Kemanis 同一條路上。', '班村在地信仰中心之一。'],
        featureDescription_en: ['Located on the same road as Jalan Kemanis.', 'One of the local faith centers in Pandamaran Village.'],
        distanceInfo: '距離班厝步行幾分鐘',
        distanceInfo_en: 'A few minutes walk from Rumah Papan.',
        coordinateX: 70, coordinateY: 30
    },
    {
        id: 't2',
        name: '五條路觀音亭', name_en: 'Kwan Imm Temple',
        address: '30, Jalan Raya Barat, Kawasan 6, 41000 Klang, Selangor',
        address_en: '30, Jalan Raya Barat, Kawasan 6, 41000 Klang, Selangor',
        category: 'temple',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['觀音亭主祀觀世音菩薩，是巴生區香火最旺盛的觀音廟之一。'],
        featureDescription_en: ['Dedicated to Guanyin Bodhisattva, it is one of the Guanyin temples with the most flourishing incense in the Klang area.'],
        coordinateX: 75, coordinateY: 25
    },
    {
        id: 't3',
        name: '巴生毗濕奴廟宇', name_en: 'Klang Vishnu Temple',
        subName: 'Sri Sundararaja Perumal', subName_en: 'Sri Sundararaja Perumal',
        address: '80, Jalan Mastika, off Persiaran Raja Muda Musa, 41100 Klang, Selangor',
        address_en: '80, Jalan Mastika, off Persiaran Raja Muda Musa, 41100 Klang, Selangor',
        category: 'temple',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['主祀毗濕奴的印度教聖地，以融合在地文化的高聳尖塔與《羅摩衍那》浮雕，展現宗教與藝術的完美結合。'],
        featureDescription_en: ['A Hindu holy site dedicated to Vishnu, showcasing a perfect combination of religion and art with towering spires fusing local culture and Ramayana reliefs.'],
        coordinateX: 80, coordinateY: 28
    },
    // --- Attraction ---
    {
        id: 'm1',
        name: 'Rumah Papan', name_en: 'Rumah Papan',
        subName: '班厝故事館', subName_en: 'Rumah Papan Story House',
        address: 'Pandamaran, Port Klang',
        address_en: 'Pandamaran, Port Klang',
        category: 'attraction',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['位於巴生班達馬蘭新村的「班厝」，是一座承載著在地記憶與庶民文化的故事館。透過展覽、導覽與社區活動，帶領訪客深入了解這個全馬第二大新村的發展歷史，感受淳樸的在地鄰里情感。'],
        featureDescription_en: ['Located in Pandamaran New Village, Klang, "Rumah Papan" is a story house carrying local memories and common people\'s culture. Through exhibitions, guided tours, and community activities, it leads visitors to deeply understand the history of Malaysia\'s second-largest new village and feel the simple local neighborhood emotions.'],
        coordinateX: 30, coordinateY: 70
    },
    {
        id: 's1',
        name: '蓮花清人寺\n佛祖慈善院', name_en: 'Lotus Ching Ren Temple & Buddha Charity',
        address: 'Selangor, Port Klang, Jalan Kemanis, Pandamaran, 42000',
        address_en: 'Selangor, Port Klang, Jalan Kemanis, Pandamaran, 42000',
        category: 'attraction',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['班村必訪地標！ 這裡不僅有全馬最宏偉的漢白玉佛祖像，更是結合慈善與觀光的聖地。從免費供餐、關懷弱勢到心靈修行，為遊客提供豐富的文化體驗。'],
        featureDescription_en: ['A must-visit landmark in Pandamaran! Not only does it house the grandest white jade Buddha statue in Malaysia, but it is also a holy land combining charity and tourism. From free meals and caring for the disadvantaged to spiritual cultivation, it offers a rich cultural experience for tourists.'],
        coordinateX: 35, coordinateY: 75
    },
    {
        id: 'a2',
        name: '你家炸雞搖搖冰', name_en: 'Nijia Fried Chicken & Shake Ice',
        address: 'Jalan Young, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        address_en: 'Jalan Young, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        category: 'attraction',
        featureTitle: '特色', featureTitle_en: 'Highlights',
        featureDescription: ['搖搖冰口感綿密細緻、入口即化，消暑解渴，通常與香脆的炸雞、燒雞搭配享用，形成絕佳風味。'],
        featureDescription_en: ['The shake ice has a dense and delicate texture, melting in your mouth, cooling and thirst-quenching. Usually enjoyed with crispy fried chicken or roasted chicken, forming an excellent flavor combination.'],
        coordinateX: 20, coordinateY: 80
    }
];

const MAP_DATA = {
    title: "觀光地圖", title_en: "Tourist Map",
    subtitle: "人氣景點", subtitle_en: "Popular Spots",
    locations: LOCATIONS
};

async function migrate() {
    console.log('🚀 Starting Village Map migration...');
    try {
        const villageDoc = await client.fetch(`*[_type == "village"][0]`);
        if (villageDoc) {
            console.log(`📝 Patching village document (ID: ${villageDoc._id}) with map data...`);
            await client.patch(villageDoc._id).set({ map: MAP_DATA }).commit();
            console.log('✅ Village document updated with map data!');
        } else {
            console.error('❌ Village document not found! Please run the main migration first.');
        }
    } catch (err) {
        console.error('❌ Migration failed:', err);
    }
}

migrate();
