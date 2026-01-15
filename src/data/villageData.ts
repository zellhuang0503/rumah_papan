
import act1 from '../assets/images/Image_village_tour.jpg';
import act2 from '../assets/images/Image_pray_heaven.jpg';
import act3 from '../assets/images/Image_mid_autumn.jpg';
import act4 from '../assets/images/Image_village_market.jpg';
import act5 from '../assets/images/Image_workshop.jpg';

import stay1 from '../assets/images/Image_story_room.jpg';
import stay2 from '../assets/images/Image_old_room.jpg';
import stay3 from '../assets/images/Image_single_bed.jpg';
import stay4 from '../assets/images/Image_living_room_stay.jpg';
import stay5 from '../assets/images/Image_writing_desk.jpg';

import swap1 from '../assets/images/Image_work_content.jpg';
import swap2 from '../assets/images/Image_skill_swap.jpg';
import swap3 from '../assets/images/Image_story_exchange.jpg';
import swap4 from '../assets/images/Image_possibilities.jpg';
import swap5 from '../assets/images/Image_travel_prep.jpg';

export interface RoomItem {
    title: string;
    desc: string;
    image: string;
    imagePosition?: string;
}

export interface NoticeItem {
    id: string;
    title: string;
    desc: string;
}

export interface ActivityItem {
    title: string;
    desc: string;
    image: string;
    imagePosition?: string;
}

