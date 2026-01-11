export type LocationCategory = 'food' | 'attraction' | 'temple';

export interface LocationItem {
    id: string;
    name: string;
    subName?: string; // e.g., English name or secondary title
    address: string;
    category: LocationCategory;
    featureTitle?: string; // "特色"
    featureDescription?: string[]; // Array of paragraphs for features
    distanceInfo?: string; // "距離班厝..."
    coordinates?: { x: number; y: number };
}

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
        distanceInfo: '距離班厝：同在 Pandamaran，開車大概 5 分鐘左右（Jalan Kemanis 出去轉去 Jalan Chan Ah Choo 那一帶）。'
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
        distanceInfo: '距離班厝：同一條 BKT 街上，跟三美在同一區域，從班厝過去一樣是幾分鐘車程。'
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
        ]
    },
    {
        id: 'f4',
        name: '海南茶室 1956', // Shortened for display, full name in desc if needed
        subName: 'Choon Guan Hainan Coffee 1956',
        address: '5, Jalan Stesen, Kawasan 1, 41000 Klang, Selangor, Malaysia',
        category: 'food',
        featureTitle: '特色',
        featureDescription: [
            '招牌：海南咖啡、半熟蛋、烤麵包、麵線、咖哩麵、椰漿飯等。',
            '很適合寫在「來班厝前／後去哪裡吃早餐」的推薦裡。'
        ]
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
        ]
    },

    // --- Temples (廟宇) ---
    {
        id: 't1',
        name: '觀天宮',
        address: 'Jalan Kemanis, Kawasan Tiga, Pandamaran N/V, 42000 Port Klang, Selangor, Malaysia',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '位於 Jalan Kemanis 同一條路上。'
        ],
        distanceInfo: '距離班厝步行幾分鐘'
    },
    {
        id: 't2',
        name: '興都廟',
        address: 'No. 80, Jalan Mastika, off Persiaran Raja Muda Musa, 41100 Klang, Selangor, Malaysia',
        category: 'temple',
        featureTitle: '特色',
        featureDescription: [
            '巴生毗濕奴廟宇'
        ]
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
        ]
    },

    // --- Attractions (景點) ---
    {
        id: 'a1',
        name: '你家炸鸡',
        subName: 'Nijia Fried Chicken (Main Branch)',
        address: '1503 B, Jalan Young, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'attraction',
        featureTitle: '特色',
        featureDescription: [
            '总行／Pandamaran 总店'
        ]
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
        ]
    }
];
