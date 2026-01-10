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

            <main className="w-full relative flex flex-col items-center pt-[165px] gap-[120px]">
                {/* Header Section */}
                <div className="flex flex-col items-center gap-[72px]">
                    <h1 className="text-black text-[54px] font-bold font-['Noto_Sans_TC'] leading-[75.6px] text-center">
                        農作產品
                    </h1>

                    {/* Grid Section */}
                    <div className="w-[1440px] flex flex-wrap justify-center gap-[18px] px-[90px]">
                        {PRODUCTS_DATA.map((item, index) => (
                            <div key={index} className="w-[408px] flex flex-col items-start shadow-md rounded-[18px]">
                                <img
                                    className="w-full h-[340.5px] object-cover rounded-t-[18px]"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <div className="self-stretch px-[24px] pt-[15px] pb-[30px] bg-white rounded-b-[18px] flex flex-col justify-start items-start gap-[7.5px]">
                                    <div className="self-stretch flex flex-col justify-center items-start gap-[9px]">
                                        <h3 className="self-stretch text-neutral-900 text-[36px] font-bold font-['Noto_Sans_TC'] leading-[52.5px]">
                                            {item.title}
                                        </h3>
                                        <p className="self-stretch text-neutral-900 text-[18px] font-bold font-['Noto_Sans_TC'] leading-[24px] whitespace-pre-line">
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
