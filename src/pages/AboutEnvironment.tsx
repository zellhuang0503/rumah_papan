import React, { useEffect, useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getEnvironmentData } from '../data/aboutData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';

interface EnvironmentItem {
    title?: string;
    title_en?: string;
    desc?: string;
    desc_en?: string;
    image?: any;
    _key?: string;
}

export const AboutEnvironment: React.FC = () => {
    const { language } = useLanguage();
    const ENVIRONMENT_DATA = getEnvironmentData(language);

    const [cmsItems, setCmsItems] = useState<EnvironmentItem[]>([]);

    useEffect(() => {
        const fetchEnvironment = async () => {
            try {
                // Fetch only the environment array
                const data = await client.fetch<{ environment: EnvironmentItem[] }>(`*[_type == "about"][0]{environment}`);
                if (data?.environment) {
                    setCmsItems(data.environment);
                }
            } catch (error) {
                console.error("Failed to fetch environment data", error);
            }
        };
        fetchEnvironment();
    }, []);

    // Helper to get localized string with fallback
    const getLocalized = (zh: string | undefined, en: string | undefined, fallback: string) => {
        if (language === 'en') return en || zh || fallback;
        return zh || fallback;
    };

    // Determine Source to Iterate
    // If CMS has items, use them (and fallback to static items by index for images if needed)
    // If CMS is empty, use Static list entirely.
    const useCmsList = cmsItems.length > 0;
    const listToRender = useCmsList ? cmsItems : ENVIRONMENT_DATA;

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-12 desktop:gap-[120px]">
                {/* Header Section */}
                <div className="w-full flex flex-col items-center gap-8 desktop:gap-[72px]">
                    <h1 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[75.6px] text-center">
                        {language === 'zh' ? '環境介紹' : 'Environment'}
                    </h1>

                    {/* Grid Section */}
                    <div className="w-full max-w-[1440px] flex flex-wrap justify-center gap-6 desktop:gap-[18px] px-6 desktop:px-[90px]">
                        {listToRender.map((item: any, index: number) => {
                            // Logic:
                            // If iterating CMS item: use its fields, fallback to static[index] fields
                            // If iterating Static item: use its fields directly (which are already localized via getEnvironmentData above, wait... NO)
                            // getEnvironmentData returns ALREADY localized strings based on `language` passed to it?
                            // Yes: `const ENVIRONMENT_DATA = getEnvironmentData(language);`

                            // So if useCmsList is FALSE, `item` is a static item with simple title/desc/image.
                            // If useCmsList is TRUE, `item` is a CMS item with `title`, `title_en`, `image` object.

                            let displayTitle, displayDesc, displayImage;

                            if (useCmsList) {
                                const cmsItem = item as EnvironmentItem;
                                const staticItem = ENVIRONMENT_DATA[index]; // Fallback Static Item

                                displayTitle = getLocalized(cmsItem.title, cmsItem.title_en, staticItem?.title || "");
                                displayDesc = getLocalized(cmsItem.desc, cmsItem.desc_en, staticItem?.desc || "");
                                displayImage = cmsItem.image ? urlFor(cmsItem.image).url() : staticItem?.image;
                            } else {
                                // Static item
                                displayTitle = item.title;
                                displayDesc = item.desc;
                                displayImage = item.image;
                            }

                            return (
                                <div key={index} className="w-full max-w-[408px] flex flex-col items-start shadow-md rounded-[18px]">
                                    {displayImage && (
                                        <img
                                            className="w-full h-auto aspect-[408/340.5] object-cover rounded-t-[18px]"
                                            src={displayImage}
                                            alt={displayTitle}
                                        />
                                    )}
                                    <div className="self-stretch px-6 pt-[15px] pb-[30px] bg-white rounded-b-[18px] flex flex-col justify-start items-start gap-[7.5px]">
                                        <div className="self-stretch flex flex-col justify-center items-start gap-[9px]">
                                            <h3 className="self-stretch text-neutral-900 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[52.5px]">
                                                {displayTitle}
                                            </h3>
                                            <p className="self-stretch text-neutral-900 text-base desktop:text-[18px] font-bold font-['Noto_Sans_TC'] leading-normal desktop:leading-[24px] whitespace-pre-line">
                                                {displayDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <SiteFooter />
            </main>
        </div>
    );
};
