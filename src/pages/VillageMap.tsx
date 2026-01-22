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
                const data = await client.fetch<MapCMS['map']>(`*[_type == "village"][0].map`);
                if (data) {
                    setCmsData({ map: data });
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

    const currentMapImage = useMemo(() => {
        if (cmsMap?.mapImage?.asset) {
            return urlFor(cmsMap.mapImage).url();
        }
        return undefined;
    }, [cmsMap]);

    const pageTitle = getLocalized(cmsMap?.title, cmsMap?.title_en, MAP_PAGE_TITLE);
    const pageSubtitle = getLocalized(cmsMap?.subtitle, cmsMap?.subtitle_en, MAP_PAGE_SUBTITLE);

    const processedLocations = useMemo<LocationItem[]>(() => {
        if (!cmsMap?.locations || cmsMap.locations.length === 0) {
            return staticLocations || [];
        }

        return cmsMap.locations.map((item: any) => {
            const staticItem = staticLocations.find(l => l.id === item.id) ||
                staticLocations.find(l => l.category === item.category);

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

    const shouldShowSection = (category: LocationCategory) => {
        return activeCategory === 'all' || activeCategory === category;
    };

    const foodLocations = processedLocations.filter(l => l.category === 'food');
    const attractionLocations = processedLocations.filter(l => l.category === 'attraction');
    const templeLocations = processedLocations.filter(l => l.category === 'temple');

    const sectionLabels = {
        food: language === 'zh' ? '肉骨茶' : 'Bak Kut Teh',
        attraction: language === 'zh' ? '景點' : 'Attractions',
        temple: language === 'zh' ? '廟宇' : 'Temples'
    };

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full flex flex-col items-center pt-32 desktop:pt-[165px] pb-[120px]">

                {/* Header Section */}
                <div className="w-full flex flex-col items-center gap-[60px]">
                    <h1 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                        {MAP_PAGE_TITLE}
                        {isAdmin && <span className="block text-base text-red-500 mt-2 font-mono bg-red-100 py-1 px-3 rounded-full w-fit mx-auto border border-red-200">🔧 Admin Mode: Click Map to Get Coordinates</span>}
                    </h1>

                    {/* Filter Section */}
                    <div className="w-full flex justify-center desktop:px-0">
                        <MapFilter
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                    </div>
                </div>

                {/* Map Section */}
                <section className="w-full max-w-[1240px] relative mb-12 desktop:mb-[60px]">
                    <MapViewer
                        activeCategory={activeCategory}
                        locations={processedLocations}
                        mapImage={currentMapImage}
                        isAdmin={isAdmin}
                    />
                </section>

                {/* Content Section: Location Cards */}
                <div className="w-full max-w-[1260px] px-6 desktop:px-[90px] flex flex-col gap-12 desktop:gap-[60px]">

                    {/* Popular Spots Title */}
                    <h2 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                        {MAP_PAGE_SUBTITLE}
                    </h2>

                    {/* Food Section (Bak Kut Teh) */}
                    {shouldShowSection('food') && (
                        <div className="content-section w-full flex flex-col items-center gap-12 desktop:gap-[60px]">
                            <h3 className="section-title text-black text-2xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-none w-full text-center desktop:text-left desktop:px-[60px]">
                                {language === 'zh' ? '人氣肉骨茶' : 'Popular BKT'}
                            </h3>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 desktop:px-0 auto-rows-fr">
                                {foodLocations.map((location) => (
                                    <div key={location.id} className="location-card-item">
                                        <LocationCard item={location} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Attraction Section */}
                    {shouldShowSection('attraction') && (
                        <div className="content-section w-full flex flex-col items-center gap-12 desktop:gap-[60px]">
                            <h3 className="section-title text-black text-2xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-none w-full text-center desktop:text-left desktop:px-[60px]">
                                {language === 'zh' ? '必訪景點' : 'Must-visit Spots'}
                            </h3>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 desktop:px-0 auto-rows-fr">
                                {attractionLocations.map((location) => (
                                    <div key={location.id} className="location-card-item">
                                        <LocationCard item={location} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Temple Section */}
                    {shouldShowSection('temple') && (
                        <div className="content-section w-full flex flex-col items-center gap-12 desktop:gap-[60px]">
                            <h3 className="section-title text-black text-2xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-none w-full text-center desktop:text-left desktop:px-[60px]">
                                {language === 'zh' ? '在地廟宇' : 'Local Temples'}
                            </h3>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 desktop:px-0 auto-rows-fr">
                                {templeLocations.map((location) => (
                                    <div key={location.id} className="location-card-item">
                                        <LocationCard item={location} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </main>

            <SiteFooter />
        </div>
    );
};
