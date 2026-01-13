
// Home Page Data

const HERO_DATA_ZH = {
    title: "一間為新村存放記憶的厝",
    description: "班厝是一間收集故事的厝，牆上是老照片，桌上是新朋友，讓一條班達馬蘭新村的記憶持續被看見。",
    cta: "往下看更多",
    bubbles: [
        { id: 1, title: "關於班厝", path: "/about", color: "bg-red-500", top: "72px", left: "97.31px", width: "w-5" },
        { id: 2, title: "一起過節好嗎？", path: "/festival", color: "bg-red-500", top: "72px", left: "141.31px", width: "w-6" },
        { id: 3, title: "來碗班達馬蘭肉骨茶", path: "/food", color: "bg-red-500", top: "72px", left: "170.31px", width: "w-5" },
        { id: 4, title: "想不想用走的認識新村？", path: "/walk", color: "bg-red-500", top: "72px", left: "199.31px", width: "w-6" },
        { id: 5, title: "下個來交換故事的人會是你嗎？", path: "/exchange", color: "bg-red-500", top: "72px", left: "242.31px", width: "w-6" },
        { id: 6, title: "永續生活", path: "/sustainability", color: "bg-red-500", top: "72px", left: "97.31px", width: "w-5" },
        { id: 7, title: "技能換宿", path: "/work-swap", color: "bg-red-500", top: "72px", left: "97.31px", width: "w-5" },
    ]
};

const HERO_CONTENT_MAP_ZH = {
    about: { title: "一間為新村存放記憶的厝", body: "班厝是一間收集故事的厝，牆上是老照片，桌上是新朋友，讓一條班達馬蘭新村的記憶持續被看見。" },
    bkt: { title: "來碗班達馬蘭肉骨茶", body: "在班達馬蘭新村，清晨不是咖啡香，而是一鍋熱騰騰的肉骨茶，陪你慢慢開始一天的新村步調。" },
    walk: { title: "用腳一步一步讀完班達馬蘭", body: "跟著導覽在巷口轉彎，廟前停下，聽人把班達馬蘭的過去現在，慢慢說成你聽得懂的故事。" },
    sustainability: { title: "把永續活在每天的小事裡", body: "班厝，永續不是口號，而是一起把廚餘變養分、果皮變酵素、菜園當作共同的責任。" },
    exchange: { title: "來班厝，換一個故事回去", body: "有人帶著旅程來，有人帶著生活來，在班厝，每次聊天都多一個人，記得這條班達馬蘭新村。" },
    festivals: { title: "一起過節好嗎？", body: "設香案、掛燈籠、桌椅排滿街；在班達馬蘭新村，過節就是整條街一起動起來，你來就多一副筷子。" },
    stay: { title: "技能換宿", body: "有人幫忙除草澆花，有人拿相機記錄；你把時間和專長留在這裡，新村就慢慢把你當自己人。" }
};

const HERO_CONTENT_MAP_EN = {
    about: { title: "A House that Keeps Memories for the Village", body: "Rumah Papan is a place that collects stories. Old photos on the walls, new friends on the tables—keeping the memories of Pandamaran New Village visible." },
    bkt: { title: "Have a Bowl of Pandamaran Bak Kut Teh", body: "In Pandamaran New Village, the morning isn't about the smell of coffee, but a pot of steaming Bak Kut Teh, accompanying you to slowly start the village pace." },
    walk: { title: "Read Pandamaran Step by Step", body: "Follow the guide to turn at the alley, stop in front of the temple, and listen to people slowly tell the past and present of Pandamaran into stories you can understand." },
    sustainability: { title: "Living Sustainability in Daily Small Things", body: "At Rumah Papan, sustainability is not a slogan, but a shared responsibility to turn food waste into nutrients, fruit peels into enzymes, and the vegetable garden into a common duty." },
    exchange: { title: "Come to Rumah Papan, Exchange a Story", body: "Some come with a journey, some come with life. At Rumah Papan, every chat adds one more person who remembers this Pandamaran New Village." },
    festivals: { title: "Shall We Celebrate Together?", body: "Setting up incense tables, hanging lanterns, tables and chairs filling the streets; in Pandamaran New Village, celebrating means the whole street moves together, and you are just one pair of chopsticks away." },
    stay: { title: "Work Swap", body: "Some help with weeding and watering, some record with cameras; you leave your time and expertise here, and the village slowly treats you as one of its own." }
};

