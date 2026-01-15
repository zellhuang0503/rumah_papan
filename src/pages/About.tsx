
import React from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAboutHeroData } from '../data/aboutData';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
    const { language } = useLanguage();
    const ABOUT_HERO_DATA = getAboutHeroData(language);

    // Scaling Rules (1920 -> 1440, factor 0.75)
    // Padding Top: 220px -> 165px
    // Padding X: 120px -> 90px
    // Gap: 24px -> 18px

    // Left Card:
    // W 828 -> 621px
    // H 748 -> 561px
    // Rounded 24px -> 18px
    // Outline 2px -> 1.5px (use 2px for visibility or 1.5px if possible, Tailwind default is fine, usually 1px or 2px. Design says 2px, scaled 1.5px. I'll use 2px for crispness or custom.)

    // Typography:
    // 6xl (60px) -> 45px
    // 2xl (24px) -> 18px
    // xl (20px) -> 15px

    // Right Cards:
    // H 240px -> 180px
    // Gap 20px -> 15px

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white">
            <HomeNavbar />

            <main className="w-full max-w-[1440px] mx-auto px-6 pt-32 desktop:px-[90px] desktop:pt-[165px] flex flex-col desktop:flex-row justify-center items-center desktop:items-start gap-8 desktop:gap-[18px] pb-20 desktop:pb-0">
                {/* Left Column - Main Story Card */}
                <Link
                    to={ABOUT_HERO_DATA.story.path}
                    className="relative w-full max-w-[621px] min-h-[400px] desktop:min-h-0 desktop:h-[561px] bg-orange-100 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all flex flex-col p-8 desktop:p-0"
                >
                    {/* Circle Decoration */}
                    <div className="absolute w-[132px] h-[132px] left-[-126px] top-[531px] bg-red-500/0 rounded-full" />

                    {/* Content */}
                    <div className="relative desktop:absolute desktop:left-[58.5px] desktop:top-[60px] flex flex-col items-start z-10">
                        <h2 className="text-black/80 text-3xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[63px]">
                            {ABOUT_HERO_DATA.story.title}
                        </h2>
                        <p className="text-black/80 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-normal desktop:leading-[24px] mt-4 desktop:mt-0">
                            {ABOUT_HERO_DATA.story.subtitle}
                        </p>
                    </div>

                    {/* Tag */}
                    <div className="relative desktop:absolute desktop:right-[60px] desktop:bottom-[60px] text-left desktop:text-right text-neutral-900 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line mt-auto pt-8 desktop:pt-0 desktop:mt-0 z-10">
                        {ABOUT_HERO_DATA.story.tag}
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
                    {ABOUT_HERO_DATA.cards.map((card, index) => (
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

                            {/* Tag */}
                            <div className="relative desktop:absolute desktop:right-[60px] desktop:bottom-[30px] text-left desktop:text-right text-neutral-900 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line mt-auto pt-4 desktop:pt-0 desktop:mt-0 z-10">
                                about {'\n'}RUMAH PAPAN
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
