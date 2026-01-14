export type StoryCategory = 'all' | 'history' | 'about' | 'exchange' | 'food';

export interface StoryItem {
    id: string;
    category: StoryCategory;
    title: string;
    description: string;
    imageUrl?: string; // Restored for backward compatibility
    images: string[];
    tags: string[];
    variant: 'banner' | 'standard' | 'text-overlay' | 'text-highlight' | 'compact';
    size: 'full' | 'large' | 'medium' | 'small';
}

export const STORY_CATEGORIES: { id: StoryCategory; label: string }[] = [
    { id: 'all', label: '全部' },
    { id: 'history', label: '班達馬蘭新村史' },
    { id: 'about', label: '關於班厝' },
    { id: 'exchange', label: '故事交換' },
    { id: 'food', label: '肉骨茶' },
];

export const stories: StoryItem[] = [
    // --- History Category ---
    // 1. Banner (1260px)
    {
        id: '1',
        category: 'history',
        title: '巴生最大，全馬傳奇：班達馬蘭',
        description: '班達馬蘭新村（班村），成立於 1951 年，前身是「巴生港口新村」，1953 年改名為 Kampung Baru Pandamaran，作為巴生最大華人新村，班達馬蘭不只佔地廣闊，更承載著全馬數一數二的福建人口密度與文化信仰。',
        imageUrl: 'https://placehold.co/1255x836',
        images: ['https://placehold.co/1255x836', 'https://placehold.co/1255x836/orange/white', 'https://placehold.co/1255x836/black/white'],
        tags: ['#班達馬蘭新村史'],
        variant: 'banner',
        size: 'full'
    },
    // Row: Highlight(514) + Overlay(408) + Compact(288) = 1210 + 48gap = 1258
    // 2. Highlight
    {
        id: '2',
        category: 'history',
        title: '從一棵樹，\n到一座華人新村',
        description: 'Pandamaran 一名來自達馬樹 Pokok Damar。樹脂早年被用來造船黏合、上色，也有人靠採集樹脂維生，被稱「Pendamar」。這個職業，最後留下了今天這個村名。\n如今，這裡已是全馬最知名的「福建華人新村」。滿街鄉音下坐落著五十多間神廟，更有「早餐肉骨茶，晚餐吃海鮮」的飲食儀式。從信仰香火到濃郁藥材香，班達馬蘭的每一天，都充滿了熱鬧滾燙的煙火氣。',
        images: [],
        tags: ['#班達馬蘭新村史'],
        variant: 'text-highlight',
        size: 'medium' // Visually Large block
    },
    // 3. Overlay
    {
        id: '3',
        category: 'history',
        title: '自 1951 年以來\n70+ 年新村歲月',
        description: '從落地紮根、搭起板屋，到今天安居樂業，班達馬蘭新村陪著好幾代人長大。透過故事館裡的老照片、口述訪談與展覽，這七十多年的生活軌跡，被重新整理成一個讓下一代看得見、讀得懂的新村歷史。',
        images: [],
        tags: ['#班達馬蘭新村史'],
        variant: 'text-overlay',
        size: 'medium'
    },
    // 4. Compact
    {
        id: '4',
        category: 'history',
        title: '盛滿好運的地標',
        description: '雞公碗，成了班達馬蘭對每一位訪客的招呼方式。',
        images: [],
        tags: ['#班達馬蘭新村史'],
        variant: 'compact',
        size: 'small'
    },
    // 5. Standard Full (1260px)
    {
        id: '5',
        category: 'history',
        title: '班達馬蘭的新村日常',
        description: '無論是早市此起彼落的叫賣聲、夜晚圓桌上的家常飯香，還是天公誕繚繞的虔誠香火。這裡的每一幀畫面都沒有彩排，而是班達馬蘭最真實、最滾燙的日常風景。',
        imageUrl: 'https://placehold.co/1307x852',
        images: ['https://placehold.co/1307x852', 'https://placehold.co/1307x852/333/fff'],
        tags: [],
        variant: 'standard',
        size: 'full' // FORCE FULL WIDTH
    },

    // --- About Category ---
    // 6. Highlight
    {
        id: '6',
        category: 'about',
        title: '班厝：是也是所有人的家',
        description: '「班厝」福建話唸作 Bān Chǔ，與「板屋」諧音，道出這棟坐落於全馬最大福建新村老屋的靈魂。\n作為首家故事館，屋外是自家果園，屋內結合私房菜、技能換宿與在地選品。無論是走讀導覽、體驗工作坊或租借場地，這裡都是開放給所有人的客廳。\n班厝是班達馬蘭的家，也是你的家，記得常回來坐坐。',
        images: [],
        tags: ['#關於班厝'],
        variant: 'text-highlight',
        size: 'large'
    },
    // 7. Overlay
    {
        id: '7',
        category: 'about',
        title: '由班村人為班村人開的館\n100% 在地自家故事館',
        description: '班厝由土生土長的周鴻輝與陳美雲創辦，聯合厝邊志工和 Jalan-jalan Klang 導覽隊，一起整理老照片、訪問長輩、策劃展覽，讓這條新村的記憶不只留在嘴邊，而是有一間隨時可以回來的老厝。',
        images: [],
        tags: ['#關於班厝'],
        variant: 'text-overlay',
        size: 'medium'
    },
    // 8. Compact
    {
        id: '8',
        category: 'about',
        title: '從一句「呷飽未？」開始',
        description: '在班厝，故事和飯菜，都是招呼你的方式。',
        images: [],
        tags: ['#關於班厝'],
        variant: 'compact',
        size: 'small'
    },
    // 9. Standard Full (1260px)
    {
        id: '9',
        category: 'about',
        title: '帶著未知而來，裝滿故事而歸',
        description: '不同國家、不同背景的人，在班厝一起生活、一起學習。輪播的每張照片，都是換宿者在這裡被安放、被陪伴，也悄悄長出變化的那一刻。',
        imageUrl: 'https://placehold.co/1307x852',
        images: ['https://placehold.co/1307x852'],
        tags: [],
        variant: 'standard',
        size: 'full' // FORCE FULL WIDTH
    },
    // Row 2: Highlight + Overlay + Compact (New Items)
    // 15. Highlight
    {
        id: '15',
        category: 'about',
        title: '回家的路，\n永遠有一盞燈',
        description: '不管你在外面闖蕩了多久，班厝永遠為你留一扇門。這裡不只是展覽館，更是凝聚遊子心意的歸屬地。',
        images: [],
        tags: ['#關於班厝'],
        variant: 'text-highlight',
        size: 'medium'
    },
    // 15b. [Added] Overlay
    {
        id: '15b',
        category: 'about',
        title: '老屋裡的時光機',
        description: '踏進這裡，彷彿回到阿公阿嬤的年代。舊唱片、老針車、還有空氣中淡淡的木頭香，都是時光留下的禮物。',
        images: [],
        tags: ['#關於班厝'],
        variant: 'text-overlay',
        size: 'medium'
    },
    // 15c. [Added] Compact
    {
        id: '15c',
        category: 'about',
        title: '在這裡，慢下來',
        description: '把手錶收起來，跟著日落的節奏生活。',
        images: [],
        tags: ['#關於班厝'],
        variant: 'compact',
        size: 'small'
    },

    // --- Exchange Category ---
    // 10. Banner (1260px)
    {
        id: '10',
        category: 'exchange',
        title: '班厝故事館：\n班達馬蘭的新村客廳',
        description: '班厝坐落在班達馬蘭新村，是村裡第一家故事館。以一棟老木板屋為基地，收集生活物件、照片和口述歷史，讓每一位走進來的人，都能在最日常的場景裡，聽見這座新村的故事。',
        imageUrl: 'https://placehold.co/1255x836',
        images: ['https://placehold.co/1255x836', 'https://placehold.co/1255x836/222/eee'],
        tags: ['#關於班厝'],
        variant: 'banner',
        size: 'full'
    },

    // Row 1: Overlay(408) + Highlight(514) + Compact(288) = Row
    // 16. Overlay
    {
        id: '16',
        category: 'exchange',
        title: '用技能交換\n一段新村時光',
        description: '你會攝影？會木工？還是擅長煮飯？帶著你的專長來班厝，換取免費住宿，也換取在地人最真實的人情味。',
        images: [],
        tags: ['#故事交換'],
        variant: 'text-overlay',
        size: 'medium'
    },
    // 16b. [Added] Highlight - to fill the gap
    {
        id: '16b',
        category: 'exchange',
        title: '不只是過客，\n而是歸人',
        description: '在班厝換宿的日子，沒有打卡鐘，只有鄰居的問候和煮飯的炊煙。你不再是匆匆路過的觀光客，而是暫時生活在這裡的班村人。',
        images: [],
        tags: ['#故事交換'],
        variant: 'text-highlight',
        size: 'large'
    },
    // 17. Compact
    {
        id: '17',
        category: 'exchange',
        title: '板屋下的夜話',
        description: '晚上洗完澡，大夥兒坐在廊下吹風、彈吉他。',
        images: [],
        tags: ['#故事交換'],
        variant: 'compact',
        size: 'small'
    },

    // 18. Standard Full (1260px)
    {
        id: '18',
        category: 'exchange',
        title: '志工生活日記',
        description: '從除草到導覽，從怕生到熟稔。每一位志工的日記裡，都寫滿了關於成長的秘密。',
        imageUrl: 'https://placehold.co/1255x836',
        images: ['https://placehold.co/1255x836'],
        tags: ['#故事交換'],
        variant: 'standard',
        size: 'full' // FORCE FULL WIDTH
    },
    {
        id: '11',
        category: 'exchange',
        title: '在這裡，找回生活的實感',
        description: '來時只想休息，走時變得捨不得。',
        images: [],
        tags: ['#故事交換'],
        variant: 'compact',
        size: 'small'
    },
    {
        id: '11b',
        category: 'exchange',
        title: '交換的不只是故事',
        description: '留下一張照片，帶走一段回憶；留下一道食譜，帶走一份友誼。故事交換，是班厝最美的風景。',
        images: [],
        tags: ['#故事交換'],
        variant: 'text-highlight',
        size: 'large'
    },
    {
        id: '11c',
        category: 'exchange',
        title: '下一站，\n還是班達馬蘭',
        description: '很多換宿者離開後，又帶著朋友回來。因為這裡有他們種過的花、漆過的牆，還有那個像家一樣的角落。',
        images: [],
        tags: ['#故事交換'],
        variant: 'text-overlay',
        size: 'medium'
    },

    // --- Food Category ---
    {
        id: '12',
        category: 'food',
        title: '一桌肉骨茶，一整條新村的故事',
        description: '有人剛下夜班補一鍋，有人帶著家人慢慢吃。輪播的每張照片，都在告訴你：肉骨茶不只是料理，也是班達馬蘭人一起過日子的方式。',
        imageUrl: 'https://placehold.co/1307x852',
        images: ['https://placehold.co/1307x852'],
        tags: [],
        variant: 'standard',
        size: 'large' // Keep as 940px standard
    },
    // 13. Compact - Pairs with 12
    {
        id: '13',
        category: 'food',
        title: '「呷肉骨茶未？」',
        description: '在這裡，這句話就是最日常的早安問候。\n（點擊後切換成肉骨茶特寫）',
        images: [],
        tags: ['#肉骨茶'],
        variant: 'compact',
        size: 'small'
    },
    // 14. Overlay
    {
        id: '14',
        category: 'food',
        title: '班村的早餐地圖\n20+ 間肉骨茶與老店',
        description: '從椰腳 Jalan Young 一路數下去，遍布肉骨茶與老牌小吃店。班厝會把在地人愛去的口袋名單納在地圖上。',
        images: [],
        tags: ['#肉骨茶'],
        variant: 'text-overlay',
        size: 'medium'
    },
    // 19. Highlight
    {
        id: '19',
        category: 'food',
        title: '肉骨茶的起源：\n苦力們的補氣湯',
        description: '早期在港口搬運貨物的苦力，需要高熱量與藥材來補身。這碗湯，見證了巴生港口的興衰起落。',
        images: [],
        tags: ['#肉骨茶'],
        variant: 'text-highlight',
        size: 'medium'
    },
    // 20. Compact
    {
        id: '20',
        category: 'food',
        title: '巷弄裡的隱藏美味',
        description: '除了肉骨茶，這裡還有手工包、海鮮粥、炸糕... 跟著在地人鑽進巷弄，發現觀光客不知道的好味道。',
        images: [],
        tags: ['#肉骨茶'],
        variant: 'compact',
        size: 'small'
    }
];