export const getHeroContentMap = (lang: 'zh' | 'en') => lang === 'zh' ? HERO_CONTENT_MAP_ZH : HERO_CONTENT_MAP_EN;

const HERO_DATA_EN = {
    title: "A House that Keeps Memories for the Village",
    description: "Rumah Papan is a place that collects stories. Old photos on the walls, new friends on the tables—keeping the memories of Pandamaran New Village visible.",
    cta: "Learn More",
    bubbles: [
        { id: 1, title: "About Us", path: "/about", color: "bg-red-500", top: "72px", left: "97.31px", width: "w-5" },
        { id: 2, title: "Festivals", path: "/festival", color: "bg-red-500", top: "72px", left: "141.31px", width: "w-6" },
        { id: 3, title: "Bak Kut Teh", path: "/food", color: "bg-red-500", top: "72px", left: "170.31px", width: "w-5" },
        { id: 4, title: "Village Walk", path: "/walk", color: "bg-red-500", top: "72px", left: "199.31px", width: "w-6" },
        { id: 5, title: "Story Exchange", path: "/exchange", color: "bg-red-500", top: "72px", left: "242.31px", width: "w-6" },
        { id: 6, title: "Sustainability", path: "/sustainability", color: "bg-red-500", top: "72px", left: "97.31px", width: "w-5" },
        { id: 7, title: "Work Swap", path: "/work-swap", color: "bg-red-500", top: "72px", left: "97.31px", width: "w-5" },
    ]
};

export const getHeroData = (lang: 'zh' | 'en') => lang === 'zh' ? HERO_DATA_ZH : HERO_DATA_EN;
// For backward compatibility during migration
export const HERO_DATA = HERO_DATA_ZH;

const FEATURES_DATA_ZH = [
    { title: "新村導覽", subtitle: "rumah papan", path: "/services/tour" },
    { title: "住宿體驗", subtitle: "rumah papan", path: "/services/stay" },
    { title: "技能換宿", subtitle: "rumah papan", path: "/services/work-swap" }
];

const FEATURES_DATA_EN = [
    { title: "Village Tour", subtitle: "rumah papan", path: "/services/tour" },
    { title: "Home Stay", subtitle: "rumah papan", path: "/services/stay" },
    { title: "Work Swap", subtitle: "rumah papan", path: "/services/work-swap" }
];

export const getFeaturesData = (lang: 'zh' | 'en') => lang === 'zh' ? FEATURES_DATA_ZH : FEATURES_DATA_EN;
// For backward compatibility
export const FEATURES_DATA = FEATURES_DATA_ZH;

export const TESTIMONIALS_DATA = [
    {
        name: "Lai Sook Yin",
        content: "很用心守護新村與文化的地方，介紹歷史又常辦活動，來這裡走走，很快就會喜歡上班厝。"
    },
    {
        name: "Alexis",
        content: "身為外地人，也能透過導覽深入理解新村的歷史變化與在地文化，非常推薦給想認識大馬的旅人。"
    },
    {
        name: "麗冰",
        content: "三年前來時一切剛起步，綠意盎然、人情更濃，重遊班厝像回家，感受到創辦人默默守護文化。"
    },
    {
        name: "Jiing Min Wah",
        content: "幼兒園畢旅安排來班厝，孩子玩得開心又學到許多故事，回家一直和家長分享，很感謝導覽的用心。"
    },
    {
        name: "Han Ching",
        content: "原本毫無期待，卻被熱情的館主與長談驚喜收服，不知不覺待很久，班厝成為此行最難忘的一站。"
    },
    {
        name: "Jenny Tan",
        content: "在懷舊的新村氣氛裡，重新看見家鄉，也和不同背景的朋友開心交流，是一場重新認識自己的旅行。"
    }
];

