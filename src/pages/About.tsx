import React, { useEffect, useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAboutHeroData } from '../data/aboutData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';

interface AboutCMS {
    heroStory?: {
        title?: string;
        title_en?: string;
        subtitle?: string;
        subtitle_en?: string;
        tag?: string;
        tag_en?: string;
        path?: string;
        image?: any;
    };
    heroCards?: Array<{
        title?: string;
        title_en?: string;
        subtitle?: string;
        subtitle_en?: string;
        path?: string;
        image?: any;
    }>;
}

export const About: React.FC = () => {
    const { language } = useLanguage();
    const ABOUT_HERO_DATA = getAboutHeroData(language);

    // CMS Data State
    const [cmsData, setCmsData] = useState<AboutCMS | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch<AboutCMS>(`*[_type == "about"][0]`);
                if (result) {
                    setCmsData(result);
                }
            } catch (error) {
                console.error("Failed to fetch about data", error);
            }
        };
        fetchData();
    }, []);

    // Helper to get localized string with fallback
    const getLocalized = (zh: string | undefined, en: string | undefined, fallback: string) => {
        if (language === 'en') return en || zh || fallback;
        return zh || fallback;
    };

    // Prepare Display Data
    const heroStory = {
        title: getLocalized(cmsData?.heroStory?.title, cmsData?.heroStory?.title_en, ABOUT_HERO_DATA.story.title),
        subtitle: getLocalized(cmsData?.heroStory?.subtitle, cmsData?.heroStory?.subtitle_en, ABOUT_HERO_DATA.story.subtitle),
        tag: getLocalized(cmsData?.heroStory?.tag, cmsData?.heroStory?.tag_en, ABOUT_HERO_DATA.story.tag),
        path: cmsData?.heroStory?.path || ABOUT_HERO_DATA.story.path
    };

    // Merge Cards (CMS length might differ, map based on CMS if exists, else Static)
    // Strategy: If CMS cards exist and not empty, try to map them. 
    // BUT we need to match the static layout (3 cards). 
    // If CMS has fewer cards, we might break layout. 
    // Safest: Map static cards and try to find matching index in CMS.
    const displayCards = ABOUT_HERO_DATA.cards.map((staticCard, index) => {
        const cmsCard = cmsData?.heroCards?.[index];
        return {
            title: getLocalized(cmsCard?.title, cmsCard?.title_en, staticCard.title),
            subtitle: getLocalized(cmsCard?.subtitle, cmsCard?.subtitle_en, staticCard.subtitle),
            path: cmsCard?.path || staticCard.path,
            image: cmsCard?.image ? urlFor(cmsCard.image).url() : null // Image logic if needed later
        };
    });

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white">
            <HomeNavbar />

            <main className="w-full max-w-[1440px] mx-auto px-6 pt-32 desktop:px-[90px] desktop:pt-[165px] flex flex-col desktop:flex-row justify-center items-center desktop:items-start gap-8 desktop:gap-[18px] pb-20 desktop:pb-0">
                {/* Left Column - Main Story Card */}
                <Link
                    to={heroStory.path}
                    className="relative w-full max-w-[621px] min-h-[400px] desktop:min-h-0 desktop:h-[561px] bg-orange-100 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all flex flex-col p-8 desktop:p-0"
                >
                    {/* Circle Decoration */}
                    <div className="absolute w-[132px] h-[132px] left-[-126px] top-[531px] bg-red-500/0 rounded-full" />

                    {/* Content */}
                    <div className="relative desktop:absolute desktop:left-[58.5px] desktop:top-[60px] flex flex-col items-start z-10">
                        <h2 className="text-black/80 text-3xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[63px]">
                            {heroStory.title}
                        </h2>
                        <p className="text-black/80 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-normal desktop:leading-[24px] mt-4 desktop:mt-0">
                            {heroStory.subtitle}
                        </p>
                    </div>

                    {/* Tag */}
                    <div className="relative desktop:absolute desktop:right-[60px] desktop:bottom-[60px] text-left desktop:text-right text-neutral-900 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line mt-auto pt-8 desktop:pt-0 desktop:mt-0 z-10">
                        {heroStory.tag}
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute right-6 top-6 desktop:right-[45px] desktop:top-[70px] w-[48px] h-[48px] flex items-center justify-center z-20">
                        <div className="w-[36px] h-[36px] rounded-full outline outline-[1.8px] outline-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </Link>

                {/* Right Column - 3 Stacked Cards */}
                <div className="flex flex-col gap-4 desktop:gap-[15px] w-full max-w-[621px]">
                    {displayCards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.path}
                            className="relative w-full desktop:w-[621px] min-h-[160px] desktop:min-h-0 desktop:h-[180px] bg-orange-100 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all flex flex-col p-6 desktop:p-0"
                        >
                            {/* Circle Decoration */}
                            <div className="absolute w-[132px] h-[132px] left-[-126px] top-[156px] bg-red-500/0 rounded-full" />

                            {/* Content */}
                            <div className="relative desktop:absolute desktop:left-[48px] desktop:top-[43.5px] flex flex-col items-start z-10">
                                <h3 className="text-black/80 text-2xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[63px]">
                                    {card.title}
                                </h3>
                                <p className="text-black/80 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-normal desktop:leading-[24px] mt-2 desktop:mt-0">
                                    {card.subtitle}
                                </p>
                            </div>

                            <div className="relative desktop:absolute desktop:right-[60px] desktop:bottom-[30px] text-left desktop:text-right text-neutral-900 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line mt-auto pt-4 desktop:pt-0 desktop:mt-0 z-10">
                                {language === 'zh' ? '關於\n班厝' : 'about\nRUMAH PAPAN'}
                            </div>

                            {/* Arrow Icon */}
                            <div className="absolute right-4 top-4 desktop:right-[45px] desktop:top-[36px] w-[48px] h-[48px] flex items-center justify-center z-20">
                                <div className="w-[36px] h-[36px] rounded-full outline outline-[1.8px] outline-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};
