import React, { useState, useEffect } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { ENVIRONMENT_DATA } from '../data/aboutData';
import { client, urlFor } from '../utils/sanity';

export const AboutEnvironment: React.FC = () => {
    // Scaling Rules (1920 -> 1440, factor 0.75)
    // Padding Top: 220px (from design) -> 165px?? 
    // Wait, previous design had "pb-20 left-0 top-0 absolute bg-orange-100 inline-flex flex-col justify-start items-center gap-24".
    // 24 (96px) -> 72px gap.
    // Title Size: 7xl (72px) -> 54px.
    // Card Width: 544px -> 408px.
    // Card Image Height: 454px -> 340.5px.
    // Font 5xl (48px) -> 36px.
    // Font 2xl (24px) -> 18px.

    const [items, setItems] = useState(ENVIRONMENT_DATA);

    useEffect(() => {
        const fetchEnvironment = async () => {
            try {
                const aboutDoc = await client.fetch(`*[_type == "about"][0]`);
                if (aboutDoc && aboutDoc.environment) {
                    const mapped = aboutDoc.environment.map((item: any) => ({
                        title: item.title,
                        desc: item.desc,
                        image: item.image ? urlFor(item.image).url() : "https://placehold.co/408x341"
                    }));
                    setItems(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch environment data", err);
            }
        };
        fetchEnvironment();
    }, []);

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-[165px] gap-[120px]">
                {/* Header Section */}
                <div className="flex flex-col items-center gap-[72px]">
                    <h1 className="text-black text-[54px] font-bold font-['Noto_Sans_TC'] leading-[75.6px] text-center">
                        環境介紹
                    </h1>

                    {/* Grid Section */}
                    <div className="w-[1440px] flex flex-wrap justify-center gap-[18px] px-[90px]">
                        {items.map((item, index) => (
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
