
// Home Page Data

export const HERO_DATA = {
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

export const FEATURES_DATA = [
    {
        title: "新村導覽",
        subtitle: "rumah papan",
        path: "/services/tour"
    },
    {
        title: "住宿體驗",
        subtitle: "rumah papan",
        path: "/services/stay"
    },
    {
        title: "技能換宿",
        subtitle: "rumah papan",
        path: "/services/work-swap"
    }
];

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

// Image Imports
import imgRoosterBowl from '../assets/images/Image_village_tour.jpg';
import imgPray from '../assets/images/Image_pray_heaven.jpg';
import imgStoryHouse from '../assets/images/Image_house_story_gallery.jpg';
import imgStreet from '../assets/images/Image_pandamaran_daily.jpg';
import imgSkillSwap from '../assets/images/Image_skill_swap.jpg';
import imgMarket from '../assets/images/Image_village_market.jpg';
import imgBuddha from '../assets/images/Image_guan_tian_gong.jpg';

export const INTRO_SLIDES = [
    { title: "雞公碗", desc: "馬來西亞最大的華人新村入口，用一碗白飯和雞公碗，向每個來訪的人打招呼。", image: imgRoosterBowl },
    { title: "拜天公", desc: "神壇、供品和煙火，把幾代福建人對天公與祖先的心意都放在這一夜。", image: imgPray },
    { title: "班厝故事館", desc: "故事館裡收著新村記憶、展覽與飯桌，每次推門，都是班達馬蘭的新一頁。", image: imgStoryHouse },
    { title: "班達馬蘭新村街景", desc: "海鮮店、肉骨茶與老招牌，把班達馬蘭最日常的生活節奏排成街景。", image: imgStreet },
    { title: "技能換宿", desc: "帶著專長來幫忙，新村用飯桌、人情和故事，換給你一段住在這裡的日常。", image: imgSkillSwap },
    { title: "新村市集", desc: "一攤攤新村美食與手作，把人情味和好味道一起打包，讓你帶回家。", image: imgMarket },
    { title: "漢白玉佛祖像", desc: "全馬最大漢白玉佛像立在蓮花清人寺，成了班達馬蘭最安定的祝福地標。", image: imgBuddha },
];

export const FOOTER_DATA = {
    title: "班厝故事館",
    subtitle: "RUMAH PAPAN",
    description: "在班達馬蘭新村，收集故事和人情的一間厝。",
    contact: {
        region: "Malaysia Selangor Klang",
        phone: "+60 16-219 8920",
        email: "rumahpapanklang@gmail.com",
        address: "124, Jalan Kemanis, 42000 Pelabuhan Klang, Klang, Malaysia, 42000"
    }
};
