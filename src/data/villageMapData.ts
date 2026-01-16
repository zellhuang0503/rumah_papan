export type LocationCategory = 'food' | 'attraction' | 'temple' | 'all';
import samyImage from '../assets/images/Image_samy_bkt.jpg';
import fuhWenBktImage from '../assets/images/Image_fuh_wen_bkt.jpg';
import ahHerImage from '../assets/images/Image_ah_her_bkt.jpg';
import soonBengImage from '../assets/images/Image_soon_beng_kopitiam.jpg';
import lanchunImage from '../assets/images/Image_lanchun_old.jpg';
import caiBaoImage from '../assets/images/Image_cai_bao_chium.jpg';
import buddhaImage from '../assets/images/Image_buddha_charity.jpg';
import guanTianImage from '../assets/images/Image_guan_tian_gong.jpg';
import kwanImmImage from '../assets/images/Image_kwan_imm_temple.jpg';
import vishnuImage from '../assets/images/Image_vishnu_temple.jpg';
import rumahPapanImage from '../assets/images/Image_rumah_papan.jpg';
import nijiaIceImage from '../assets/images/Image_nijia_fried_chicken_ice.jpg';

export interface LocationItem {
    id: string;
    name: string;
    subName?: string;
    address: string;
    category: LocationCategory;
    featureTitle?: string;
    featureDescription?: string[];
    distanceInfo?: string;
    coordinates?: { x: number; y: number };
    image?: string;
}

export const MAP_PAGE_TITLE = "觀光地圖";
export const MAP_PAGE_SUBTITLE = "人氣景點";

export const villageLocations: LocationItem[] = [
    // --- Food (肉骨茶) ---
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
        image: samyImage
    },
    {
        id: 'f2',
        name: '福文肉骨茶',
        subName: 'Fuh Wen Bak Kut Teh',
        address: '158 D, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '湯頭濃郁回甘、中藥味與肉香平衡，內臟處理乾淨無異味，提供瓦煲或不鏽鋼碗裝，特別是小火慢燉保溫設計，讓湯汁與食材風味更佳。'
        ],

        coordinates: { x: 52, y: 45 },
        image: fuhWenBktImage
    },
    {
        id: 'f3',
        name: 'Ah Her 肉骨茶',
        subName: 'Ah Her Bak Kut Teh',
        address: '818, Jalan Susur Besar, Pandamaran, 42000 Port Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '是比較「濃縮型」的湯，湯不多但很稠、很濃，油飯也很香。',
            '下午／晚上營業那種，很多人專程去吃晚餐。'
        ],
        coordinates: { x: 50, y: 50 },
        image: ahHerImage
    },
    {
        id: 'f4',
        name: '新順明茶餐室',
        subName: 'Soon Beng Kopitiam - Port Klang HQ',
        address: '92, Jalan Tengku Badar, Kampung Raja Uda, 42000 Pelabuhan Klang, Selangor',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '經典家鄉麵包，那是一份純樸的味道，椰香加上半熟蛋，口感交織美味，再配上KTM,堪稱一絕。'
        ],
        coordinates: { x: 60, y: 35 },
        image: soonBengImage
    },
    {
        id: 'f5',
        name: '連春老字號',
        address: 'Kampung Sijangkang, 42000 Port Klang, Selangor',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '大推紅酒麵線，充滿酒糟香氣的麵線，份量十足，麵線軟但不爛，好吃！'
        ],
        coordinates: { x: 58, y: 38 },
        image: lanchunImage
    },
    {
        id: 'a1',
        name: '黃澄澄菜包嬸',
        subName: 'Cai Bao Chium',
        address: '250, Jalan Lai, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '在地獨有的菜包美食，跟你想像的菜包是不一樣的，鹹香味道，也包滿蔬菜，很好吃，一口接一口。'
        ],
        coordinates: { x: 45, y: 55 },
        image: caiBaoImage
    },

    // --- Temple (廟宇) ---
    {
        id: 't1',
        name: '觀天宮',
        subName: 'Kuan Tien Klang',
        address: 'Pandamaran, 42000 Port Klang, Selangor',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '位於 Jalan Kemanis 同一條路上。',
            '班村在地信仰中心之一。'
        ],
        distanceInfo: '距離班厝步行幾分鐘',
        coordinates: { x: 70, y: 30 },
        image: guanTianImage
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
        coordinates: { x: 75, y: 25 },
        image: kwanImmImage
    },
    {
        id: 't3',
        name: '巴生毗濕奴廟宇',
        subName: 'Sri Sundararaja Perumal',
        address: '80, Jalan Mastika, off Persiaran Raja Muda Musa, 41100 Klang, Selangor',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '主祀毗濕奴的印度教聖地，以融合在地文化的高聳尖塔與《羅摩衍那》浮雕，展現宗教與藝術的完美結合。'
        ],
        coordinates: { x: 80, y: 28 },
        image: vishnuImage
    },

    // --- Attraction (景點) - Includes About/Story/Other spots ---
    {
        id: 'm1',
        name: 'Rumah Papan',
        subName: '班厝故事館',
        address: 'Pandamaran, Port Klang',
        category: 'attraction',
        featureTitle: '特色',
        featureDescription: [
            '位於巴生班達馬蘭新村的「班厝」，是一座承載著在地記憶與庶民文化的故事館。透過展覽、導覽與社區活動，帶領訪客深入了解這個全馬第二大新村的發展歷史，感受淳樸的在地鄰里情感。'
        ],
        coordinates: { x: 30, y: 70 },
        image: rumahPapanImage
    },
    {
        id: 's1',
        name: '蓮花清人寺\n佛祖慈善院',
        address: 'Selangor, Port Klang, Jalan Kemanis, Pandamaran, 42000',
        category: 'attraction',
        featureTitle: '特色',
        featureDescription: [
            '班村必訪地標！ 這裡不僅有全馬最宏偉的漢白玉佛祖像，更是結合慈善與觀光的聖地。從免費供餐、關懷弱勢到心靈修行，為遊客提供豐富的文化體驗。'
        ],
        coordinates: { x: 35, y: 75 },
        image: buddhaImage
    },
    {
        id: 'a2',
        name: '你家炸雞搖搖冰',
        address: 'Jalan Young, Pandamaran, 42000 Pelabuhan Klang, Selangor',
        category: 'attraction',
        featureTitle: '特色',
        featureDescription: [
            '搖搖冰口感綿密細緻、入口即化，消暑解渴，通常與香脆的炸雞、燒雞搭配享用，形成絕佳風味。'
        ],
        coordinates: { x: 20, y: 80 },
        image: nijiaIceImage
    }
];

