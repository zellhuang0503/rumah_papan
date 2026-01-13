
export interface RoomItem {
    title: string;
    desc: string;
    image: string;
}

export interface NoticeItem {
    id: string;
    title: string;
    desc: string;
}

export interface StayData {
    hero: {
        title: string;
    };
    rooms: RoomItem[];
    quote: {
        title: string;
        desc: string;
    };
    booking: {
        title: string;
        button: string;
    };
    notices: NoticeItem[];
}

const STAY_DATA_ZH: StayData = {
    hero: {
        title: "來班厝住一晚"
    },
    rooms: [
        {
            title: "單人房",
            desc: "適合獨自旅行的背包客，享受安靜的閱讀時光。房間內配有舒適的單人床與閱讀燈。",
            image: "https://placehold.co/621x288?text=Single+Room"
        },
        {
            title: "雙人房",
            desc: "與伴侶或好友一同體驗村莊生活。寬敞的空間，讓你們有更多交流的機會。",
            image: "https://placehold.co/621x288?text=Double+Room"
        },
        {
            title: "家庭房",
            desc: "為家庭出遊設計，提供更寬敞的空間與親子友善設施。讓孩子在村莊中快樂成長。",
            image: "https://placehold.co/621x288?text=Family+Room"
        }
    ],
    quote: {
        title: "體驗在地生活",
        desc: "在這裡，不僅僅是住宿，更是融入當地生活的開始。\n清晨的雞啼，傍晚的炊煙，都是最真實的風景。"
    },
    booking: {
        title: "立即預訂",
        button: "Booking.com"
    },
    notices: [
        {
            id: "01",
            title: "入住時間",
            desc: "入住時間為下午 3 點以後，退房時間為上午 11 點以前。\n若需提前入住或延後退房，請提前告知。"
        },
        {
            id: "02",
            title: "環保政策",
            desc: "為響應環保，我們不主動提供一次性盥洗用品（如牙刷、牙膏）。\n請自備個人盥洗用具，一起愛護地球。"
        },
        {
            id: "03",
            title: "安靜時段",
            desc: "晚上 10 點後請降低音量，避免打擾鄰居與其他房客。\n村莊的夜晚特別寧靜，讓我們一起維護這份美好。"
        }
    ]
};

const STAY_DATA_EN: StayData = {
    hero: {
        title: "Stay at Rumah Papan"
    },
    rooms: [
        {
            title: "Single Room",
            desc: "Perfect for solo travelers enjoying quiet reading time. Equipped with a comfortable single bed and reading light.",
            image: "https://placehold.co/621x288?text=Single+Room"
        },
        {
            title: "Double Room",
            desc: "Experience village life with a partner or friend. Spacious area allowing for more interaction.",
            image: "https://placehold.co/621x288?text=Double+Room"
        },
        {
            title: "Family Room",
            desc: "Designed for family trips, offering more space and family-friendly amenities. Let children grow happily in the village.",
            image: "https://placehold.co/621x288?text=Family+Room"
        }
    ],
    quote: {
        title: "Experience Local Life",
        desc: "Here, it's not just accommodation, but the beginning of integrating into local life.\nThe morning rooster crow, the evening cooking smoke, are the most authentic sceneries."
    },
    booking: {
        title: "Book Now",
        button: "Booking.com"
    },
    notices: [
        {
            id: "01",
            title: "Check-in Time",
            desc: "Check-in is after 3 PM, check-out is before 11 AM.\nPlease inform us in advance if you need early check-in or late check-out."
        },
        {
            id: "02",
            title: "Eco Policy",
            desc: "To support environmental protection, we do not actively provide disposable toiletries (e.g., toothbrush, toothpaste).\nPlease bring your own toiletries to protect the earth together."
        },
        {
            id: "03",
            title: "Quiet Hours",
            desc: "Please lower your volume after 10 PM to avoid disturbing neighbors and other guests.\nThe village night is particularly quiet, let's maintain this beauty together."
        }
    ]
};

export const getStayData = (lang: 'zh' | 'en') => lang === 'zh' ? STAY_DATA_ZH : STAY_DATA_EN;

// Legacy export for backward compatibility
export const STAY_DATA = STAY_DATA_ZH;

