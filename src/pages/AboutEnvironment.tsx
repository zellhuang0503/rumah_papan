import React from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getEnvironmentData } from '../data/aboutData';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutEnvironment: React.FC = () => {
    const { language } = useLanguage();
    const ENVIRONMENT_DATA = getEnvironmentData(language);

    // Scaling Rules (1920 -> 1440, factor 0.75)
    // Padding Top: 220px (from design) -> 165px?? 
    // Wait, previous design had "pb-20 left-0 top-0 absolute bg-orange-100 inline-flex flex-col justify-start items-center gap-24".
    // 24 (96px) -> 72px gap.
    // Title Size: 7xl (72px) -> 54px.
    // Card Width: 544px -> 408px.
    // Card Image Height: 454px -> 340.5px.
    // Font 5xl (48px) -> 36px.
    // Font 2xl (24px) -> 18px.

    // Layout:
    // Navbar at top.
    // Content starts below navbar.
    // Title is "環境介紹" centered-ish.
    // Grid of cards below.

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
                        {ENVIRONMENT_DATA.map((item, index) => (
                            <div key={index} className="w-full max-w-[408px] flex flex-col items-start shadow-md rounded-[18px]">
                                <img
                                    className="w-full h-auto aspect-[408/340.5] object-cover rounded-t-[18px]"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <div className="self-stretch px-6 pt-[15px] pb-[30px] bg-white rounded-b-[18px] flex flex-col justify-start items-start gap-[7.5px]">
                                    <div className="self-stretch flex flex-col justify-center items-start gap-[9px]">
                                        <h3 className="self-stretch text-neutral-900 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[52.5px]">
                                            {item.title}
                                        </h3>
                                        <p className="self-stretch text-neutral-900 text-base desktop:text-[18px] font-bold font-['Noto_Sans_TC'] leading-normal desktop:leading-[24px] whitespace-pre-line">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <SiteFooter />
            </main>
        </div>
    );
};
