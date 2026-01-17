// Welcome Page Polaroid Data
// Used in src/pages/Welcome.tsx

export interface PolaroidData {
    caption: string;
    description: string;
    en?: {
        caption: string;
        description: string;
    };
}

export const WELCOME_POLAROID_DATA: PolaroidData[] = [
    {
        caption: "班厝故事館",
        description: "走進這裡像走進一個熟悉的客廳，\n讓遠方的旅人，\n也在照片與飯桌記憶裡找到回家的位置。",
        en: {
            caption: "Rumah Papan Story House",
            description: "Walking in here is like walking into a familiar living room, allowing travelers from afar to find a place of home in photos and dining table memories."
        }
    },
    {
        caption: "走進新村",
        description: "用腳一步一步讀完班達馬蘭，\n聽老街的故事、\n看華人新村的日常。",
        en: {
            caption: "Walk into New Village",
            description: "Read Pandamaran step by step with your feet, listen to stories of the old street, and see the daily life of the Chinese New Village."
        }
    },
    {
        caption: "傳統習俗",
        description: "農曆正月初九，\n跟著村裡居民一起準備供品、拜天公，\n體驗福建人最重要的傳統祭典。",
        en: {
            caption: "Traditional Customs",
            description: "On the ninth day of the Lunar New Year, prepare offerings with villagers to pray to the Jade Emperor, experiencing the most important traditional festival of the Hokkien people."
        }
    },
    {
        caption: "技能換宿",
        description: "白天幫忙打理故事館，\n夜裡在班達馬蘭星空下交換故事，\n讓班厝短暫成為你的家",
        en: {
            caption: "Skill Swap",
            description: "Help manage the story house during the day, exchange stories under the Pandamaran starry sky at night, making Rumah Papan your temporary home."
        }
    },
    {
        caption: "節慶活動",
        description: "中秋夜點燈籠、吃月餅，\n體驗新村傳統的中秋氛圍，\n感受熱鬧的人情味。",
        en: {
            caption: "Festivals",
            description: "Light lanterns and eat mooncakes on Mid-Autumn night, experience the traditional festival atmosphere of the new village, and feel the lively human warmth."
        }
    },
    {
        caption: "肉骨茶",
        description: "清晨六點，香氣是巴生最準時的鬧鐘，\n跟著白煙走，\n就能找到那碗慰藉靈魂的熱湯。",
        en: {
            caption: "Bak Kut Teh",
            description: "At 6 AM, the aroma is Klang's most punctual alarm clock. Follow the white smoke to find that bowl of hot soup that soothes the soul."
        }
    },
    {
        caption: "木鱉果",
        description: "棚架上慢慢熟成的橘紅小太陽，\n從照亮菜園，再成為餐桌上的紅寶石，\n一口嚐見班達馬蘭獨有的味道。",
        en: {
            caption: "Gac Fruit",
            description: "The orange-red little suns slowly ripening on the trellis, effectively lighting up the vegetable garden, then becoming rubies on the dining table—tasting the unique flavor of Pandamaran in one bite."
        }
    }
];
