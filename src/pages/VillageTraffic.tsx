import React, { useEffect, useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getTrafficData } from '../data/villageData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';
import villageMapImage from '../assets/images/pandamaran_tourist_map.jpg';
import { ArrowRight } from 'lucide-react';

interface TrafficCMS {
    traffic?: {
        heroTitle?: string; heroTitle_en?: string;
        map?: {
            address?: string; address_en?: string; googleMapLink?: string;
        };
        methods?: Array<{
            type?: string; type_en?: string;
            title?: string; title_en?: string;
            note?: string; note_en?: string;
            steps?: Array<{ id?: string; action?: string; action_en?: string; desc?: string; desc_en?: string; }>;
        }>;
    };
}

export const VillageTraffic: React.FC = () => {
    const { language } = useLanguage();
    const STATIC_DATA = getTrafficData(language);

    const [cmsData, setCmsData] = useState<TrafficCMS | null>(null);

    useEffect(() => {
        const fetchTraffic = async () => {
            try {
                const data = await client.fetch<TrafficCMS>(`*[_type == "village"][0]{
                    traffic {
                        ...,
                        map {
                            ...,
                            image
                        }
                    }
                }`);
                if (data) {
                    setCmsData(data);
                }
            } catch (error) {
                console.error("Failed to fetch traffic data", error);
            }
        };
        fetchTraffic();
    }, []);

    const getLocalized = (zh: string | undefined, en: string | undefined, fallback: string | undefined) => {
        if (language === 'en') return en || zh || fallback || "";
        return zh || fallback || "";
    };

    const cmsTraffic = cmsData?.traffic;

    const hero = {
        title: getLocalized(cmsTraffic?.heroTitle, cmsTraffic?.heroTitle_en, STATIC_DATA.hero.title)
    };

    // Map URL: if in CMS use it, else static (though static is hardcoded in iframe currently)
    // Actually static data just has map: { ... }. The iframe uses hardcoded src.
    // If we want CMS map, we might need a field for embed URL or similar.
    // The schema has `googleMapLink` which is usually the share link, NOT the embed link.
    // For now I'll just keep the iframe hardcoded or use the link if formatted correctly, but safer to use static/hardcoded structure for now unless user asks.

    const methods = (cmsTraffic?.methods && cmsTraffic.methods.length > 0 ? cmsTraffic.methods : STATIC_DATA.methods).map((item: any, i: number) => {
        const staticItem = STATIC_DATA.methods[i];
        if (cmsTraffic?.methods && cmsTraffic.methods.length > 0) {
            return {
                type: getLocalized(item.type, item.type_en, staticItem?.type),
                title: getLocalized(item.title, item.title_en, staticItem?.title),
                note: getLocalized(item.note, item.note_en, staticItem?.note),
                steps: (item.steps || []).map((step: any, si: number) => {
                    const staticStep = staticItem?.steps?.[si];
                    return {
                        id: step.id || staticStep?.id || (si + 1).toString(),
                        action: getLocalized(step.action, step.action_en, staticStep?.action),
                        desc: getLocalized(step.desc, step.desc_en, staticStep?.desc)
                    };
                })
            };
        }
        return item; // Static
    });

    const TRAFFIC_DATA = {
        hero, methods
    };

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-20 desktop:gap-[160px] px-6 desktop:px-0">
                {/* Page Title */}
                <h1 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                    {TRAFFIC_DATA.hero.title}
                </h1>

                {/* Map Section */}
                <section className="w-full max-w-[1200px] flex flex-col gap-[30px]">
                    {/* Map Container - Optimized with UI/UX Pro Max */}
                    <div className="w-full relative group">
                        {/* Decorative Background Blur/Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-100 to-amber-50 rounded-[35px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

                        {/* Main Card Container */}
                        <div className="w-full h-[450px] desktop:h-[500px] bg-[#F4F4F0] rounded-[30px] overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-[6px] border-white ring-1 ring-black/5">
                            {/* Google Maps Embed - Official embed code from Google */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.308725143762!2d101.41554597567603!3d3.0114170539824068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdabc83172da37%3A0xe1c88cab8eab92e4!2sRumah%20Papan%20Pandamaran!5e0!3m2!1szh-TW!2stw!4v1769060112514!5m2!1szh-TW!2stw"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Rumah Papan Pandamaran Location"
                                className="w-full h-full"
                            />
                            {/* Action Button to open in Google Maps */}
                            <div className="absolute bottom-6 right-6 z-20">
                                <a
                                    href="https://maps.app.goo.gl/F6uZebWRaBFxFjN38"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl border border-black/5 text-[#F1592C] font-bold hover:bg-[#F1592C] hover:text-white transition-all duration-300 flex items-center gap-2 group/btn"
                                >
                                    <span className="text-sm desktop:text-base font-['Noto_Sans_TC']">
                                        {language === 'zh' ? '在 Google Map 中查看' : 'View on Google Maps'}
                                    </span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Transportation Methods List */}
                <section className="w-full max-w-[1200px] flex flex-col items-center gap-8 desktop:gap-[40px]">
                    {
                        TRAFFIC_DATA.methods.map((method, index) => (
                            <div key={index} className="w-full bg-white rounded-[18px] px-6 py-8 desktop:px-[84px] desktop:py-[60px] flex flex-col desktop:flex-row justify-between items-start desktop:items-end relative overflow-hidden shadow-sm gap-8 desktop:gap-0">
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

                                        {method.steps.map((step: any, stepIndex: number) => (
                                            <div key={stepIndex} className="flex items-start gap-[9px] relative z-10">
                                                {/* Step ID */}
                                                <span className="text-neutral-900 text-xl desktop:text-[27px] font-semibold font-['Roboto_Slab'] leading-[1.65] bg-white pr-2 shrink-0">
                                                    {step.id}
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
                        ))
                    }
                </section >

                <SiteFooter />
            </main >
        </div >
    );
};
