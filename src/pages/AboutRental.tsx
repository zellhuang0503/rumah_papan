<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======

import React, { useState } from 'react';
>>>>>>> main
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getRentalData } from '../data/aboutData';
import { useLanguage } from '../contexts/LanguageContext';
import { MoveRight, ArrowUpRight } from 'lucide-react';
import { client, urlFor } from '../utils/sanity';

export const AboutRental: React.FC = () => {
    const { language } = useLanguage();
    const RENTAL_DATA = getRentalData(language);

    // Scaling Rules (1920 -> 1440, factor 0.75)
<<<<<<< HEAD
    const [data, setData] = useState(RENTAL_DATA);
=======
    // Width: 1680 * 0.75 = 1260px
    // Spacing: 120 * 0.75 = 90px
    // Fonts: 72->54, 60->45, 50->37.5, 24->18

    // Translations
    const labels = {
        title: language === 'zh' ? '場地租借' : 'Venue Rental',
        process: language === 'zh' ? '租借流程' : 'Rental Process',
        pricing: language === 'zh' ? '價目＆條件' : 'Pricing & Terms',
        pricingDesc: language === 'zh' ? '提供的詳細條件並整理成兩個「方案」' : 'Detailed terms arranged in two plans',
        contactTitle: language === 'zh' ? '聯絡方式' : 'Contact Info',
        contactRP: language === 'zh' ? '聯繫班厝' : 'Contact RP',
        bookVisit: language === 'zh' ? '預約勘場' : 'Book Visit',
        checkAvailability: language === 'zh' ? '詢問檔期' : 'Check Availability'
    };

    // Carousel State
>>>>>>> main
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

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-20 desktop:gap-[160px] px-6 desktop:px-0">
                {/* Header Group */}
                <div className="w-full flex flex-col items-center gap-12 desktop:gap-[100px]">
                    {/* Page Title */}
                    <h1 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                        {labels.title}
                    </h1>

                    {/* Hero / Highlights Carousel */}
                    <section className="w-full max-w-[1200px] h-[400px] desktop:h-[600px] relative rounded-[21px] overflow-hidden group">
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

<<<<<<< HEAD
                                <div className="absolute bottom-[60px] left-[60px] text-white">
                                    <h2 className="text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4] mb-[12px] drop-shadow-md">
=======
                                {/* Text Content - Bottom Left - Scaled Padding */}
                                <div className="absolute bottom-6 left-6 desktop:bottom-[60px] desktop:left-[60px] text-white">
                                    <h2 className="text-2xl desktop:text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4] mb-2 desktop:mb-[12px] drop-shadow-md">
>>>>>>> main
                                        {item.title}
                                    </h2>
                                    <p className="text-lg desktop:text-[30px] font-bold font-['Noto_Sans_TC'] leading-[1.4] drop-shadow-md max-w-[900px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

<<<<<<< HEAD
                        {/* Controls Bottom Right */}
                        <div className="absolute bottom-[60px] right-[60px] z-20 flex items-center gap-[24px]">
                            <div className="flex gap-[12px]">
                                {data?.highlights?.map((_, index) => (
=======
                        {/* Controls Bottom Right (Dots + Arrows) */}
                        <div className="absolute bottom-6 right-6 desktop:bottom-[60px] desktop:right-[60px] z-20 flex items-center gap-4 desktop:gap-[24px]">
                            {/* Dots */}
                            <div className="flex gap-[12px] bg-red-500/0 p-2 text-white">
                                {RENTAL_DATA?.highlights?.map((_, index) => (
>>>>>>> main
                                    <button
                                        key={index}
                                        onClick={() => setCurrentHighlight(index)}
                                        className={`w-[12px] h-[12px] rounded-full border border-white transition-all ${index === currentHighlight ? 'bg-neutral-900 border-neutral-900 scale-125' : 'bg-transparent hover:bg-white/50'}`}
                                    />
                                ))}
                            </div>

<<<<<<< HEAD
                            <div className="flex gap-[12px]">
=======
                            {/* Arrows - Hidden on Mobile, Visible on Desktop */}
                            <div className="hidden desktop:flex gap-[12px]">
>>>>>>> main
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

<<<<<<< HEAD
                {/* Process Section */}
                <section className="w-[1200px] flex items-center justify-center">
                    <div className="flex items-end gap-[45px]">
                        <h2 className="text-black text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight mb-8 whitespace-nowrap">
                            租借流程
                        </h2>

                        <div className="w-[1047px] flex items-start justify-between relative">
                            {data?.process?.map((step: any, index: number) => (
=======
                {/* Process Section - Horizontal Layout */}
                <section className="w-full max-w-[1200px] flex items-center justify-center">
                    <div className="w-full flex flex-col desktop:flex-row desktop:items-end gap-12 desktop:gap-[45px]">
                        <h2 className="text-black text-3xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight mb-0 desktop:mb-8 whitespace-nowrap text-center desktop:text-left">
                            {labels.process}
                        </h2>

                        <div className="w-full flex flex-col desktop:flex-row items-center desktop:items-start justify-between relative gap-12 desktop:gap-0">
                            {RENTAL_DATA?.process?.map((step, index) => (
>>>>>>> main
                                <React.Fragment key={index}>
                                    <div className="flex flex-col gap-[18px] w-full desktop:w-[280px] relative z-10 items-center desktop:items-start text-center desktop:text-left">
                                        <div className="flex items-center gap-[15px]">
                                            <div className="w-[54px] h-[54px] flex-shrink-0">
                                                {/* Reusing simple circle/numbered icon indicator if literal SVG is complex */}
                                                <div className="w-full h-full rounded-full border-2 border-black flex items-center justify-center font-bold text-xl">
                                                    {step.step || (index + 1).toString().padStart(2, '0')}
                                                </div>
                                            </div>
<<<<<<< HEAD
                                            <span className="text-neutral-900 text-[37.5px] font-semibold font-['Roboto_Slab'] leading-none">
                                                {step.step || (index + 1).toString().padStart(2, '0')}
=======
                                            <span className="text-neutral-900 text-2xl desktop:text-[37.5px] font-semibold font-['Roboto_Slab'] leading-none">
                                                {step.step}
>>>>>>> main
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2 desktop:gap-[9px]">
                                            <h3 className="text-neutral-900 text-2xl desktop:text-[37.5px] font-bold font-['Noto_Sans_TC']">
                                                {step.title}
                                            </h3>
                                            <p className="text-neutral-900 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.4]">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>

<<<<<<< HEAD
                                    {index < data.process.length - 1 && (
                                        <div className="pt-[10px]">
                                            <MoveRight className="w-10 h-10 text-black mt-8" />
=======
                                    {/* Arrow except last */}
                                    {index < RENTAL_DATA.process.length - 1 && (
                                        <div className="hidden desktop:block pt-[10px]">
                                            <svg width="60" viewBox="0 0 130 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-8">
                                                <path d="M0 -2C-1.10457 -2 -2 -1.10457 -2 0C-2 1.10457 -1.10457 2 0 2V0V-2ZM131.414 1.41421C132.195 0.633165 132.195 -0.633165 131.414 -1.41421L118.686 -14.1421C117.905 -14.9232 116.639 -14.9232 115.858 -14.1421C115.077 -13.3611 115.077 -12.0948 115.858 -11.3137L127.172 0L115.858 11.3137C115.077 12.0948 115.077 13.3611 115.858 14.1421C116.639 14.9232 117.905 14.9232 118.686 14.1421L131.414 1.41421ZM0 0V2H130V0V-2H0V0Z" fill="#181818" transform="scale(0.6) translate(0, 10)" />
                                            </svg>
>>>>>>> main
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Plans */}
                <section className="w-full max-w-[1200px] flex flex-col items-center gap-[18px]">
                    <div className="text-center mb-[18px]">
                        <h2 className="text-black text-3xl desktop:text-[45px] font-bold font-['Noto_Sans_TC']">
                            {labels.pricing}
                        </h2>
<<<<<<< HEAD
                        <p className="text-black text-[18px] font-medium opacity-80 mt-2">
                            提供的詳細條件與方案說明
                        </p>
                    </div>

                    <div className="w-full flex gap-[18px]">
                        {data?.plans?.map((plan: any, index: number) => (
                            <div key={index} className="flex-1 bg-transparent border-[2.25px] border-black rounded-[21px] p-[39px] flex flex-col justify-between min-h-[450px]">
=======
                        <p className="text-black text-base desktop:text-[18px] font-medium opacity-80 mt-2">
                            {labels.pricingDesc}
                        </p>
                    </div>

                    <div className="w-full flex flex-col desktop:flex-row gap-6 desktop:gap-[18px]">
                        {RENTAL_DATA?.plans?.map((plan, index) => (
                            <div key={index} className="flex-1 bg-transparent border-[2.25px] border-black rounded-[21px] p-8 desktop:p-[39px] flex flex-col justify-between min-h-[auto] desktop:min-h-[450px]">
>>>>>>> main
                                <div className="flex flex-col gap-[9px]">
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC']">
                                        {plan.name}
                                    </h3>
                                    <h4 className="text-black text-[26px] font-bold font-['Noto_Sans_TC']">
                                        {plan.sub}
                                    </h4>
                                </div>
<<<<<<< HEAD
                                <div className="flex flex-col gap-[6px]">
                                    {plan?.items?.map((item: string, i: number) => (
                                        <p key={i} className="text-black text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.5]">
                                            • {item}
=======
                                <div className="flex flex-col gap-[6px] mt-6 desktop:mt-0">
                                    {plan?.items?.map((item, i) => (
                                        <p key={i} className="text-black text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.5]">
                                            {item}
>>>>>>> main
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
<<<<<<< HEAD
                <section className="w-[1200px] flex flex-col gap-[18px]">
                    <div className="w-full h-[345px] flex gap-[18px]">
                        <div className="w-[301px] bg-white rounded-[27px] p-[30px] flex flex-col justify-between shrink-0">
=======
                <section className="w-full max-w-[1200px] flex flex-col gap-[18px]">
                    <div className="w-full flex flex-col desktop:flex-row desktop:h-[345px] gap-6 desktop:gap-[18px]">
                        {/* Left Contact Card */}
                        <div className="w-full desktop:w-[301px] bg-white rounded-[27px] p-[30px] flex flex-col justify-between shrink-0 h-auto desktop:h-full gap-8 desktop:gap-0">
>>>>>>> main
                            <div>
                                <h3 className="text-black text-[18px] font-serif font-medium leading-[1.45]">Contact us</h3>
                                <h2 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] mt-[6px] leading-[1.4]">{labels.contactTitle}</h2>
                            </div>
                            <p className="text-black text-[18px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">
                                {data?.contact?.desc}
                            </p>
                        </div>

<<<<<<< HEAD
                        <div className="flex-1 bg-white rounded-[27px] relative">
                            <div className="absolute bottom-[45px] left-0 w-full px-[60px] flex justify-between items-end">
=======
                        {/* Right Social Card - Single Large Card */}
                        <div className="w-full desktop:flex-1 bg-white rounded-[27px] relative h-auto desktop:h-full flex flex-col justify-end">
                            {/* Social Links Container - Positioned at bottom */}
                            <div className="relative desktop:absolute inset-auto desktop:bottom-[45px] desktop:left-0 w-full px-8 pb-8 desktop:px-[60px] desktop:pb-0 flex flex-col desktop:flex-row desktop:justify-between items-start desktop:items-end gap-8 desktop:gap-0 pt-8 desktop:pt-0">
                                {/* Facebook */}
>>>>>>> main
                                <a href="https://www.facebook.com/RumahPapanPandamaran/" target="_blank" rel="noreferrer" className="flex flex-col gap-[6px] group cursor-pointer hover:opacity-70 transition-opacity">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-black text-[18px] font-medium font-serif leading-[1.45]">Facebook</span>
                                        <ArrowUpRight className="w-[18px] h-[18px] text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">{labels.contactRP}</h3>
                                </a>

                                <a href="https://www.instagram.com/rumah.papan/" target="_blank" rel="noreferrer" className="flex flex-col gap-[6px] group cursor-pointer hover:opacity-70 transition-opacity">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-black text-[18px] font-medium font-serif leading-[1.45]">Instagram</span>
                                        <ArrowUpRight className="w-[18px] h-[18px] text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">{labels.bookVisit}</h3>
                                </a>

                                <a href="#" className="flex flex-col gap-[6px] group cursor-pointer hover:opacity-70 transition-opacity">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-black text-[18px] font-medium font-serif leading-[1.45]">WhatsApp</span>
                                        <ArrowUpRight className="w-[18px] h-[18px] text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">{labels.checkAvailability}</h3>
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
