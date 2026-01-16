import React, { useState, useEffect } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { ACTIVITIES_DATA } from '../data/villageData';
import { client, urlFor } from '../utils/sanity';

export const VillageActivities: React.FC = () => {
    // Scaling Rules (1920 -> 1440, 0.75x)
    // Global Spacing: 120px
    // Fonts: 72->54, 60->45, 48->36, 30->22.5, 24->18
    // Card Width: 621px (was 828)
    // Card Height: 288px (was 384/404)
    // Card Padding: 30px 60px (was 40 80)

    const [data, setData] = useState(ACTIVITIES_DATA);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const villageDoc = await client.fetch(`*[_type == "village"][0]`);
                if (villageDoc && villageDoc.activities) {
                    const act = villageDoc.activities;
                    setData({
                        hero: { title: act.heroTitle || ACTIVITIES_DATA.hero.title },
                        items: act.items?.map((item: any) => ({
                            title: item.title,
                            desc: item.desc,
                            image: item.image ? urlFor(item.image).url() : "https://placehold.co/828x384"
                        })) || ACTIVITIES_DATA.items,
                        quote: {
                            title: act.quote?.title || ACTIVITIES_DATA.quote.title,
                            desc: act.quote?.desc || ACTIVITIES_DATA.quote.desc
                        },
                        notices: act.notices || ACTIVITIES_DATA.notices
                    });
                }
            } catch (err) {
                console.error("Failed to fetch village activities", err);
            }
        };
        fetchActivities();
    }, []);

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-[165px] gap-[160px]">
                {/* Page Title */}
                <h1 className="text-black text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                    {data.hero.title}
                </h1>

                {/* Zigzag Activities List */}
                <section className="w-[1200px] flex flex-col gap-[40px]">
                    {data.items.map((item, index) => (
                        <div key={index} className={`flex items-center gap-[27px] ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'} justify-center`}>
                            {/* Text Card */}
                            <div className="w-[621px] h-[288px] bg-white rounded-[18px] px-[30px] flex flex-col justify-center items-start gap-[18px] overflow-hidden shadow-sm">
                                <h2 className="text-black/80 text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight">
                                    {item.title}
                                </h2>
                                <p className="text-black/80 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.4] text-justify">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Image Card */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-[621px] h-[288px] rounded-[18px] object-cover shadow-sm"
                            />
                        </div>
                    ))}
                </section>

                {/* Quote Section */}
                <section className="w-[1200px] flex items-end justify-center gap-[120px]">
                    <h2 className="text-neutral-900 text-[36px] font-bold font-['Noto_Sans_TC'] leading-[1.45] whitespace-nowrap">
                        {data.quote.title}
                    </h2>
                    <p className="w-[527px] text-neutral-900 text-[22.5px] font-medium font-['Noto_Sans_TC'] leading-[1.4]">
                        {data.quote.desc}
                    </p>
                </section>

                {/* Notices Section */}
                <section className="w-[1200px] flex flex-col items-center gap-[0px]">
                    {/* Title */}
                    <h2 className="text-black text-[45px] font-bold font-['Noto_Sans_TC'] leading-[1.4] mb-[9px] w-[1152px] text-left">
                        注意事項
                    </h2>

                    <div className="w-full flex flex-col items-center">
                        {data.notices.map((notice, index) => (
                            <div key={index} className="w-[1152px] py-[48px] border-b border-neutral-900 flex flex-col gap-[24px]">
                                <div className="flex items-center gap-[24px]">
                                    <span className="text-neutral-900 text-[36px] font-semibold font-['Roboto_Slab'] leading-none mt-1">
                                        {notice.id || (index + 1).toString().padStart(2, '0')}
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
