import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getStayData } from '../data/villageData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';

interface StayCMS {
    stay?: {
        heroTitle?: string; heroTitle_en?: string;
        rooms?: Array<{
            title?: string; title_en?: string; desc?: string; desc_en?: string; image?: any;
        }>;
        quote?: {
            title?: string; title_en?: string; desc?: string; desc_en?: string;
        };
        booking?: {
            title?: string; title_en?: string; button?: string; button_en?: string;
        };
        notices?: Array<{
            title?: string; title_en?: string; desc?: string; desc_en?: string;
        }>;
    };
}

export const VillageStay: React.FC = () => {
    const { language } = useLanguage();
    const STATIC_DATA = getStayData(language);

    const [cmsData, setCmsData] = useState<StayCMS | null>(null);

    useEffect(() => {
        const fetchStay = async () => {
            try {
                const data = await client.fetch<StayCMS>(`*[_type == "village"][0]{stay}`);
                if (data) {
                    setCmsData(data);
                }
            } catch (error) {
                console.error("Failed to fetch stay data", error);
            }
        };
        fetchStay();
    }, []);

    const getLocalized = (zh: string | undefined, en: string | undefined, fallback: string | undefined) => {
        if (language === 'en') return en || zh || fallback || "";
        return zh || fallback || "";
    };

    const cmsStay = cmsData?.stay;

    // Merge
    const hero = {
        title: getLocalized(cmsStay?.heroTitle, cmsStay?.heroTitle_en, STATIC_DATA.hero.title)
    };

    const rooms = (cmsStay?.rooms && cmsStay.rooms.length > 0 ? cmsStay.rooms : STATIC_DATA.rooms).map((item: any, i: number) => {
        const staticItem = STATIC_DATA.rooms[i];
        if (cmsStay?.rooms && cmsStay.rooms.length > 0) {
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
        title: getLocalized(cmsStay?.quote?.title, cmsStay?.quote?.title_en, STATIC_DATA.quote.title),
        desc: getLocalized(cmsStay?.quote?.desc, cmsStay?.quote?.desc_en, STATIC_DATA.quote.desc)
    };

    const booking = {
        title: getLocalized(cmsStay?.booking?.title, cmsStay?.booking?.title_en, STATIC_DATA.booking.title),
        button: getLocalized(cmsStay?.booking?.button, cmsStay?.booking?.button_en, STATIC_DATA.booking.button)
    };

    const notices = (cmsStay?.notices && cmsStay.notices.length > 0 ? cmsStay.notices : STATIC_DATA.notices).map((item: any, i: number) => {
        const staticItem = STATIC_DATA.notices[i];
        if (cmsStay?.notices && cmsStay.notices.length > 0) {
            return {
                id: item.id || staticItem?.id || `0${i + 1}`,
                title: getLocalized(item.title, item.title_en, staticItem?.title),
                desc: getLocalized(item.desc, item.desc_en, staticItem?.desc)
            };
        }
        return item;
    });

    const STAY_DATA = {
        hero, rooms, quote, booking, notices
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
                    {STAY_DATA.hero.title}
                </h1>

                {/* Zigzag Room List */}
                <section className="w-full max-w-[1200px] flex flex-col gap-12 desktop:gap-[40px]">
                    {STAY_DATA.rooms.map((room, index) => (
                        <div key={index} className={`flex items-center gap-6 desktop:gap-[27px] flex-col-reverse ${index % 2 === 1 ? 'desktop:flex-row-reverse' : 'desktop:flex-row'} justify-center`}>
                            {/* Text Card */}
                            <div className="w-full desktop:w-[621px] h-auto desktop:h-[288px] bg-white rounded-[18px] px-6 py-8 desktop:py-0 desktop:px-[30px] flex flex-col justify-center items-start gap-4 desktop:gap-[18px] overflow-hidden shadow-sm">
                                <h2 className="text-black/80 text-2xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight">
                                    {room.title}
                                </h2>
                                <p className="text-black/80 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.4] text-justify">
                                    {room.desc}
                                </p>
                            </div>

                            {/* Image Card */}
                            <img
                                src={room.image}
                                alt={room.title}
                                className={`w-full desktop:w-[621px] h-[240px] md:h-[360px] lg:h-[420px] desktop:h-[288px] rounded-[18px] object-cover shadow-sm ${room.imagePosition || ''}`}
                            />
                        </div>
                    ))}
                </section>

                {/* Quote Section */}
                <section className="w-full max-w-[1200px] flex flex-col desktop:flex-row desktop:items-end justify-center gap-6 desktop:gap-[120px]">
                    <h2 className="text-neutral-900 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-[1.45] whitespace-nowrap text-center desktop:text-left">
                        {STAY_DATA.quote.title}
                    </h2>
                    <p className="w-full desktop:w-[527px] text-neutral-900 text-lg desktop:text-[22.5px] font-medium font-['Noto_Sans_TC'] leading-[1.4] whitespace-pre-line text-center desktop:text-left">
                        {STAY_DATA.quote.desc}
                    </p>
                </section>

                {/* Booking Section */}
                <section className="w-full max-w-[1200px] px-6 py-8 desktop:px-[84px] desktop:py-[72px] bg-white rounded-[18px] flex flex-col desktop:flex-row justify-between items-center shadow-sm gap-6 desktop:gap-0">
                    <h2 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center desktop:text-left">
                        {STAY_DATA.booking.title}
                    </h2>

                    {/* Outline Button */}
                    <Link to="/booking/stay" className="px-[24px] py-[12px] rounded-full border-[2.4px] border-neutral-800 flex justify-center items-center gap-[6px] hover:bg-neutral-50 transition-colors">
                        <div className="w-[24px] h-[24px] relative flex justify-center items-center">
                            {/* Pen Icon SVG */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.833 2.667a2.5 2.5 0 0 1 3.536 3.536L8.5 20.071 3 21.5l1.429-5.5L18.833 2.667z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 5.5l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 21.5h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-neutral-900 text-[18px] font-bold font-['Noto_Sans_TC'] leading-[1.5]">
                            {STAY_DATA.booking.button}
                        </span>
                    </Link>
                </section>

                {/* Notices Section */}
                <section className="w-full max-w-[1200px] flex flex-col items-center gap-[0px]">
                    {/* Title */}
                    <h2 className="text-black text-3xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-[1.4] mb-4 desktop:mb-[9px] w-full desktop:w-[1152px] text-left">
                        {labels.notices}
                    </h2>

                    <div className="w-full flex flex-col items-center">
                        {STAY_DATA.notices.map((notice, index) => (
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
