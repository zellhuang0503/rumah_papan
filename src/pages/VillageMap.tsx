import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { MapViewer } from '../components/village/MapViewer';
import { MapFilter } from '../components/village/MapFilter';
import { LocationCard } from '../components/village/LocationCard';
import {
    getVillageLocations,
    type LocationCategory,
    getMapPageTitle,
    getMapPageSubtitle,
    LocationItem
} from '../data/villageMapData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';

gsap.registerPlugin(ScrollTrigger);

interface MapCMS {
    map?: {
        title?: string; title_en?: string;
        subtitle?: string; subtitle_en?: string;
        locations?: Array<{
            id?: string;
            name?: string; name_en?: string;
            subName?: string; subName_en?: string;
            address?: string; address_en?: string;
            category?: string;
            featureTitle?: string; featureTitle_en?: string;
            featureDescription?: string[]; featureDescription_en?: string[];
            distanceInfo?: string; distanceInfo_en?: string;
            coordinateX?: number; coordinateY?: number;
            image?: any;
        }>;
    };
}

export const VillageMap: React.FC = () => {
    const { language } = useLanguage();
    const staticLocations = getVillageLocations(language);
    const MAP_PAGE_TITLE = getMapPageTitle(language);
    const MAP_PAGE_SUBTITLE = getMapPageSubtitle(language);

    const [cmsData, setCmsData] = useState<MapCMS | null>(null);

    useEffect(() => {
        const fetchMap = async () => {
            try {
                const data = await client.fetch<MapCMS>(`*[_type == "village"][0]{map}`);
                if (data) {
                    setCmsData(data);
                }
            } catch (error) {
                console.error("Failed to fetch map data", error);
            }
        };
        fetchMap();
    }, []);

    const getLocalized = (zh: any, en: any, fallback: any) => {
        if (language === 'en') return en || zh || fallback;
        return zh || fallback;
    };

    const cmsMap = cmsData?.map;

    const pageTitle = getLocalized(cmsMap?.title, cmsMap?.title_en, MAP_PAGE_TITLE);
    const pageSubtitle = getLocalized(cmsMap?.subtitle, cmsMap?.subtitle_en, MAP_PAGE_SUBTITLE);

    const villageLocations: LocationItem[] = (cmsMap?.locations && cmsMap.locations.length > 0)
        ? cmsMap.locations.map((item: any) => {
            const staticItem = staticLocations.find(l => l.id === item.id) || staticLocations.find(l => l.category === item.category); // Fallback logic might be loose if ID missing, but ID should exist.

            // If staticItem is found by ID usage is safe. If not found, use partial data.
            // Actually, we should iterate over CMS locations if they exist.
            // But if CMS has FEWER items than static (e.g. user deleted some), we show fewer?
            // Or do we merge lists?
            // Usually CMS completely replaces the list.

            return {
                id: item.id || staticItem?.id || '',
                name: getLocalized(item.name, item.name_en, staticItem?.name || ''),
                subName: getLocalized(item.subName, item.subName_en, staticItem?.subName),
                address: getLocalized(item.address, item.address_en, staticItem?.address || ''),
                category: (item.category as LocationCategory) || staticItem?.category || 'attraction',
                featureTitle: getLocalized(item.featureTitle, item.featureTitle_en, staticItem?.featureTitle),
                featureDescription: getLocalized(item.featureDescription, item.featureDescription_en, staticItem?.featureDescription || []),
                distanceInfo: getLocalized(item.distanceInfo, item.distanceInfo_en, staticItem?.distanceInfo),
                coordinates: (item.coordinateX !== undefined && item.coordinateY !== undefined)
                    ? { x: item.coordinateX, y: item.coordinateY }
                    : (staticItem?.coordinates || { x: 0, y: 0 }),
                image: item.image ? urlFor(item.image).url() : (staticItem?.image || "")
            };
        })
        : staticLocations;

    const [activeCategory, setActiveCategory] = useState<LocationCategory>('all');
    const containerRef = useRef<HTMLDivElement>(null);

    // Helper to determine if a section should be shown
    const shouldShowSection = (category: LocationCategory) => {
        return activeCategory === 'all' || activeCategory === category;
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Scoped selector
            const q = gsap.utils.selector(containerRef);

            // Helper for simple fade-in elements
            const animateIn = (className: string, delay: number = 0) => {
                const targets = q(className);
                if (targets.length > 0) {
                    gsap.fromTo(targets,
                        { autoAlpha: 0, x: 100 },
                        {
                            scrollTrigger: {
                                trigger: targets,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            },
                            autoAlpha: 1,
                            x: 0,
                            duration: 1,
                            delay: delay,
                            ease: "power3.out"
                        }
                    );
                }
            };

            // 1. Header Elements
            animateIn(".anim-header", 0);
            animateIn(".anim-subtitle", 0.1);
            animateIn(".anim-filter", 0.2);

            // 2. Sections (Title + Staggered Cards)
            const sections = q(".content-section");
            sections.forEach((section) => {
                // Find title and cards *inside* this specific section
                const title = section.querySelector(".section-title");
                const cards = section.querySelectorAll(".location-card-item");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%", // Trigger a bit earlier/higher
                        toggleActions: "play none none reverse"
                    }
                });

                if (title) {
                    tl.fromTo(title,
                        { autoAlpha: 0, x: 100 },
                        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" }
                    );
                }

                if (cards.length > 0) {
                    tl.fromTo(cards,
                        { autoAlpha: 0, x: 100 },
                        {
                            autoAlpha: 1,
                            x: 0,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "power3.out"
                        },
                        title ? "-=0.6" : 0
                    );
                }
            });

            ScrollTrigger.refresh();

        }, containerRef);

        return () => ctx.revert();
    }, [language, villageLocations]); // Depend on villageLocations to re-animate when data loads

    // Refresh ScrollTrigger when category changes (content height changes)
    useLayoutEffect(() => {
        ScrollTrigger.refresh();
    }, [activeCategory, language, villageLocations]);

    // Labels for Sections
    const sectionLabels = {
        food: language === 'zh' ? '肉骨茶' : 'Bak Kut Teh',
        attraction: language === 'zh' ? '景點' : 'Attractions',
        temple: language === 'zh' ? '廟宇' : 'Temples'
    };

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-[#F3E3CB] relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full max-w-[1440px] mx-auto px-6 md:px-[60px] desktop:px-[120px] pt-32 desktop:pt-[165px] pb-[80px] flex flex-col gap-[40px] desktop:gap-[80px]">

                {/* Header Section */}
                <div className="text-center flex flex-col gap-6 items-center anim-header">
                    <h1 className="text-3xl md:text-[3.375rem] font-bold text-[#242527] font-noto-sans-tc leading-tight">
                        {pageTitle}
                    </h1>
                </div>

                {/* Map & Filter Group */}
                <div className="flex flex-col gap-[40px] w-full">
                    {/* Subtitle / Map Intro */}
                    <div className="flex flex-col gap-8 w-full anim-subtitle">
                        <h2 className="text-2xl md:text-[2.5rem] font-bold text-[#242527] font-noto-sans-tc text-left">
                            {pageSubtitle}
                        </h2>

                        {/* Map Section */}
                        <section className="w-full">
                            <MapViewer activeCategory={activeCategory} />
                        </section>
                    </div>

                    {/* Filter/Nav Section */}
                    <section className="w-full anim-filter">
                        <MapFilter
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                    </section>
                </div>

                {/* Locations Sections */}
                <div className="flex flex-col gap-12 desktop:gap-[80px]">

                    {/* Food Section */}
                    {shouldShowSection('food') && (
                        <section className="flex flex-col gap-8 content-section">
                            <div className="flex items-center gap-4 section-title">
                                <span className="w-2 h-8 md:h-10 bg-[#242527]"></span>
                                <h4 className="text-2xl md:text-[2rem] font-bold text-[#242527] font-noto-sans-tc">
                                    {sectionLabels.food}
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-x-[20px] gap-y-6 md:gap-y-[48px]">
                                {villageLocations.filter(l => l.category === 'food').map(location => (
                                    <LocationCard key={location.id} item={location} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Attraction Section */}
                    {shouldShowSection('attraction') && (
                        <section className="flex flex-col gap-8 content-section">
                            <div className="flex items-center gap-4 section-title">
                                <span className="w-2 h-8 md:h-10 bg-[#242527]"></span>
                                <h4 className="text-2xl md:text-[2rem] font-bold text-[#242527] font-noto-sans-tc">
                                    {sectionLabels.attraction}
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-x-[20px] gap-y-6 md:gap-y-[48px]">
                                {villageLocations.filter(l => l.category === 'attraction').map(location => (
                                    <LocationCard key={location.id} item={location} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Temple Section */}
                    {shouldShowSection('temple') && (
                        <section className="flex flex-col gap-8 content-section">
                            <div className="flex items-center gap-4 section-title">
                                <span className="w-2 h-8 md:h-10 bg-[#242527]"></span>
                                <h4 className="text-2xl md:text-[2rem] font-bold text-[#242527] font-noto-sans-tc">
                                    {sectionLabels.temple}
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-x-[20px] gap-y-6 md:gap-y-[48px]">
                                {villageLocations.filter(l => l.category === 'temple').map(location => (
                                    <LocationCard key={location.id} item={location} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>

            </main>

            <SiteFooter />
        </div>
    );
};
