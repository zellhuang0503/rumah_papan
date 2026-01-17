
import React, { useState, useRef, useLayoutEffect } from 'react';
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
    getMapPageSubtitle
} from '../data/villageMapData';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const VillageMap: React.FC = () => {
    const { language } = useLanguage();
    const villageLocations = getVillageLocations(language);
    const MAP_PAGE_TITLE = getMapPageTitle(language);
    const MAP_PAGE_SUBTITLE = getMapPageSubtitle(language);

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
    }, [language]); // Depend on language to re-animate if needed or just re-render is fine.

    // Refresh ScrollTrigger when category changes (content height changes)
    useLayoutEffect(() => {
        ScrollTrigger.refresh();
    }, [activeCategory, language]);

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
                        {MAP_PAGE_TITLE}
                    </h1>
                </div>

                {/* Map & Filter Group */}
                <div className="flex flex-col gap-[40px] w-full">
                    {/* Subtitle / Map Intro */}
                    <div className="flex flex-col gap-8 w-full anim-subtitle">
                        <h2 className="text-2xl md:text-[2.5rem] font-bold text-[#242527] font-noto-sans-tc text-left">
                            {MAP_PAGE_SUBTITLE}
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
