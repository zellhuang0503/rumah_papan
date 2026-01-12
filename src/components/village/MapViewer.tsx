import React, { useState, useMemo } from 'react';
import { villageLocations, type LocationItem, type LocationCategory } from '../../data/villageMapData';

// Using a slightly better placeholder or keeping valid one
const MAP_PLACEHOLDER_URL = "https://placehold.co/1200x600/e2e8f0/94a3b8?text=Map+Visualization+Coming+Soon";

interface MapViewerProps {
    activeCategory: LocationCategory;
}

export const MapViewer: React.FC<MapViewerProps> = ({ activeCategory }) => {
    const [hoveredLocation, setHoveredLocation] = useState<LocationItem | null>(null);

    // Filter locations based on active category
    // This logic prepares for future Google Maps API integration where we would
    // clear markers and add new ones based on this filtered list.
    const displayLocations = useMemo(() => {
        if (activeCategory === 'all') {
            return villageLocations;
        }
        return villageLocations.filter(loc => loc.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="w-full h-[500px] md:h-[600px] bg-[#F1F0E9] rounded-3xl overflow-hidden shadow-lg border border-[#242527]/10 relative group">
            {/* 
                Future Google Maps Integration Placeholder:
                Replace the <img> below with the Google Maps iframe or API container.
                The 'displayLocations' array above contains the data source for the map markers.
            */}

            {/* Map Image Layer */}
            <img
                src={MAP_PLACEHOLDER_URL}
                alt="Village Map"
                className="w-full h-full object-cover opacity-60"
            />

            {/* Pins Layer */}
            <div className="absolute inset-0">
                {displayLocations.map((loc) => (
                    loc.coordinates && (
                        <div
                            key={loc.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                            style={{
                                left: `${loc.coordinates.x}%`,
                                top: `${loc.coordinates.y}%`
                            }}
                            onMouseEnter={() => setHoveredLocation(loc)}
                            onMouseLeave={() => setHoveredLocation(null)}
                        >
                            <div className={`
                                flex items-center justify-center
                                w-10 h-10 md:w-12 md:h-12 bg-[#F1592C] rounded-full shadow-md
                                border-4 border-white transition-transform duration-300 hover:scale-125
                                ${hoveredLocation?.id === loc.id ? 'scale-125 z-20' : 'z-10'}
                            `}>
                                <div className="w-3 h-3 bg-white rounded-full" />
                            </div>

                            {/* Tooltip Label */}
                            <div className={`
                                absolute top-full mt-2 left-1/2 -translate-x-1/2
                                bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold shadow-sm whitespace-nowrap
                                transition-all duration-300
                                ${hoveredLocation?.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                            `}>
                                {loc.name}
                            </div>
                        </div>
                    )
                ))}
            </div>

            {/* Overlay Title (Optional) */}
            <div className="absolute top-6 left-6 pointer-events-none">
                <span className="bg-white/80 px-4 py-2 rounded-full text-sm font-bold text-[#242527] backdrop-blur-sm shadow-sm border border-gray-100">
                    Interactive Map
                </span>
            </div>
        </div>
    );
};
