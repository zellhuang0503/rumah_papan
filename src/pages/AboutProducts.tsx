import React from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { PRODUCTS_DATA } from '../data/aboutData';

export const AboutProducts: React.FC = () => {
    // Reuse dimensions from Environment Page
    // Title: "農作產品"

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-12 desktop:gap-[120px]">
                {/* Header Section */}
                <div className="w-full flex flex-col items-center gap-8 desktop:gap-[72px]">
                    <h1 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[75.6px] text-center">
                        農作產品
                    </h1>

                    {/* Grid Section */}
                    <div className="w-full max-w-[1440px] flex flex-wrap justify-center gap-6 desktop:gap-[18px] px-6 desktop:px-[90px]">
                        {PRODUCTS_DATA.map((item, index) => (
                            <div key={index} className="w-full max-w-[408px] flex flex-col items-start shadow-md rounded-[18px]">
                                <div className="w-full aspect-[408/340.5] relative overflow-hidden rounded-t-[18px]">
                                    <img
                                        className={`w-full h-full object-cover ${(item as any).imagePosition || ''}`}
                                        src={item.image}
                                        alt={item.title}
                                        style={(item as any).imageScale ? { transform: `scale(${(item as any).imageScale})` } : {}}
                                    />
                                </div>
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