export const NEWS_DATA = [
    {
        date: "2025.12.02",
        isNew: true,
        title: "《新村玩＋》市集進駐班達馬蘭！兩天逛遍雪州77個新村故事",
        path: "/news/1"
    },
    {
        date: "2025.12.01",
        isNew: true,
        title: "走進馬來西亞最大福建新村：12/6 免費走村導覽",
        path: "/news/2"
    },
    {
        date: "2025.11.21",
        isNew: true,
        title: "新村 Long Gai 去！帶著紙箱布料一起出門 YouKui 啦！",
        path: "/news/3"
    },
    {
        date: "2025.11.06",
        isNew: true,
        title: "住進故事裡的新村：2天1夜班厝旅宿體驗",
        path: "/news/4"
    }
];

const INTRO_SLIDES_ZH = [
    { title: "雞公碗", desc: "馬來西亞最大的華人新村入口，用一碗白飯和雞公碗，向每個來訪的人打招呼。" },
    { title: "拜天公", desc: "神壇、供品和煙火，把幾代福建人對天公與祖先的心意都放在這一夜。" },
    { title: "班厝故事館", desc: "故事館裡收著新村記憶、展覽與飯桌，每次推門，都是班達馬蘭的新一頁。" },
    { title: "班達馬蘭新村街景", desc: "海鮮店、肉骨茶與老招牌，把班達馬蘭最日常的生活節奏排成街景。" },
    { title: "技能換宿", desc: "帶著專長來幫忙，新村用飯桌、人情和故事，換給你一段住在這裡的日常。" },
    { title: "新村市集", desc: "一攤攤新村美食與手作，把人情味和好味道一起打包，讓你帶回家。" },
    { title: "漢白玉佛祖像", desc: "全馬最大漢白玉佛像立在蓮花清人寺，成了班達馬蘭最安定的祝福地標。" },
];

const INTRO_SLIDES_EN = [
    { title: "Rooster Bowl", desc: "The entrance to Malaysia's largest Chinese new village greets every visitor with a bowl of rice and a rooster bowl." },
    { title: "Praying to the Jade Emperor", desc: "Altars, offerings, and fireworks—placing the devotion of generations of Hokkien people to the Jade Emperor and ancestors into this one night." },
    { title: "Rumah Papan Story House", desc: "The story house collects village memories, exhibitions, and a dining table. Every time you push the door open, it's a new page of Pandamaran." },
    { title: "Pandamaran Village Street View", desc: "Seafood shops, Bak Kut Teh, and old signboards arrange the most daily rhythm of Pandamaran into a street view." },
    { title: "Work Swap", desc: "Bring your skills to help. The village trades a dining table, human warmth, and stories for a daily life lived here." },
    { title: "Village Market", desc: "Stalls of village food and handmade goods, packing up the human touch and good taste for you to take home." },
    { title: "White Jade Buddha Statue", desc: "The largest white jade Buddha statue in Malaysia stands at the Lotus Ching Ren Temple, becoming the most stable blessing landmark in Pandamaran." },
];

export const getIntroSlides = (lang: 'zh' | 'en') => lang === 'zh' ? INTRO_SLIDES_ZH : INTRO_SLIDES_EN;
export const INTRO_SLIDES = INTRO_SLIDES_ZH;

export const FOOTER_DATA = {
    title: "班厝故事館",
    subtitle: "RUMAH PAPAN",
    description: "在班達馬蘭新村，收集故事和人情的一間厝。",
    contact: {
        region: "Malaysia Selangor Klang",
        phone: "+60 16-219 8920",
        email: "rumahpapanklang@gmail.com",
        address: "124, Jalan Kemanis, 42000 Pelabuhan Klang, Klang, Malaysia, 42000"
    },
    socials: [
        { id: 'facebook', url: '#', icon: 'fi fi-brands-facebook' },
        { id: 'instagram', url: '#', icon: 'fi fi-brands-instagram' },
        { id: 'whatsapp', url: '#', icon: 'fi fi-brands-whatsapp' }
    ]
};
