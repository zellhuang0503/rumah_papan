
export interface GuideStepData {
    number: string;
    title: string;
    description: string;
}

export interface WebsiteGuideData {
    subTitle: string;
    mainTitle: string;
    intro: string;
    steps: GuideStepData[];
}

const WEBSITE_GUIDE_DATA_ZH: WebsiteGuideData = {
    subTitle: "rumah papan",
    mainTitle: "網站使用指南",
    intro: "從故事逛到行程，第一次點進班厝，不知道從哪裡看起？跟著三個步驟，一起從故事走到真正來訪的新村行程。",
    steps: [
        {
            number: "01",
            title: "先從故事開始",
            description: "先去「關於班厝」看看，翻翻故事誌、認識班達馬蘭的新村歷史，知道自己走進的是一條怎樣的家村子。"
        },
        {
            number: "02",
            title: "選一種你想體驗的方式",
            description: "可以選擇活動體驗、住宿、技能換宿，\n照著現在的你，挑一個最有感的方式來到班厝。"
        },
        {
            number: "03",
            title: "把路線和時間排好",
            description: "最後到「交通方式」看怎麼來這裡，再透過「聯絡我們」或社群聯繫跟我們說一聲，剩下的就交給班厝準備，你只要帶著自己來就好。"
        }
    ]
};

const WEBSITE_GUIDE_DATA_EN: WebsiteGuideData = {
    subTitle: "rumah papan",
    mainTitle: "Website Guide",
    intro: "From stories to itineraries, first time at Rumah Papan and don't know where to start? Follow these three steps to go from reading stories to actually visiting the village.",
    steps: [
        {
            number: "01",
            title: "Start with Stories",
            description: "Go to 'About Rumah Papan', browse the Story Log, learn about Pandamaran's history, and know what kind of home village you are walking into."
        },
        {
            number: "02",
            title: "Choose Your Experience",
            description: "You can choose Activities, Stay, or Work Swap.\nPick the way that resonates most with you right now to come to Rumah Papan."
        },
        {
            number: "03",
            title: "Plan Route and Time",
            description: "Finally, check 'Transport' to see how to get here, then contact us via 'Contact Us' or social media. We will handle the rest, just bring yourself."
        }
    ]
};

export const getWebsiteGuideData = (lang: 'zh' | 'en') => lang === 'zh' ? WEBSITE_GUIDE_DATA_ZH : WEBSITE_GUIDE_DATA_EN;