export interface WorkSwapItem {
    title: string;
    desc: string;
    image: string;
    imagePosition?: string;
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

export interface ActivitiesData {
    hero: { title: string };
    items: ActivityItem[];
    quote: { title: string; desc: string };
    notices: NoticeItem[];
}

export interface WorkSwapData {
    hero: { title: string };
    items: WorkSwapItem[];
    quote: { title: string; desc: string };
    booking: { title: string; button: string };
    notices: NoticeItem[];
}

const STAY_DATA_ZH: StayData = {
    hero: {
        title: "住宿體驗"
    },
    rooms: [
        {
            title: "故事裡的房間",
            desc: "牆上掛著老照片與地圖，腳下是懷舊拼花地板，床上疊著彩色棉被。住在這裡，就像一邊休息、一邊被班達馬蘭的新村故事包圍著入睡。",
            image: stay1
        },
        {
            title: "老房間",
            desc: "白色鐵床上下鋪，鋪上紅色拼布，被單乾淨簡單，旁邊是老木櫃和木椅，彷彿來到親戚家的房間一角。住在這裡，可以聽見客廳的人聲、廚房的碗盤聲，一晚體驗最日常的新村生活。",
            image: stay2
        },
        {
            title: "單人床",
            desc: "簡約單人床，鋪上柔軟棉被和手作拼布，床邊還有小植栽點綴，是專屬於你的安靜角落。適合一個人住下來，好好睡一晚、寫寫字、整理心情，在新村裡給自己一個小小充電空間。",
            image: stay3,
            imagePosition: 'object-bottom'
        },
        {
            title: "班厝客廳",
            desc: "住在班厝，此客廳就是大家的交誼廳。藤椅、木桌和牆上的老照片，把空間佈置得像回到鄉下親戚家；白天可以在這裡喝茶看展板，晚上和其他住客、夥伴聊聊分享今天的發現，讓住宿多了一個一起相處的地方。",
            image: stay4
        },
        {
            title: "夜燈下的小書桌",
            desc: "班厝的夜晚，如果還捨不得馬上睡，可以到這張老書桌前坐一會兒。開著暖黃檯燈，讓電風扇慢慢轉，寫日記、整理今天的照片，或只是靜靜發呆看著牆上的光影。旅途中，也留一點時間給自己好好安靜一下。",
            image: stay5
        }
    ],
    quote: {
        title: "溫暖班厝",
        desc: "班厝是一間板屋，也是大家暫時回家的地方。\n你在這裡睡的不只是床，而是一整個新村的早晨、晚風和人情。\n住一晚班達馬蘭，感受真正班達馬蘭溫暖的新村人情。"
    },
    booking: {
        title: "住宿預約",
        button: "填寫申請表"
    },
    notices: [
        {
            id: "01",
            title: "預約與入住時間",
            desc: "班厝採預約制，建議至少提前一週詢問房況。\n一般入住時間為下午，退房為隔日中午前，如需調整可先跟館長討論。"
        },
        {
            id: "02",
            title: "房型、人數與收費說明",
            desc: "班厝目前為板屋式房間，適合個人、雙人或小家庭入住。\n標準入住：1 人 RM100／晚，2 人 RM150／晚\n每多 1 人：加收 RM50／晚\n實際可入住人數、床位安排與金額，會依房型與當期狀況，由館方回覆為準"
        },
        {
            id: "03",
            title: "需求選擇",
            desc: "所需房間數量、首選床型 (雙人床/上下舖/單人床)。"
        },
        {
            id: "04",
            title: "班屋生活小提醒",
            desc: "這是一間保留新村味道的板屋，地板、門窗和傢俱都帶著歲月痕跡。\n請放輕腳步、輕拉門窗，也一起幫忙照顧老物件。"
        },
        {
            id: "05",
            title: "住宿空間使用",
            desc: "住宿空間提供基本機能，設有熱水器、免費 Wi-Fi 與共用客廳，戶外公共區域開放交流。\n付費入住之民宿房型配有冷氣設備，另提供電子爐與電水壺供簡單煮食。\n讓你在班達馬蘭的新村旅途中，也能享有自在且舒適的生活感。"
        },
        {
            id: "06",
            title: "班厝餐桌體驗",
            desc: "預約入住前可加購班厝餐食體驗，從日常家常到主題私房料理，皆需提前預約。\n\n一般午餐／晚餐\n每人 RM40 起，採無菜單盲盒形式\n餐點內容依當日食材安排，建議於入住前3天預訂。\n\n木鱉果主題私房料理\n每人 RM158，提供 8–9 道菜的完整餐桌體驗。\n需 8–10 人成桌，並於3週前預約，以利食材準備與料理安排。"
        },
        {
            id: "07",
            title: "拍照與安寧",
            desc: "館內展品與牆上照片歡迎欣賞、輕觸即可；如需拍攝他人或鄰居生活，\n也請先打招呼徵得同意，讓新村的人情味一直保持舒服的距離。"
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
const ACTIVITIES_DATA_ZH: ActivitiesData = {
    hero: { title: "活動體驗" },
    items: [
        {
            title: "走村導覽",
            desc: "從班厝出發，跟著館主走進班達馬蘭新村，從雞公碗地標、漢白玉大佛，到老店招牌、板屋巷弄，一路聽導覽說起新村的遷村歷史、名人故事與在地美食。兩個多小時，把你從「路過的遊客」慢慢帶成「懂一點班村的人」。",
            image: act1
        },
        {
            title: "拜天公",
            desc: "正月初九，天公桌擺到巷子口，甘蔗、供品、鞭炮和祝福一字排開。班厝帶你看儀式背後的移民記憶、信仰和家族故事，讓你第一次在新村親眼看見「拜天公」，而不是只在相片裡聽說。",
            image: act2
        },
        {
            title: "中秋賞月",
            desc: "提燈籠、聽故事、看孩子在院子裡跑來跑去，桌上是月餅與新村私房菜。班厝的中秋，不只看月亮，也讓你在月光下認識一整群新朋友，把「回家過節」延伸到另一條村。",
            image: act3
        },
        {
            title: "新村節市集",
            desc: "配合雪蘭莪新村節，班厝把新村美食、手作、表演和導覽一次集合。你可以在市集中吃肉骨茶、買在地小物、聽故事，也順便認識其他 76 個新村正在發生的事。",
            image: act4,
            imagePosition: 'object-[center_15%]'
        },
        {
            title: "班厝工作坊",
            desc: "不定期邀請在地職人、藝術家和旅人，在班厝辦小型講座、剪片分享、紙藝或手作課。你可以帶著問題來、帶著作品走，也順便在客廳的長桌邊交幾個新朋友。",
            image: act5
        }
    ],
    quote: {
        title: "在活動裡認識一條村",
        desc: "班厝每場活動都從這條新村長出：拜天公、中秋、走村導覽到綠色學堂，跟著神明與菜園一起呼吸。你可以抽一個下午，或為某個節日回來，每次參與都會多記住一點這裡的人情風景。"
    },
    notices: [
        {
            id: "01",
            title: "主題與報名",
            desc: "導覽依不同主題獨家規劃體驗內容，皆為收費參與，價格自每人 RM60 起，並可依需求設計結合午餐、工作坊等配套。\n另有每月一次由在地商家冠名的公益導覽，邀請更多人走進班達馬蘭新村。\n多數活動採預約制，請透過 Facebook／IG／WhatsApp 報名，走村導覽與節慶活動建議提前一週洽詢。"
        },
        {
            id: "02",
            title: "穿著與裝備",
            desc: "建議穿輕便衣物、好走的鞋，方便在新村巷弄與菜園走動。\n戶外活動可自備帽子、雨具與防蚊用品。"
        },
        {
            id: "03",
            title: "飲水與環保",
            desc: "歡迎自備水壺與環保餐具，現場有飲水可補充。\n活動中請配合垃圾減量與資源回收，讓新村一起呼吸得更輕鬆。"
        },
        {
            id: "04",
            title: "尊重在地信仰與住民",
            desc: "拜天公、寺廟參訪等宗教活動，請依現場指引，不喧嘩、不踩踏供品。\n若想拍攝村民或店家，記得先打聲招呼。"
        },
        {
            id: "05",
            title: "天候與行程變動",
            desc: "如遇大雨或其他不可抗因素，活動可能延期或改為室內版本；\n最新消息會公告在 官方網站／Facebook／IG，請留意通知。"
        }
    ]
};
const ACTIVITIES_DATA_EN: ActivitiesData = {
    hero: { title: "Village Activities" },
    items: [
        { title: "Village Festivals", desc: "Traditional celebrations", image: "https://placehold.co/600x400" },
        { title: "Workshops", desc: "Experience local crafts", image: "https://placehold.co/600x400", imagePosition: 'object-top' }
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
            type: "機場",
            title: "從吉隆坡國際機場出發（KLIA / KLIA2）",
            steps: [
                { id: "01", action: "搭乘巴士", desc: "KLIA / KLIA2 → Aeon Mall Bukit Tinggi, Klang（約 1 小時）" },
                { id: "02", action: "轉乘 Grab 計程車", desc: "Aeon Mall Bukit Tinggi → 班厝故事館（約 15 分鐘 / 5 km）" }
            ]
        },
        {
            type: "車站",
            title: "從吉隆坡中央車站出發（KL Sentral）",
            steps: [
                { id: "01", action: "搭乘 KTM 電動火車", desc: "KL Sentral → KTM Station Kampung Raja Uda" },
                { id: "02", action: "轉乘 Grab 計程車", desc: "Kampung Raja Uda 站 → 班厝故事館（約 7–12 分鐘 / 2 km）" }
            ]
        },
        {
            type: "接駁巴士",
            title: "免費接駁巴士 → KTM Klang",
            steps: [
                { id: "01", action: "步行至 Free Shuttle Bus", desc: "出站後步行至 Free Shuttle Bus 免費接駁巴士月台" },
                { id: "02", action: "搭乘免費接駁巴士", desc: "Subang → KTM Klang（巴士站）（約 30 分鐘）" }
            ],
            note: "（此接駁為鐵路維修期間的暫時性服務，建議出發前先確認班次）"
        }
    ]
};
const TRAFFIC_DATA_EN = {
    hero: { title: "Traffic Info" },
    title: "How to Get Here",
    methods: [
        {
            type: "Airport",
            title: "Departing from KLIA / KLIA2",
            steps: [
                { id: "01", action: "Take Bus", desc: "KLIA / KLIA2 → Aeon Mall Bukit Tinggi, Klang (approx. 1 hour)" },
                { id: "02", action: "Transfer to Grab", desc: "Aeon Mall Bukit Tinggi → Rumah Papan (approx. 15 mins / 5 km)" }
            ]
        },
        {
            type: "Station",
            title: "Departing from KL Sentral",
            steps: [
                { id: "01", action: "Take KTM Train", desc: "KL Sentral → KTM Station Kampung Raja Uda" },
                { id: "02", action: "Transfer to Grab", desc: "Kampung Raja Uda Station → Rumah Papan (approx. 7–12 mins / 2 km)" }
            ]
        },
        {
            type: "Shuttle Bus",
            title: "Free Shuttle Bus → KTM Klang",
            steps: [
                { id: "01", action: "Walk to Shuttle Bus", desc: "Walk to Free Shuttle Bus platform after exiting station" },
                { id: "02", action: "Take Free Bus", desc: "Subang → KTM Klang (Bus Station) (approx. 30 mins)" }
            ],
            note: "(Temporary service during railway maintenance, please check schedule beforehand)"
        }
    ]
};
export const getTrafficData = (lang: 'zh' | 'en') => lang === 'zh' ? TRAFFIC_DATA_ZH : TRAFFIC_DATA_EN;
export const TRAFFIC_DATA = TRAFFIC_DATA_ZH;

// --- Work Swap Data ---
const WORK_SWAP_DATA_ZH: WorkSwapData = {
    hero: { title: "技能換宿" },
    items: [
        {
            title: "工作內容",
            desc: "協助環境整理、園藝照顧、接待訪客、場館導覽，或用你的專長幫忙拍照、剪片、寫文。每一件小事，都是讓這間老屋和新村繼續被看見的一部分。",
            image: swap1
        },
        {
            title: "技能專長",
            desc: "換宿期間就住在班厝，早上看村民上班上學，晚上聽遠處廟宇、街邊店家收攤的聲音。日子不華麗，但很真實，你會慢慢記住這條村一天的呼吸。",
            image: swap2
        },
        {
            title: "故事交換",
            desc: "白天陪訪客聽班村故事，晚上輪到你把自己的城市、國家或人生說給大家聽。班厝相信，每個來換宿的人，都是這條新村的一個新章節。",
            image: swap3
        },
        {
            title: "找到更多可能",
            desc: "有人因為換宿發現自己喜歡帶團、有人找到創作題材，也有人只是讓心慢慢沉澱。當你把時間留給這裡，新村也會用人情和風景，提醒你原來自己還有別的路可以走。",
            image: swap4
        },
        {
            title: "行前提醒",
            desc: "出發前記得先和館方確認抵達時間與工作排程；\n帶上防曬、防蚊、雨具與好走的鞋，也別忘了自備水壺。\n準備好一顆願意互相照應的心，你會更快融入這座新村的日常。",
            image: swap5
        }
    ],
    quote: {
        title: "把日子住進新村",
        desc: "在班厝的技能換宿，你不只是在幫忙，而是一起生活在一條村裡。從走村導覽、活動佈置到綠色學堂，跟著神明與菜園一起呼吸、一起把事情完成。每一次參與，都會多記住一點這裡的人情與風景。"
    },
    booking: {
        title: "換宿預約",
        button: "填寫申請表"
    },
    notices: [
        {
            id: "01",
            title: "申請方式與基本條件",
            desc: "請先透過 Facebook／WhatsApp 自我介紹，簡單說明：\n你是誰、想來多久、會什麼、希望在班厝學到什麼。\n一般建議停留至少 2 週，較能進入生活節奏。"
        },
        {
            id: "02",
            title: "工作內容與時間分配",
            desc: "每天約 4–6 小時協助菜園、環境整理、接待、活動或影音文字等工作，\n其餘時間自由運用。實際安排會依當期活動與你的專長一起討論。"
        },
        {
            id: "03",
            title: "住宿與餐食",
            desc: "提供基礎住宿空間及簡單伙食，\n可能會一起備菜、煮飯、洗碗，像在家裡分工那樣。\n若有特別飲食需求，記得事先告知"
        },
        {
            id: "04",
            title: "適合什麼樣的你",
            desc: "喜歡與人相處、不怕動手、願意主動幫忙，\n對社區、華人文化或永續生活有興趣，都很適合來。\n不需要完美的履歷，只需要誠實和願意互相學習的心。"
        },
        {
            id: "05",
            title: "尊重在地與安全",
            desc: "請尊重新村居民與宗教信仰，\n拍攝他人前先徵詢、活動期間遵守安全與環保規範。\n有任何不舒服或疑問，都可以隨時找館主或夥伴。"
        },
        {
            id: "06",
            title: "作品與素材使用",
            desc: "若你在換宿期間協助拍攝照片、影片或撰寫文字，\n可能會在班厝或相關平台使用。 若有個人作品不希望公開，也可以事先說明，一起討論最佳方式。"
        },
        {
            id: "07",
            title: "行前準備與個人物品",
            desc: "換宿以輕便生活為主，建議自備好走的鞋、工作用衣物、雨具與防蚊用品。\n個人盥洗用品、常用藥與可重複使用水壺也請自行準備；貴重物品請自行保管，如需協助可先與館方討論。"
        }
    ]
};
const WORK_SWAP_DATA_EN: WorkSwapData = {
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
