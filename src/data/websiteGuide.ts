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

export const websiteGuideData: WebsiteGuideData = {
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
