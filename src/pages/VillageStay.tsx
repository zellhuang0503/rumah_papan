import React from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getStayData } from '../data/villageData';
import { useLanguage } from '../contexts/LanguageContext';

export const VillageStay: React.FC = () => {
    const { language } = useLanguage();
    const STAY_DATA = getStayData(language);

    // Scaling Rules (1920 -> 1440, 0.75x)
    // Global Spacing: 160px
    // Fonts: 72->54, 60->45, 48->36, 30->22.5, 24->18
    // Card Width: 621px (was 828)
    // Card Height: 288px (was 384/404)
    // Card Padding: 30px 60px (was 40 80)

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-[165px] gap-[160px]">
                {/* Page Title */}
                <h1 className="text-black text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                    {STAY_DATA.hero.title}
                </h1>

                {/* Zigzag Room List */}
                <section className="w-[1200px] flex flex-col gap-[40px]">
                    {STAY_DATA.rooms.map((room, index) => (
                        <div key={index} className={`flex items-center gap-[27px] ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'} justify-center`}>
                            {/* Text Card */}
                            <div className="w-[621px] h-[288px] bg-white rounded-[18px] px-[30px] flex flex-col justify-center items-start gap-[18px] overflow-hidden shadow-sm">
                                <h2 className="text-black/80 text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight">
                                    {room.title}
                                </h2>
                                <p className="text-black/80 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.4] text-justify">
                                    {room.desc}
                                </p>
                            </div>

                            {/* Image Card */}
                            <img
                                src={room.image}
                                alt={room.title}
                                className="w-[621px] h-[288px] rounded-[18px] object-cover shadow-sm"
                            />
                        </div>
                    ))}
                </section>

                {/* Quote Section */}
                <section className="w-[1200px] flex items-end justify-center gap-[120px]">
                    <h2 className="text-neutral-900 text-[36px] font-bold font-['Noto_Sans_TC'] leading-[1.45] whitespace-nowrap">
                        {STAY_DATA.quote.title}
                    </h2>
                    <p className="w-[527px] text-neutral-900 text-[22.5px] font-medium font-['Noto_Sans_TC'] leading-[1.4] whitespace-pre-line">
                        {STAY_DATA.quote.desc}
                    </p>
                </section>

                {/* Booking Section */}
                <section className="w-[1200px] px-[84px] py-[72px] bg-white rounded-[18px] flex justify-between items-center shadow-sm">
                    <h2 className="text-black text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">
                        {STAY_DATA.booking.title}
                    </h2>

                    {/* Outline Button */}
                    <button className="px-[24px] py-[12px] rounded-full border-[2.4px] border-neutral-800 flex justify-center items-center gap-[6px] hover:bg-neutral-50 transition-colors">
                        <div className="w-[24px] h-[24px] relative">
                            {/* Simple Icon placeholder matching Figma outline style */}
                            <div className="w-[18px] h-[21px] left-[3px] top-[2px] absolute bg-neutral-900"></div>
                        </div>
                        <span className="text-neutral-900 text-[18px] font-bold font-['Noto_Sans_TC'] leading-[1.5]">
                            {STAY_DATA.booking.button}
                        </span>
                    </button>
                </section>

                {/* Notices Section */}
                <section className="w-[1200px] flex flex-col items-center gap-[0px]">
                    {/* Title */}
                    <h2 className="text-black text-[45px] font-bold font-['Noto_Sans_TC'] leading-[1.4] mb-[9px] w-[1152px] text-left">
                        注意事項
                    </h2>

                    <div className="w-full flex flex-col items-center">
                        {STAY_DATA.notices.map((notice, index) => (
                            <div key={index} className="w-[1152px] py-[48px] border-b border-neutral-900 flex flex-col gap-[24px]">
                                <div className="flex items-center gap-[24px]">
                                    <span className="text-neutral-900 text-[36px] font-semibold font-['Roboto_Slab'] leading-none mt-1">
                                        {notice.id}
                                    </span>
                                    <h3 className="text-neutral-900 text-[36px] font-bold font-['Noto_Sans_TC'] leading-none">
                                        {notice.title}
                                    </h3>
                                </div>
                                <p className="text-black/80 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.4] whitespace-pre-line">
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
