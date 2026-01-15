
const FOUNDER_DATA_ZH = {
    image: "https://placehold.co/698x698/E5E5E5/E5E5E5.png", // Solid gray placeholder
    name: "周鴻輝",
    bio: "我出生於巴生班達馬蘭新村，擁有馬來西亞旅遊局執牌導遊資格，長年投入文化教育與在地體驗，深信「走進地方，就理解自己的土地」。2016年發起巴生老街導覽並成立中文導覽團隊 Jalan-jalan Klang；2020年創立土特產平台 JjK Store 推廣五號公路沿線好物；其後在家鄉打造班達馬蘭新村故事館「班厝」，以走讀、展覽與教育行動為老社區點燈。2022年獲聘巴生旅遊大使，持續用故事連結人與地方。",
    title: "創辦人",
    subtitle: "巴生·班達馬蘭新村人｜文化導覽人｜地方創生實踐者",
    socials: [
        { id: 'facebook', url: 'https://www.facebook.com/RumahPapanPandamaran/', icon: 'fi fi-brands-facebook' },
        { id: 'instagram', url: 'https://www.instagram.com/rumah_papan_pandamaran', icon: 'fi fi-brands-instagram' },
        { id: 'whatsapp', url: 'https://api.whatsapp.com/send/?phone=60162198920&text&type=phone_number&app_absent=0', icon: 'fi fi-brands-whatsapp' }
    ]
};

const FOUNDER_DATA_EN = {
    image: "https://placehold.co/698x698/E5E5E5/E5E5E5.png", // Solid gray placeholder
    name: "Chow Hong Hui",
    bio: "Born in Pandamaran New Village, Klang. A refined licensed tourist guide in Malaysia with years of dedication to cultural education and local experiences, believing that 'walking into a place is understanding one's own land'. Initiated Klang Old Street Tour and founded Chinese tour team Jalan-jalan Klang in 2016; founded local product platform JjK Store in 2020 to promote goods along Route 5; later established the Pandamaran New Village Story House 'Rumah Papan' in his hometown, lighting up the old community through tours, exhibitions, and educational actions. Appointed as Klang Tourism Ambassador in 2022, continuing to connect people and places with stories.",
    title: "Founder",
    subtitle: "Klang Pandamaran Villager | Cultural Guide | Placemaking Practitioner",
    socials: [
        { id: 'facebook', url: 'https://www.facebook.com/RumahPapanPandamaran/', icon: 'fi fi-brands-facebook' },
        { id: 'instagram', url: 'https://www.instagram.com/rumah_papan_pandamaran', icon: 'fi fi-brands-instagram' },
        { id: 'whatsapp', url: 'https://api.whatsapp.com/send/?phone=60162198920&text&type=phone_number&app_absent=0', icon: 'fi fi-brands-whatsapp' }
    ]
};

export const getFounderData = (lang: 'zh' | 'en') => lang === 'zh' ? FOUNDER_DATA_ZH : FOUNDER_DATA_EN;
export const FOUNDER_DATA = FOUNDER_DATA_ZH;

export const CONTACT_LINKS = [
    {
        title: "Facebook",
        value: "班厝. 班村故事馆 Rumah Papan. Pandamaran",
        link: "https://www.facebook.com/RumahPapanPandamaran/",
        icon: "fi fi-brands-facebook"
    },
    {
        title: "Instagram",
        value: "rumah_papan_pandamaran",
        link: "https://www.instagram.com/rumah_papan_pandamaran",
        icon: "fi fi-brands-instagram"
    },
    {
        title: "WhatsApp",
        value: "+60 16-219 8920",
        link: "https://api.whatsapp.com/send/?phone=60162198920&text&type=phone_number&app_absent=0",
        icon: "fi fi-brands-whatsapp"
    }
];
