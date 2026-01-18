import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    type LocationItem
} from '../data/villageMapData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';

gsap.registerPlugin(ScrollTrigger);

interface MapCMS {
    map?: {
        title?: string; title_en?: string;
        subtitle?: string; subtitle_en?: string;
        mapImage?: any;
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
            phone?: string;
            googleMapLink?: string;
            image?: any;
        }>;
    };
}

export const VillageMap: React.FC = () => {
    const { language } = useLanguage();
    const [searchParams] = useSearchParams();
    const isAdmin = searchParams.get('admin') === 'true' || searchParams.get('mode')?.toLowerCase() === 'admin';

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

    const processedLocations = useMemo<LocationItem[]>(() => {
        if (!cmsMap?.locations || cmsMap.locations.length === 0) {
            return staticLocations || [];
        }

        return cmsMap.locations.map((item: any) => {
            const staticItem = staticLocations.find(l => l.id === item.id) ||
                staticLocations.find(l => l.category === item.category);

            // Safer image processing
            let imageUrl = "";
            try {
                if (item.image && item.image.asset) {
                    imageUrl = urlFor(item.image).url();
                } else {
                    imageUrl = staticItem?.image || "";
                }
            } catch (err) {
                console.error("Image URL processing error:", err);
                imageUrl = staticItem?.image || "";
            }

            return {
                id: item.id || staticItem?.id || Math.random().toString(36),
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
                phone: item.phone || staticItem?.phone,
                googleMapLink: item.googleMapLink || staticItem?.googleMapLink,
                image: imageUrl
            };
        });
    }, [cmsMap, staticLocations, language]);

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
            gsap.fromTo(q(".title-animate"), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
            gsap.fromTo(q(".map-animate"), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 });
            gsap.fromTo(q(".filter-animate"), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 });


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
    }, [processedLocations, activeCategory]); // Modified dependencies

    // Refresh ScrollTrigger when category changes (content height changes)
    useLayoutEffect(() => {
        ScrollTrigger.refresh();
    }, [activeCategory, language, processedLocations]);

    // Labels for Sections
    const sectionLabels = {
        food: language === 'zh' ? '肉骨茶' : 'Bak Kut Teh',
        attraction: language === 'zh' ? '景點' : 'Attractions',
        temple: language === 'zh' ? '廟宇' : 'Temples'
    };

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full flex flex-col items-center pt-32 desktop:pt-[165px] pb-[120px]">

                {/* Header Section: Title + Filter */}
                <div className="w-full max-w-[1260px] px-6 desktop:px-[90px] mb-6 desktop:mb-[24px] flex flex-col items-center gap-6 desktop:gap-10 anim-header opacity-0">
                    <h1 className="text-3xl desktop:text-[54px] font-bold text-[#242527] font-noto-sans-tc leading-[1.4] text-center">
                        {pageTitle}
                        {isAdmin && <span className="block text-base text-red-500 mt-2 font-mono bg-red-100 py-1 px-3 rounded-full w-fit mx-auto border border-red-200">🔧 Admin Mode: Click Map to Get Coordinates</span>}
                    </h1>

                    {/* Filter */}
                    <div className="filter-animate opacity-0">
                        <MapFilter
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full max-w-[1200px] px-6 desktop:px-0 mb-12 desktop:mb-[60px] map-animate opacity-0">
                    <MapViewer
                        activeCategory={activeCategory}
                        locations={processedLocations}
                        mapImage={(cmsMap?.mapImage && cmsMap.mapImage.asset) ? urlFor(cmsMap.mapImage).url() : undefined}
                        isAdmin={isAdmin}
                    />
                </div>

                {/* Content Section: Location Cards */}
                <div className="w-full max-w-[1260px] px-6 desktop:px-[90px] flex flex-col gap-12 desktop:gap-[60px]">

                    {/* Category Subtitle */}
                    <h2 className="text-[#242527] text-xl desktop:text-[27px] font-bold font-noto-sans-tc leading-[1.35] title-animate opacity-0">
                        {activeCategory === 'all' ? pageSubtitle :
                            activeCategory === 'food' ? (language === 'zh' ? '在地美食' : 'Local Food') :
                                activeCategory === 'temple' ? (language === 'zh' ? '廟宇文化' : 'Temples') :
                                    (language === 'zh' ? '觀光景點' : 'Attractions')}
                    </h2>

                    {/* Food Section */}
                    {shouldShowSection('food') && (
                        <section className="flex flex-col gap-6 desktop:gap-8 content-section">
                            <div className="flex items-center gap-3 desktop:gap-4 section-title">
                                <span className="w-1.5 desktop:w-2 h-6 desktop:h-10 bg-[#242527]"></span>
                                <h4 className="text-xl desktop:text-[2rem] font-bold text-[#242527] font-noto-sans-tc">
                                    {sectionLabels.food}
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-x-4 desktop:gap-x-[20px] gap-y-6 desktop:gap-y-[48px]">
                                {processedLocations.filter(l => l.category === 'food').map(location => (
                                    <LocationCard key={location.id} item={location} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Attraction Section */}
                    {shouldShowSection('attraction') && (
                        <section className="flex flex-col gap-6 desktop:gap-8 content-section">
                            <div className="flex items-center gap-3 desktop:gap-4 section-title">
                                <span className="w-1.5 desktop:w-2 h-6 desktop:h-10 bg-[#242527]"></span>
                                <h4 className="text-xl desktop:text-[2rem] font-bold text-[#242527] font-noto-sans-tc">
                                    {sectionLabels.attraction}
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-x-4 desktop:gap-x-[20px] gap-y-6 desktop:gap-y-[48px]">
                                {processedLocations.filter(l => l.category === 'attraction').map(location => (
                                    <LocationCard key={location.id} item={location} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Temple Section */}
                    {shouldShowSection('temple') && (
                        <section className="flex flex-col gap-6 desktop:gap-8 content-section">
                            <div className="flex items-center gap-3 desktop:gap-4 section-title">
                                <span className="w-1.5 desktop:w-2 h-6 desktop:h-10 bg-[#242527]"></span>
                                <h4 className="text-xl desktop:text-[2rem] font-bold text-[#242527] font-noto-sans-tc">
                                    {sectionLabels.temple}
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-x-4 desktop:gap-x-[20px] gap-y-6 desktop:gap-y-[48px]">
                                {processedLocations.filter(l => l.category === 'temple').map(location => (
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
