import React from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ABOUT_HERO_DATA } from '../data/aboutData';

export const About: React.FC = () => {
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

            <main className="w-full max-w-[1440px] mx-auto px-[90px] pt-[165px] flex justify-center items-start gap-[18px]">
                {/* Left Column - Main Story Card */}
                <Link
                    to={ABOUT_HERO_DATA.story.path}
                    className="relative w-[621px] h-[561px] bg-orange-100 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all"
                >
                    {/* Circle Decoration */}
                    <div className="absolute w-[132px] h-[132px] left-[-126px] top-[531px] bg-red-500/0 rounded-full" />

                    {/* Content */}
                    <div className="absolute left-[58.5px] top-[60px] flex flex-col items-start">
                        <h2 className="text-black/80 text-[45px] font-bold font-['Noto_Sans_TC'] leading-[63px]">
                            {ABOUT_HERO_DATA.story.title}
                        </h2>
                        <p className="text-black/80 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                            {ABOUT_HERO_DATA.story.subtitle}
                        </p>
                    </div>

                    {/* Tag */}
                    <div className="absolute right-[60px] bottom-[60px] text-right text-neutral-900 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line">
                        {ABOUT_HERO_DATA.story.tag}
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute right-[45px] top-[70px] w-[48px] h-[48px] flex items-center justify-center">
                        <div className="w-[36px] h-[36px] rounded-full outline outline-[1.8px] outline-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </Link>

                {/* Right Column - 3 Stacked Cards */}
                <div className="flex flex-col gap-[15px]">
                    {ABOUT_HERO_DATA.cards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.path}
                            className="relative w-[621px] h-[180px] bg-orange-100 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all"
                        >
                            {/* Circle Decoration */}
                            <div className="absolute w-[132px] h-[132px] left-[-126px] top-[156px] bg-red-500/0 rounded-full" />

                            {/* Content */}
                            <div className="absolute left-[48px] top-[43.5px] flex flex-col items-start">
                                <h3 className="text-black/80 text-[45px] font-bold font-['Noto_Sans_TC'] leading-[63px]">
                                    {card.title}
                                </h3>
                                <p className="text-black/80 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                                    {card.subtitle}
                                </p>
                            </div>

                            {/* Tag */}
                            <div className="absolute right-[60px] bottom-[30px] text-right text-neutral-900 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line">
                                about {'\n'}RUMAH PAPAN
                            </div>

                            {/* Arrow Icon */}
                            <div className="absolute right-[45px] top-[36px] w-[48px] h-[48px] flex items-center justify-center">
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
