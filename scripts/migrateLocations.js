
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

const VILLAGE_LOCATIONS_ZH = [
    {
        id: 'f1',
        name: '三美肉骨茶',
        subName: 'Restoran Samy Bak Kut Teh (HQ)',
        address: '164A, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '在地人非常愛，早上人多到爆棚那種。',
            '湯頭偏鹹香、帶一點點藥材甜味，不是那種很厚重的藥味型。'
        ],
        distanceInfo: '距離班厝：同在 Pandamaran，開車大概 5 分鐘左右。',
        coordinates: { x: 55, y: 40 },
        phone: '012-326 2155',
        googleMapLink: 'https://goo.gl/maps/xyz1'
    },
    {
        id: 'f2',
        name: '福文肉骨茶',
        subName: 'Fuh Wen Bak Kut Teh',
        address: '158 D, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '湯頭濃郁回甘、中藥味與肉香平衡，內臟處理乾淨無異味。'
        ],
        coordinates: { x: 52, y: 45 }
    },
    {
        id: 'f3',
        name: 'Ah Her 肉骨茶',
        subName: 'Ah Her Bak Kut Teh',
        address: '818, Jalan Susur Besar, Pandamaran, 42000 Port Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '是比較「濃縮型」的湯，湯不多但很稠、很濃。'
        ],
        coordinates: { x: 50, y: 50 }
    },
    {
        id: 'f4',
        name: '新順明茶餐室',
        subName: 'Soon Beng Kopitiam - Port Klang HQ',
        address: '92, Jalan Tengku Badar, Kampung Raja Uda, 42000 Pelabuhan Klang, Selangor',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '經典家鄉麵包，那是一份純樸的味道。'
        ],
        coordinates: { x: 60, y: 35 }
    },
    {
        id: 'f5',
        name: '連春老字號',
        address: 'Kampung Sijangkang, 42000 Port Klang, Selangor',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '大推紅酒麵線，充滿酒糟香氣。'
        ],
        coordinates: { x: 58, y: 38 }
    },
    {
        id: 'a1',
        name: '黃澄澄菜包嬸',
        subName: 'Cai Bao Chium',
        address: '250, Jalan Lai, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '在地獨有的菜包美食，鹹香味道，包滿蔬菜。'
        ],
        coordinates: { x: 45, y: 55 }
    },
    {
        id: 't1',
        name: '觀天宮',
        subName: 'Kuan Tien Klang',
        address: 'Pandamaran, 42000 Port Klang, Selangor',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '班村在地信仰中心之一。'
        ],
        distanceInfo: '距離班厝步行幾分鐘',
        coordinates: { x: 70, y: 30 }
    },
    {
        id: 't2',
        name: '五條路觀音亭',
        address: '30, Jalan Raya Barat, Kawasan 6, 41000 Klang, Selangor',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '觀音亭主祀觀世音菩薩，是巴生區香火最旺盛的觀音廟之一。'
        ],
        coordinates: { x: 75, y: 25 }
    },
    {
        id: 't3',
        name: '巴生毗濕奴廟宇',
        subName: 'Sri Sundararaja Perumal',
        address: '80, Jalan Mastika, off Persiaran Raja Muda Musa, 41100 Klang, Selangor',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '主祀毗濕奴的印度教聖地。'
        ],
        coordinates: { x: 80, y: 28 }
    },
    {
        id: 'm1',
        name: 'Rumah Papan',
        subName: '班厝故事館',
        address: 'Pandamaran, Port Klang',
        category: 'attraction',
        featureTitle: '特色',
        featureDescription: [
            '一座承載著在地記憶與庶民文化的故事館。'
        ],
        coordinates: { x: 30, y: 70 }
    },
    {
        id: 's1',
        name: '蓮花清人寺 佛祖慈善院',
        address: 'Selangor, Port Klang, Jalan Kemanis, Pandamaran, 42000',
        category: 'attraction',
        featureTitle: '特色',
        featureDescription: [
            '班村必訪地標！有全馬最宏偉的漢白玉佛祖像。'
        ],
        coordinates: { x: 35, y: 75 }
    },
    {
        id: 'a2',
        name: '你家炸雞搖搖冰',
        address: 'Jalan Young, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        category: 'attraction',
        featureTitle: '特色',
        featureDescription: [
            '搖搖冰口感綿密細緻，通常與香脆的炸雞搭配。'
        ],
        coordinates: { x: 20, y: 80 }
    }
];

// Mapping to match English data roughly
const VILLAGE_LOCATIONS_EN = {
    'f1': { name: 'Samy Bak Kut Teh', subName: 'Restoran Samy Bak Kut Teh (HQ)' },
    'f2': { name: 'Fuh Wen Bak Kut Teh', subName: 'Fuh Wen Bak Kut Teh' },
    'f3': { name: 'Ah Her Bak Kut Teh', subName: 'Ah Her Bak Kut Teh' },
    'f4': { name: 'Soon Beng Kopitiam', subName: 'Soon Beng Kopitiam' },
    'f5': { name: 'Lanchun Old Brand' },
    'a1': { name: 'Cai Bao Chium' },
    't1': { name: 'Kuan Tien Gong' },
    't2': { name: 'Kwan Imm Temple' },
    't3': { name: 'Klang Vishnu Temple' },
    'm1': { name: 'Rumah Papan', subName: 'Rumah Papan Story House' },
    's1': { name: 'Lotus Ching Ren Temple & Buddha Charity' },
    'a2': { name: 'Nijia Fried Chicken & Shake Ice' }
};

async function migrate() {
    console.log('Starting migration of locations to Sanity...');

    const locations = VILLAGE_LOCATIONS_ZH.map(loc => ({
        _key: loc.id,
        id: loc.id,
        name: loc.name,
        name_en: VILLAGE_LOCATIONS_EN[loc.id]?.name || loc.name,
        subName: loc.subName,
        subName_en: VILLAGE_LOCATIONS_EN[loc.id]?.subName || loc.subName,
        address: loc.address,
        address_en: loc.address, // Simplifying for migration
        category: loc.category,
        featureTitle: loc.featureTitle,
        featureTitle_en: 'Highlights',
        featureDescription: loc.featureDescription,
        featureDescription_en: loc.featureDescription, // Simplifying
        coordinateX: loc.coordinates.x,
        coordinateY: loc.coordinates.y,
        phone: loc.phone || '',
        googleMapLink: loc.googleMapLink || ''
    }));

    try {
        const villageDoc = await client.fetch('*[_type == "village"][0]');
        if (!villageDoc) {
            console.error('Village document not found!');
            return;
        }

        await client
            .patch(villageDoc._id)
            .set({ 'map.locations': locations })
            .commit();

        console.log('Successfully migrated 12 locations to Sanity!');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

migrate();