// --- Activities Data ---
const ACTIVITIES_DATA_ZH = {
    hero: { title: "新村活動" },
    items: [
        { title: "新村節慶", desc: "傳統節日慶典", image: "https://placehold.co/600x400" },
        { title: "手作工作坊", desc: "體驗在地工藝", image: "https://placehold.co/600x400" }
    ],
    quote: { title: "體驗在地文化", desc: "深入了解新村的生活方式" },
    notices: [
        { title: "活動須知", desc: "請依規定報名參加", id: "01" }
    ]
};
const ACTIVITIES_DATA_EN = {
    hero: { title: "Village Activities" },
    items: [
        { title: "Village Festivals", desc: "Traditional celebrations", image: "https://placehold.co/600x400" },
        { title: "Workshops", desc: "Experience local crafts", image: "https://placehold.co/600x400" }
    ],
    quote: { title: "Experience Local Culture", desc: "Deep dive into village lifestyle" },
    notices: [
        { title: "Notice", desc: "Please register accordingly", id: "01" }
    ]
};
export const getActivitiesData = (lang: 'zh' | 'en') => lang === 'zh' ? ACTIVITIES_DATA_ZH : ACTIVITIES_DATA_EN;
export const ACTIVITIES_DATA = ACTIVITIES_DATA_ZH;

// --- Traffic Data ---
const TRAFFIC_DATA_ZH = {
    hero: { title: "交通資訊" },
    title: "如何抵達",
    methods: [
        {
            type: "自駕",
            title: "自行開車",
            steps: [{ id: "01", action: "導航", desc: "使用 Waze / Google Maps 搜尋 Rumah Papan" }, { id: "02", action: "抵達", desc: "依指示行駛抵達" }]
        },
        {
            type: "大眾運輸",
            title: "搭乘火車",
            steps: [{ id: "01", action: "KTM", desc: "搭乘 KTM 到 Klang Station" }, { id: "02", action: "轉乘", desc: "轉乘 Grab / Taxi" }]
        }
    ]
};
const TRAFFIC_DATA_EN = {
    hero: { title: "Traffic Info" },
    title: "How to Get Here",
    methods: [
        {
            type: "Driving",
            title: "Driving",
            steps: [{ id: "01", action: "Navigate", desc: "Search Rumah Papan on Waze / Google Maps" }, { id: "02", action: "Arrive", desc: "Follow directions" }]
        },
        {
            type: "Public Transport",
            title: "By Train",
            steps: [{ id: "01", action: "KTM", desc: "Take KTM to Klang Station" }, { id: "02", action: "Transfer", desc: "Transfer via Grab / Taxi" }]
        }
    ]
};
export const getTrafficData = (lang: 'zh' | 'en') => lang === 'zh' ? TRAFFIC_DATA_ZH : TRAFFIC_DATA_EN;
export const TRAFFIC_DATA = TRAFFIC_DATA_ZH;

// --- Work Swap Data ---
const WORK_SWAP_DATA_ZH = {
    hero: { title: "技能換宿" },
    items: [
        { title: "攝影換宿", desc: "用影像記錄新村", image: "https://placehold.co/600x400" },
        { title: "技能交換", desc: "用你的專長換取住宿", image: "https://placehold.co/600x400" }
    ],
    quote: { title: "交換故事", desc: "用你的技能換取在地體驗" },
    booking: { title: "立即申請", button: "填寫表單" },
    notices: [
        { title: "申請資格", desc: "年滿 18 歲，身心健康", id: "01" }
    ]
};
const WORK_SWAP_DATA_EN = {
    hero: { title: "Work Swap" },
    items: [
        { title: "Photography Swap", desc: "Record village life with images", image: "https://placehold.co/600x400" },
        { title: "Skill Swap", desc: "Exchange your skills for stay", image: "https://placehold.co/600x400" }
    ],
    quote: { title: "Swap Stories", desc: "Exchange skills for local experience" },
    booking: { title: "Apply Now", button: "Fill Form" },
    notices: [
        { title: "Eligibility", desc: "Age 18+, physically and mentally healthy", id: "01" }
    ]
};
export const getWorkSwapData = (lang: 'zh' | 'en') => lang === 'zh' ? WORK_SWAP_DATA_ZH : WORK_SWAP_DATA_EN;
export const WORK_SWAP_DATA = WORK_SWAP_DATA_ZH;
