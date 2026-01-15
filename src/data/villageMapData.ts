
export type LocationCategory = 'food' | 'attraction' | 'temple' | 'all';

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
}

export const MAP_PAGE_TITLE_ZH = "觀光地圖";
export const MAP_PAGE_SUBTITLE_ZH = "人氣景點";

export const MAP_PAGE_TITLE_EN = "Tourist Map";
export const MAP_PAGE_SUBTITLE_EN = "Popular Spots";

export const getMapPageTitle = (lang: 'zh' | 'en') => lang === 'zh' ? MAP_PAGE_TITLE_ZH : MAP_PAGE_TITLE_EN;
export const getMapPageSubtitle = (lang: 'zh' | 'en') => lang === 'zh' ? MAP_PAGE_SUBTITLE_ZH : MAP_PAGE_SUBTITLE_EN;

// Backward compatibility
export const MAP_PAGE_TITLE = MAP_PAGE_TITLE_ZH;
export const MAP_PAGE_SUBTITLE = MAP_PAGE_SUBTITLE_ZH;

const VILLAGE_LOCATIONS_ZH: LocationItem[] = [
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
        coordinates: { x: 55, y: 40 }
    },
    {
        id: 'f2',
        name: '155 肉骨茶',
        subName: '155 Bak Kut Teh',
        address: '155, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '有湯的也有乾的，味道偏厚、藥材感比較重一點。',
            '很多人說湯很「有 punch」，肉也燉到很嫩。'
        ],
        distanceInfo: '距離班厝：同一條 BKT 街上，跟三美在同一區域。',
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
            '是比較「濃縮型」的湯，湯不多但很稠、很濃，油飯也很香。',
            '下午／晚上營業那種，很多人專程去吃晚餐。'
        ],
        coordinates: { x: 50, y: 50 }
    },
    {
        id: 'f4',
        name: '海南茶室 1956',
        subName: 'Choon Guan Hainan Coffee 1956',
        address: '5, Jalan Stesen, Kawasan 1, 41000 Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '招牌：海南咖啡、半熟蛋、烤麵包、麵線、咖哩麵、椰漿飯等。',
            '很適合寫在「來班厝前／後去哪裡吃早餐」的推薦裡。'
        ],
        coordinates: { x: 60, y: 35 }
    },
    {
        id: 'f5',
        name: '平香客家排骨飯店',
        subName: 'Peng Heong Hakka Paikut',
        address: 'No. 2, Lorong Gudang Nanas 1, Kawasan 18, 41400 Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '不是肉骨茶，是客家熱炒餐館。',
            '招牌：排骨王、亞參魚、咖哩羊、豬腳、鹹菜煲等'
        ],
        coordinates: { x: 58, y: 38 }
    },
    {
        id: 'a1',
        name: '你家炸鸡',
        subName: 'Nijia Fried Chicken (Main Branch)',
        address: '1503 B, Jalan Young, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '总行／Pandamaran 总店'
        ],
        coordinates: { x: 45, y: 55 }
    },

    // --- Temple (廟宇) ---
    {
        id: 't1',
        name: '觀天宮',
        address: 'Jalan Kemanis, Kawasan Tiga, Pandamaran N/V, 42000 Port Klang, Selangor, Malaysia',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '位於 Jalan Kemanis 同一條路上。'
        ],
        distanceInfo: '距離班厝步行幾分鐘',
        coordinates: { x: 70, y: 30 }
    },
    {
        id: 't2',
        name: '興都廟',
        address: 'No. 80, Jalan Mastika, off Persiaran Raja Muda Musa, 41100 Klang, Selangor, Malaysia',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '巴生毗濕奴廟宇'
        ],
        coordinates: { x: 75, y: 25 }
    },
    {
        id: 't3',
        name: 'Sri Thenday Yuttha Pani',
        subName: 'Sri Nagara Thandayuthapani Temple',
        address: 'No. 2, Jalan Bukit Jawa, 41000 Klang, Selangor, Malaysia',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '斯里 Nagara Thandayuthapani 興都廟'
        ],
        coordinates: { x: 80, y: 28 }
    },

    // --- Attraction (景點) - Includes About/Story/Other spots ---
    {
        id: 'ab1',
        name: 'Rumah Papan',
        subName: '班厝',
        address: 'Pandamaran, Port Klang',
        category: 'attraction',
        featureTitle: '特色',
        featureDescription: [
            '我們所在的板屋，是一間收集故事的厝。'
        ],
        coordinates: { x: 30, y: 70 }
    },
    {
        id: 's1',
        name: '故事交換點 A',
        address: 'Pandamaran Village',
        category: 'attraction',
        featureTitle: '交換',
        featureDescription: [
            '在這裡交換你是這條街的故事。'
        ],
        coordinates: { x: 35, y: 75 }
    },
    {
        id: 'a2',
        name: '巨盟批发城',
        subName: 'GM Klang Wholesale City',
        address: 'Jalan Kasuarina 1, Bandar Botanik Capital, 41200 Klang, Selangor, Malaysia',
        category: 'attraction',
        featureTitle: '特色',
        featureDescription: [
            'GM Klang Wholesale City'
        ],
        coordinates: { x: 20, y: 80 }
    }
];

