import React, { useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { MapViewer } from '../components/village/MapViewer';
import { MapFilter } from '../components/village/MapFilter';
import { LocationCard } from '../components/village/LocationCard';
import { villageLocations, type LocationCategory } from '../data/villageMapData';

export const VillageMap: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<LocationCategory>('food');

    const filteredLocations = villageLocations.filter(loc => loc.category === activeCategory);

    return (
        <div className="min-h-screen w-full bg-[#F3E3CB] relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white">
            <HomeNavbar />

            <main className="w-full max-w-[1440px] mx-auto px-[60px] md:px-[120px] py-[80px] flex flex-col gap-[80px]">

                {/* Header Section */}
                <div className="text-center flex flex-col gap-6">
                    <h1 className="text-[3.375rem] font-bold text-[#242527] font-noto-sans-tc">
                        觀光地圖
                    </h1>
                    <h2 className="text-[2.5rem] font-bold text-[#242527]/80 font-noto-sans-tc">
                        人氣景點
                    </h2>
                </div>

                {/* Map Section */}
                <section className="w-full">
                    <MapViewer />
                </section>

                {/* Filter/Legend Section - Visually matching design, acts as legend or quick filter for map */}
                <section>
                    <MapFilter
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                </section>

                {/* Locations Sections - Displaying ALL categories in order */}
                <div className="flex flex-col gap-[80px]">
                    <h3 className="text-[3rem] font-bold text-[#242527] font-noto-sans-tc">
                        旅遊地圖
                    </h3>

                    {/* Food Section */}
                    <section className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <span className="w-2 h-10 bg-[#242527]"></span>
                            <h4 className="text-[2rem] font-bold text-[#242527] font-noto-sans-tc">
                                肉骨茶
                            </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {villageLocations.filter(l => l.category === 'food').map(location => (
                                <LocationCard key={location.id} item={location} />
                            ))}
                        </div>
                    </section>

                    {/* Temple Section */}
                    <section className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <span className="w-2 h-10 bg-[#242527]"></span>
                            <h4 className="text-[2rem] font-bold text-[#242527] font-noto-sans-tc">
                                廟宇
                            </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {villageLocations.filter(l => l.category === 'temple').map(location => (
                                <LocationCard key={location.id} item={location} />
                            ))}
                        </div>
                    </section>

                    {/* Attraction Section */}
                    <section className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <span className="w-2 h-10 bg-[#242527]"></span>
                            <h4 className="text-[2rem] font-bold text-[#242527] font-noto-sans-tc">
                                景點
                            </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {villageLocations.filter(l => l.category === 'attraction').map(location => (
                                <LocationCard key={location.id} item={location} />
                            ))}
                        </div>
                    </section>
                </div>

            </main>

            <SiteFooter />
        </div>
    );
};
