export type LocationCategory = 'food' | 'attraction' | 'temple';

export interface LocationItem {
    id: string;
    name: string;
    description: string;
    address: string;
    category: LocationCategory;
    coordinates?: { x: number; y: number }; // Percentage 0-100 for map placement
}

export const villageLocations: LocationItem[] = [
    // --- Food (肉骨茶) ---
    {
        id: 'f1',
        name: '三美肉骨茶',
        description: 'Restoran Samy Bak Kut Teh [HQ]',
        address: '164A, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'food'
    },
    {
        id: 'f2',
        name: '155 肉骨茶',
        description: '155 Bak Kut Teh',
        address: '155, Jalan Chan Ah Choo, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'food'
    },
    {
        id: 'f3',
        name: 'Ah Her 肉骨茶 (亞火肉骨茶)',
        description: 'Ah Her Bak Kut Teh',
        address: '818, Jalan Susur Besar, Pandamaran, 42000 Port Klang, Selangor, Malaysia',
        category: 'food'
    },
    {
        id: 'f4',
        name: 'Choon Guan Hainan Coffee 1956 之類的海南茶室',
        description: '1956 Hainan Coffee',
        address: '5, Jalan Stesan, Kawasan 1, 41000 Klang, Selangor, Malaysia',
        category: 'food'
    },
    {
        id: 'f5',
        name: 'Peng Heong Hakka Paikut 平香客家排骨飯店',
        description: 'Peng Heong Hakka Paikut',
        address: 'No. 2, Lorong Gudang Nanas 1, Kawasan 18, 41400 Klang, Selangor, Malaysia',
        category: 'food'
    },

    // --- Temples (廟宇) ---
    {
        id: 't1',
        name: '觀天宮',
        description: 'Jalan Kemaris, Kawasan Tiga',
        address: 'Pandamaran N/V, 42000 Port Klang, Selangor, Malaysia',
        category: 'temple'
    },
    {
        id: 't2',
        name: '興都廟',
        description: 'No. 80, Jalan Mastika, off Persiaran',
        address: 'Raja Muda Musa, 41100 Klang, Selangor, Malaysia',
        category: 'temple'
    },
    {
        id: 't3',
        name: 'Sri Thenday Yuttha Pani Temple',
        description: 'Sri Nagara Thandayuthapani Temple',
        address: 'No. 2, Jalan Bukit Jawa, 41000 Klang, Selangor, Malaysia',
        category: 'temple'
    },

    // --- Attractions (景點) ---
    {
        id: 'a1',
        name: '你家炸鸡',
        description: 'Nijia Fried Chicken (Main Branch)',
        address: '1503 B, Jalan Young, Pandamaran, 42000 Pelabuhan Klang, Selangor, Malaysia',
        category: 'attraction'
    },
    {
        id: 'a2',
        name: '巨盟批发城',
        description: 'GM Klang Wholesale City',
        address: 'Jalan Kasuarina 1, Bandar Botanic Capital, 41200 Klang, Selangor, Malaysia',
        category: 'attraction'
    }
];
