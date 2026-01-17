import React, { useEffect, useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getActivitiesData } from '../data/villageData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';

interface ActivitiesCMS {
    activities?: {
        heroTitle?: string; heroTitle_en?: string;
        items?: Array<{
            title?: string; title_en?: string; desc?: string; desc_en?: string; image?: any;
        }>;
        quote?: {
            title?: string; title_en?: string; desc?: string; desc_en?: string;
        };
        notices?: Array<{
            title?: string; title_en?: string; desc?: string; desc_en?: string;
        }>;
    };
}

export const VillageActivities: React.FC = () => {
    const { language } = useLanguage();
    const STATIC_DATA = getActivitiesData(language);

    const [cmsData, setCmsData] = useState<ActivitiesCMS | null>(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await client.fetch<ActivitiesCMS>(`*[_type == "village"][0]{activities}`);
                if (data) {
                    setCmsData(data);
                }
            } catch (error) {
                console.error("Failed to fetch activities data", error);
            }
        };
        fetchActivities();
    }, []);

    const getLocalized = (zh: string | undefined, en: string | undefined, fallback: string | undefined) => {
        if (language === 'en') return en || zh || fallback || "";
        return zh || fallback || "";
    };

    const cmsAct = cmsData?.activities;

    const hero = {
        title: getLocalized(cmsAct?.heroTitle, cmsAct?.heroTitle_en, STATIC_DATA.hero.title)
    };

    const items = (cmsAct?.items && cmsAct.items.length > 0 ? cmsAct.items : STATIC_DATA.items).map((item: any, i: number) => {
        const staticItem = STATIC_DATA.items[i];
        if (cmsAct?.items && cmsAct.items.length > 0) {
            return {
                title: getLocalized(item.title, item.title_en, staticItem?.title),
                desc: getLocalized(item.desc, item.desc_en, staticItem?.desc),
                image: item.image ? urlFor(item.image).url() : (staticItem?.image || ""),
                imagePosition: staticItem?.imagePosition || ""
            };
        }
        return item; // Static
    });

    const quote = {
        title: getLocalized(cmsAct?.quote?.title, cmsAct?.quote?.title_en, STATIC_DATA.quote.title),
        desc: getLocalized(cmsAct?.quote?.desc, cmsAct?.quote?.desc_en, STATIC_DATA.quote.desc)
    };

    const notices = (cmsAct?.notices && cmsAct.notices.length > 0 ? cmsAct.notices : STATIC_DATA.notices).map((item: any, i: number) => {
        const staticItem = STATIC_DATA.notices[i];
        if (cmsAct?.notices && cmsAct.notices.length > 0) {
            return {
                id: item.id || staticItem?.id || `0${i + 1}`,
                title: getLocalized(item.title, item.title_en, staticItem?.title),
                desc: getLocalized(item.desc, item.desc_en, staticItem?.desc)
            };
        }
        return item;
    });

    const ACTIVITIES_DATA = {
        hero, items, quote, notices
    };

    const labels = {
        notices: language === 'zh' ? '注意事項' : 'Notices'
    };

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-20 desktop:gap-[160px] px-6 desktop:px-0">
                {/* Page Title */}
                <h1 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                    {ACTIVITIES_DATA.hero.title}
                </h1>

                {/* Zigzag Activities List */}
                <section className="w-full max-w-[1200px] flex flex-col gap-12 desktop:gap-[40px]">
                    {ACTIVITIES_DATA.items.map((item, index) => (
                        <div key={index} className={`flex items-center gap-6 desktop:gap-[27px] flex-col-reverse ${index % 2 === 1 ? 'desktop:flex-row-reverse' : 'desktop:flex-row'} justify-center`}>
                            {/* Text Card */}
                            <div className="w-full desktop:w-[621px] h-auto desktop:h-[288px] bg-white rounded-[18px] px-6 py-8 desktop:py-0 desktop:px-[30px] flex flex-col justify-center items-start gap-4 desktop:gap-[18px] overflow-hidden shadow-sm">
                                <h2 className="text-black/80 text-2xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight">
                                    {item.title}
                                </h2>
                                <p className="text-black/80 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.4] text-justify">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Image Card */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className={`w-full desktop:w-[621px] h-[240px] md:h-[360px] lg:h-[420px] desktop:h-[288px] rounded-[18px] object-cover shadow-sm ${item.imagePosition || ''}`}
                            />
                        </div>
                    ))}
                </section>

                {/* Quote Section */}
                <section className="w-full max-w-[1200px] flex flex-col desktop:flex-row desktop:items-end justify-center gap-6 desktop:gap-[120px]">
                    <h2 className="text-neutral-900 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-[1.45] whitespace-nowrap text-center desktop:text-left">
                        {ACTIVITIES_DATA.quote.title}
                    </h2>
                    <p className="w-full desktop:w-[527px] text-neutral-900 text-lg desktop:text-[22.5px] font-medium font-['Noto_Sans_TC'] leading-[1.4] text-center desktop:text-left">
                        {ACTIVITIES_DATA.quote.desc}
                    </p>
                </section>

                {/* Notices Section */}
                <section className="w-full max-w-[1200px] flex flex-col items-center gap-[0px]">
                    {/* Title */}
                    <h2 className="text-black text-3xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-[1.4] mb-4 desktop:mb-[9px] w-full desktop:w-[1152px] text-left">
                        {labels.notices}
                    </h2>

                    <div className="w-full flex flex-col items-center">
                        {ACTIVITIES_DATA.notices.map((notice, index) => (
                            <div key={index} className="w-full desktop:w-[1152px] py-8 desktop:py-[48px] border-b border-neutral-900 flex flex-col gap-4 desktop:gap-[24px]">
                                <div className="flex items-center gap-4 desktop:gap-[24px]">
                                    <span className="text-neutral-900 text-2xl desktop:text-[36px] font-semibold font-['Roboto_Slab'] leading-none mt-1">
                                        {notice.id}
                                    </span>
                                    <h3 className="text-neutral-900 text-xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-none">
                                        {notice.title}
                                    </h3>
                                </div>
                                <p className="text-black/80 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.4] whitespace-pre-line">
                                    {notice.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <SiteFooter />
            </main>
        </div>
    );
};