const VILLAGE_LOCATIONS_EN: LocationItem[] = [
    // --- Food (肉骨茶) ---
    {
        id: 'f1',
        name: 'Restoran Samy Bak Kut Teh',
        subName: 'HQ',
        address: '164A, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: 'Highlights',
        featureDescription: [
            'Loved by locals, often packed in the morning.',
            'Succulent salty soup with mild herbal sweetness, not too heavy.'
        ],
        distanceInfo: 'Distance: 5 mins drive within Pandamaran.',
        coordinates: { x: 55, y: 40 }
    },
    {
        id: 'f2',
        name: '155 Bak Kut Teh',
        subName: '155 Bak Kut Teh',
        address: '155, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: 'Highlights',
        featureDescription: [
            'Offers both dry and soup versions. Thicker taste, stronger herbal aroma.',
            'Punchy soup, tender meet.'
        ],
        distanceInfo: 'Distance: Same street as Samy.',
        coordinates: { x: 52, y: 45 }
    },
    {
        id: 'f3',
        name: 'Ah Her Bak Kut Teh',
        subName: 'Ah Her BKT',
        address: '818, Jalan Susur Besar, Pandamaran, 42000 Port Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: 'Highlights',
        featureDescription: [
            'Concentrated soup type, thick and little soup, fragrant oil rice.',
            'Evening/Night service, popular dinner spot.'
        ],
        coordinates: { x: 50, y: 50 }
    },
    {
        id: 'f4',
        name: 'Choon Guan Hainan Coffee 1956',
        subName: 'Hainan Coffee',
        address: '5, Jalan Stesen, Kawasan 1, 41000 Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: 'Highlights',
        featureDescription: [
            'Signatures: Hainan Coffee, Half-boiled egg, Toast, Mee Suah, Curry Mee, Nasi Lemak.',
            'Great breakfast spot before or after visiting Rumah Papan.'
        ],
        coordinates: { x: 60, y: 35 }
    },
    {
        id: 'f5',
        name: 'Peng Heong Hakka Paikut',
        subName: 'Hakka Stir-fry',
        address: 'No. 2, Lorong Gudang Nanas 1, Kawasan 18, 41400 Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: 'Highlights',
        featureDescription: [
            'Hakka Restaurant (Not BKT).',
            'Signatures: Spare Ribs King, Asam Fish, Curry Mutton, Pig Trotter, Salted Veg Soup.'
        ],
        coordinates: { x: 58, y: 38 }
    },
    {
        id: 'a1',
        name: 'Nijia Fried Chicken',
        subName: 'Main Branch',
        address: '1503 B, Jalan Young, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: 'Highlights',
        featureDescription: [
            'Pandamaran Main Branch'
        ],
        coordinates: { x: 45, y: 55 }
    },

    // --- Temple (廟宇) ---
    {
        id: 't1',
        name: 'Kuan Tian Gong',
        address: 'Jalan Kemanis, Kawasan Tiga, Pandamaran N/V, 42000 Port Klang, Selangor, Malaysia',
        category: 'temple',
        featureTitle: 'Highlights',
        featureDescription: [
            'Located on the same road as Jalan Kemanis.'
        ],
        distanceInfo: 'Walking distance from Rumah Papan.',
        coordinates: { x: 70, y: 30 }
    },
    {
        id: 't2',
        name: 'Hindu Temple',
        address: 'No. 80, Jalan Mastika, off Persiaran Raja Muda Musa, 41100 Klang, Selangor, Malaysia',
        category: 'temple',
        featureTitle: 'Highlights',
        featureDescription: [
            'Klang Vishnu Temple'
        ],
        coordinates: { x: 75, y: 25 }
    },
    {
        id: 't3',
        name: 'Sri Thenday Yuttha Pani',
        subName: 'Sri Nagara Thandayuthapani Temple',
        address: 'No. 2, Jalan Bukit Jawa, 41000 Klang, Selangor, Malaysia',
        category: 'temple',
        featureTitle: 'Highlights',
        featureDescription: [
            'Sri Nagara Thandayuthapani Hindu Temple'
        ],
        coordinates: { x: 80, y: 28 }
    },

    // --- Attraction (景點) - Includes About/Story/Other spots ---
    {
        id: 'ab1',
        name: 'Rumah Papan',
        subName: 'Story House',
        address: 'Pandamaran, Port Klang',
        category: 'attraction',
        featureTitle: 'Highlights',
        featureDescription: [
            'The wooden house we are in, a house collecting stories.'
        ],
        coordinates: { x: 30, y: 70 }
    },
    {
        id: 's1',
        name: 'Story Exchange Point A',
        address: 'Pandamaran Village',
        category: 'attraction',
        featureTitle: 'Exchange',
        featureDescription: [
            'Exchange your story of this street here.'
        ],
        coordinates: { x: 35, y: 75 }
    },
    {
        id: 'a2',
        name: 'GM Klang Wholesale City',
        subName: 'GM Klang',
        address: 'Jalan Kasuarina 1, Bandar Botanik Capital, 41200 Klang, Selangor, Malaysia',
        category: 'attraction',
        featureTitle: 'Highlights',
        featureDescription: [
            'GM Klang Wholesale City'
        ],
        coordinates: { x: 20, y: 80 }
    }
];

export const getVillageLocations = (lang: 'zh' | 'en') => lang === 'zh' ? VILLAGE_LOCATIONS_ZH : VILLAGE_LOCATIONS_EN;
export const villageLocations = VILLAGE_LOCATIONS_ZH;
