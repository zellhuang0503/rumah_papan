import React, { useState, useEffect } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { RENTAL_DATA } from '../data/aboutData';
import { MoveRight, ArrowUpRight } from 'lucide-react';
import { client, urlFor } from '../utils/sanity';

export const AboutRental: React.FC = () => {
    // Scaling Rules (1920 -> 1440, factor 0.75)
    const [data, setData] = useState(RENTAL_DATA);
    const [currentHighlight, setCurrentHighlight] = useState(0);

    useEffect(() => {
        const fetchRentalData = async () => {
            try {
                const aboutDoc = await client.fetch(`*[_type == "about"][0]`);
                if (aboutDoc && aboutDoc.rental) {
                    const r = aboutDoc.rental;
                    setData({
                        highlights: r.highlights?.map((h: any) => ({
                            title: h.title,
                            desc: h.desc,
                            image: h.image ? urlFor(h.image).url() : "https://placehold.co/1200x600"
                        })) || RENTAL_DATA.highlights,
                        process: r.process || RENTAL_DATA.process,
                        plans: r.plans || RENTAL_DATA.plans,
                        contact: r.contact || RENTAL_DATA.contact
                    });
                }
            } catch (err) {
                console.error("Failed to fetch rental data", err);
            }
        };
        fetchRentalData();
    }, []);

    const nextHighlight = () => {
        if (!data?.highlights) return;
        setCurrentHighlight((prev) => (prev + 1) % data.highlights.length);
    };

    const prevHighlight = () => {
        if (!data?.highlights) return;
        setCurrentHighlight((prev) => (prev - 1 + data.highlights.length) % data.highlights.length);
    };

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-[165px] gap-[160px]">
                {/* Header Group */}
                <div className="w-full flex flex-col items-center gap-[100px]">
                    {/* Page Title */}
                    <h1 className="text-black text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                        場地租借
                    </h1>

                    {/* Hero / Highlights Carousel */}
                    <section className="w-[1200px] h-[600px] relative rounded-[21px] overflow-hidden group">
                        {/* Background Images */}
                        {data?.highlights?.map((item, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentHighlight ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <div className="w-full h-full bg-neutral-800 relative">
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover opacity-70"
                                        alt={item.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                                </div>

                                <div className="absolute bottom-[60px] left-[60px] text-white">
                                    <h2 className="text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4] mb-[12px] drop-shadow-md">
                                        {item.title}
                                    </h2>
                                    <p className="text-[30px] font-bold font-['Noto_Sans_TC'] leading-[1.4] drop-shadow-md max-w-[900px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Controls Bottom Right */}
                        <div className="absolute bottom-[60px] right-[60px] z-20 flex items-center gap-[24px]">
                            <div className="flex gap-[12px]">
                                {data?.highlights?.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentHighlight(index)}
                                        className={`w-[12px] h-[12px] rounded-full border border-white transition-all ${index === currentHighlight ? 'bg-neutral-900 border-neutral-900 scale-125' : 'bg-transparent hover:bg-white/50'}`}
                                    />
                                ))}
                            </div>

                            <div className="flex gap-[12px]">
                                <button
                                    onClick={prevHighlight}
                                    className="w-[72px] h-[72px] rounded-full border-[2.25px] border-neutral-800 bg-white/50 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white transition-all"
                                >
                                    <MoveRight className="w-8 h-8 rotate-180" strokeWidth={1.5} />
                                </button>
                                <button
                                    onClick={nextHighlight}
                                    className="w-[72px] h-[72px] rounded-full border-[2.25px] border-neutral-800 bg-white/50 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white transition-all"
                                >
                                    <MoveRight className="w-8 h-8" strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Process Section */}
                <section className="w-[1200px] flex items-center justify-center">
                    <div className="flex items-end gap-[45px]">
                        <h2 className="text-black text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight mb-8 whitespace-nowrap">
                            租借流程
                        </h2>

                        <div className="w-[1047px] flex items-start justify-between relative">
                            {data?.process?.map((step: any, index: number) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col gap-[18px] w-[280px] relative z-10">
                                        <div className="flex items-center gap-[15px]">
                                            <div className="w-[54px] h-[54px] flex-shrink-0">
                                                {/* Reusing simple circle/numbered icon indicator if literal SVG is complex */}
                                                <div className="w-full h-full rounded-full border-2 border-black flex items-center justify-center font-bold text-xl">
                                                    {step.step || (index + 1).toString().padStart(2, '0')}
                                                </div>
                                            </div>
                                            <span className="text-neutral-900 text-[37.5px] font-semibold font-['Roboto_Slab'] leading-none">
                                                {step.step || (index + 1).toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-[9px]">
                                            <h3 className="text-neutral-900 text-[37.5px] font-bold font-['Noto_Sans_TC']">
                                                {step.title}
                                            </h3>
                                            <p className="text-neutral-900 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.4]">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {index < data.process.length - 1 && (
                                        <div className="pt-[10px]">
                                            <MoveRight className="w-10 h-10 text-black mt-8" />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Plans */}
                <section className="w-[1200px] flex flex-col items-center gap-[18px]">
                    <div className="text-center mb-[18px]">
                        <h2 className="text-black text-[45px] font-bold font-['Noto_Sans_TC']">
                            價目＆條件
                        </h2>
                        <p className="text-black text-[18px] font-medium opacity-80 mt-2">
                            提供的詳細條件與方案說明
                        </p>
                    </div>

                    <div className="w-full flex gap-[18px]">
                        {data?.plans?.map((plan: any, index: number) => (
                            <div key={index} className="flex-1 bg-transparent border-[2.25px] border-black rounded-[21px] p-[39px] flex flex-col justify-between min-h-[450px]">
                                <div className="flex flex-col gap-[9px]">
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC']">
                                        {plan.name}
                                    </h3>
                                    <h4 className="text-black text-[26px] font-bold font-['Noto_Sans_TC']">
                                        {plan.sub}
                                    </h4>
                                </div>
                                <div className="flex flex-col gap-[6px]">
                                    {plan?.items?.map((item: string, i: number) => (
                                        <p key={i} className="text-black text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.5]">
                                            • {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="w-[1200px] flex flex-col gap-[18px]">
                    <div className="w-full h-[345px] flex gap-[18px]">
                        <div className="w-[301px] bg-white rounded-[27px] p-[30px] flex flex-col justify-between shrink-0">
                            <div>
                                <h3 className="text-black text-[18px] font-serif font-medium leading-[1.45]">Contact us</h3>
                                <h2 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] mt-[6px] leading-[1.4]">聯絡方式</h2>
                            </div>
                            <p className="text-black text-[18px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">
                                {data?.contact?.desc}
                            </p>
                        </div>

                        <div className="flex-1 bg-white rounded-[27px] relative">
                            <div className="absolute bottom-[45px] left-0 w-full px-[60px] flex justify-between items-end">
                                <a href="https://www.facebook.com/RumahPapanPandamaran/" target="_blank" rel="noreferrer" className="flex flex-col gap-[6px] group cursor-pointer hover:opacity-70 transition-opacity">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-black text-[18px] font-medium font-serif leading-[1.45]">Facebook</span>
                                        <ArrowUpRight className="w-[18px] h-[18px] text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">聯繫班厝</h3>
                                </a>

                                <a href="https://www.instagram.com/rumah.papan/" target="_blank" rel="noreferrer" className="flex flex-col gap-[6px] group cursor-pointer hover:opacity-70 transition-opacity">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-black text-[18px] font-medium font-serif leading-[1.45]">Instagram</span>
                                        <ArrowUpRight className="w-[18px] h-[18px] text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">預約勘場</h3>
                                </a>

                                <a href="#" className="flex flex-col gap-[6px] group cursor-pointer hover:opacity-70 transition-opacity">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-black text-[18px] font-medium font-serif leading-[1.45]">WhatsApp</span>
                                        <ArrowUpRight className="w-[18px] h-[18px] text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">詢問檔期</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </main>
        </div>
    );
};
