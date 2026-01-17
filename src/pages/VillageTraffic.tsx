<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { TRAFFIC_DATA } from '../data/villageData';
import { client } from '../utils/sanity';
=======

import React from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getTrafficData } from '../data/villageData';
import { useLanguage } from '../contexts/LanguageContext';
>>>>>>> main

export const VillageTraffic: React.FC = () => {
    const { language } = useLanguage();
    const TRAFFIC_DATA = getTrafficData(language);

    // Layout Rules:
    // Global Width: 1200px (Desktop) -> Fluid (Mobile)
    // Global Spacing: 160px (Desktop) -> 80px (Mobile)
    // Scaling: 0.75x

    const [data, setData] = useState(TRAFFIC_DATA);

    useEffect(() => {
        const fetchTraffic = async () => {
            try {
                const villageDoc = await client.fetch(`*[_type == "village"][0]`);
                if (villageDoc && villageDoc.traffic) {
                    const tr = villageDoc.traffic;
                    // Note: map (googleMapLink) is kept static in component or merged here if needed.
                    // The schema has map: { address, googleMapLink }

                    setData({
                        hero: { title: tr.heroTitle || TRAFFIC_DATA.hero.title },
                        map: {
                            address: tr.map?.address || TRAFFIC_DATA.map.address,
                            googleMapLink: tr.map?.googleMapLink || TRAFFIC_DATA.map.googleMapLink
                        },
                        methods: tr.methods?.map((m: any) => ({
                            type: m.type,
                            title: m.title,
                            note: m.note,
                            steps: m.steps?.map((s: any) => ({
                                id: s.id,
                                action: s.action,
                                desc: s.desc
                            })) || []
                        })) || TRAFFIC_DATA.methods
                    });
                }
            } catch (err) {
                console.error("Failed to fetch village traffic data", err);
            }
        };
        fetchTraffic();
    }, []);

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-20 desktop:gap-[160px] px-6 desktop:px-0">
                {/* Page Title */}
<<<<<<< HEAD
                <h1 className="text-black text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                    {data.hero.title}
=======
                <h1 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                    {TRAFFIC_DATA.hero.title}
>>>>>>> main
                </h1>

                {/* Map Section */}
                <section className="w-full max-w-[1200px] flex flex-col gap-[30px]">
                    {/* Map Container */}
                    <div className="w-full h-[300px] desktop:h-[600px] bg-neutral-200 rounded-[30px] overflow-hidden relative shadow-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.347372225217!2d101.41163237591632!3d3.0016839969649987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc530064567285%3A0xc3911c08d1326442!2sRumah%20Papan!5e0!3m2!1sen!2smy!4v1715366400000!5m2!1sen!2smy"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Rumah Papan Location"
                        />
                    </div>
                </section>

                {/* Transportation Methods List */}
<<<<<<< HEAD
                <section className="w-[1200px] flex flex-col items-center gap-[40px]">
                    {data.methods.map((method, index) => (
                        <div key={index} className="w-[1200px] px-[84px] py-[60px] bg-white rounded-[18px] flex justify-between items-end relative overflow-hidden shadow-sm">
=======
                <section className="w-full max-w-[1200px] flex flex-col items-center gap-8 desktop:gap-[40px]">
                    {TRAFFIC_DATA.methods.map((method, index) => (
                        <div key={index} className="w-full bg-white rounded-[18px] px-6 py-8 desktop:px-[84px] desktop:py-[60px] flex flex-col desktop:flex-row justify-between items-start desktop:items-end relative overflow-hidden shadow-sm gap-8 desktop:gap-0">
>>>>>>> main
                            {/* Left: Method Type */}
                            <h2 className="text-neutral-900 text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">
                                {method.type}
                            </h2>

                            {/* Right: Content */}
                            <div className="w-full desktop:w-[528px] flex flex-col items-start gap-6 desktop:gap-[24px]">
                                {/* Method Title */}
                                <h3 className="w-full text-neutral-900 text-xl desktop:text-[27px] font-bold font-['Noto_Sans_TC'] leading-[1.35]">
                                    {method.title}
                                </h3>

                                {/* Steps Container */}
                                <div className="w-full relative flex flex-col gap-6 desktop:gap-[24px]">
                                    {/* Dotted Line - Absolute - Hide on mobile */}
                                    {method.steps.length > 1 && (
                                        <div className="hidden desktop:block absolute left-[16px] top-[46px] w-[60px] h-0 border-t-[2.25px] border-neutral-900 border-dotted origin-top-left rotate-90"></div>
                                    )}

                                    {method.steps.map((step, stepIndex) => (
                                        <div key={stepIndex} className="flex items-start gap-[9px] relative z-10">
                                            {/* Step ID */}
<<<<<<< HEAD
                                            <span className="text-neutral-900 text-[27px] font-semibold font-['Roboto_Slab'] leading-[1.65] bg-white pr-2 shrink-0">
                                                {step.id || (stepIndex + 1).toString().padStart(2, '0')}
=======
                                            <span className="text-neutral-900 text-xl desktop:text-[27px] font-semibold font-['Roboto_Slab'] leading-[1.65] bg-white pr-2 shrink-0">
                                                {step.id}
>>>>>>> main
                                            </span>

                                            <div className="flex flex-col gap-2 desktop:gap-[9px]">
                                                {/* Action */}
                                                <h4 className="text-neutral-900 text-xl desktop:text-[27px] font-bold font-['Noto_Sans_TC'] leading-[1.6]">
                                                    {step.action}
                                                </h4>
                                                {/* Description */}
                                                <p className="text-neutral-900 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.35]">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Note for Shuttle */}
                                {method.note && (
                                    <p className="text-neutral-900/60 text-sm desktop:text-[13.5px] font-medium font-['Noto_Sans_TC'] mt-0 desktop:mt-[-10px]">
                                        {method.note}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </section>

                <SiteFooter />
            </main>
        </div>
    );
};
