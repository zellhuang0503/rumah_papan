import React, { useState, useMemo } from 'react';
import { type LocationItem, type LocationCategory } from '../../data/villageMapData';
import { Phone, MapPin, ExternalLink, X } from 'lucide-react';
import villageMapImage from '../../assets/images/village_full_map_16_9.png';

const MAP_PLACEHOLDER_URL = villageMapImage;

interface MapViewerProps {
    activeCategory: LocationCategory;
    locations: LocationItem[];
    mapImage?: string;
    isAdmin?: boolean;
}

export const MapViewer: React.FC<MapViewerProps> = ({ activeCategory, locations = [], mapImage, isAdmin }) => {
    const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);

    // Filter locations based on active category
    const displayLocations = useMemo(() => {
        if (!locations || !Array.isArray(locations)) return [];
        if (activeCategory === 'all') {
            return locations;
        }
        return locations.filter(loc => loc.category === activeCategory);
    }, [activeCategory, locations]);

    const handlePinClick = (loc: LocationItem) => {
        if (selectedLocation?.id === loc.id) {
            setSelectedLocation(null);
        } else {
            setSelectedLocation(loc);
        }
    };

    const handleMapClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!isAdmin) {
            setSelectedLocation(null);
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const coordString = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
        alert(`🎯 Coordinates Copied!\n${coordString}\n\nPaste these numbers into Sanity CMS.`);

        // Also log to console for backup
        console.log(`Coordinates: { x: ${Math.round(x)}, y: ${Math.round(y)} }`);
    };

    return (
        <div className={`w-full aspect-video md:aspect-[16/9] bg-[#F1F0E9] rounded-3xl overflow-hidden shadow-lg border border-[#242527]/10 relative group ${isAdmin ? 'ring-4 ring-red-500 ring-opacity-50 cursor-crosshair' : ''}`}>
            {/* Map Image Layer */}
            <img
                src={mapImage || MAP_PLACEHOLDER_URL}
                alt="Village Map"
                className="w-full h-full object-cover select-none pointer-events-auto"
                onClick={handleMapClick}
                onDragStart={(e) => e.preventDefault()}
            />

            {/* Pins Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {displayLocations.map((loc) => (
                    loc.coordinates && (
                        <div
                            key={loc.id}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto transition-all duration-300 ${selectedLocation?.id === loc.id ? 'z-30' : 'z-10'}`}
                            style={{
                                left: `${loc.coordinates.x}%`,
                                top: `${loc.coordinates.y}%`
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePinClick(loc);
                            }}
                        >
                            <div className={`
                                flex items-center justify-center
                                w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg
                                border-4 border-white transition-all duration-300
                                ${selectedLocation?.id === loc.id ? 'bg-[#242527] scale-125' : 'bg-[#F1592C] hover:scale-110'}
                            `}>
                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                            </div>

                            {/* Tooltip Card */}
                            {selectedLocation?.id === loc.id && (
                                <div className={`
                                    absolute left-1/2 -translate-x-1/2 w-[280px] md:w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50
                                    animate-in fade-in duration-300
                                    ${loc.coordinates.y < 50 ? 'top-full mt-4 slide-in-from-top-4' : 'bottom-full mb-4 slide-in-from-bottom-4'}
                                `}>
                                    <div className="p-1 absolute right-2 top-2 z-10">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedLocation(null);
                                            }}
                                            className="p-1 bg-white/80 hover:bg-gray-100 rounded-full transition-colors shadow-sm"
                                        >
                                            <X className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </div>

                                    {loc.image && (
                                        <div className="w-full h-32 overflow-hidden">
                                            <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    <div className="p-5 flex flex-col gap-3 text-left">
                                        <div>
                                            <h3 className="text-lg font-bold text-[#242527] font-noto-sans-tc leading-tight">{loc.name}</h3>
                                            {loc.subName && <p className="text-xs text-gray-500 font-medium mt-0.5">{loc.subName}</p>}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#F1592C]" />
                                                <span className="leading-tight">{loc.address}</span>
                                            </div>

                                            {loc.phone && (
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="w-4 h-4 shrink-0 text-[#F1592C]" />
                                                    <span>{loc.phone}</span>
                                                </div>
                                            )}
                                        </div>

                                        {loc.googleMapLink && (
                                            <a
                                                href={loc.googleMapLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-2 w-full bg-[#F1592C] text-white py-2.5 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#D44A24] transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                在 Google 地圖中查看
                                            </a>
                                        )}
                                    </div>

                                    {/* Triangle Arrow */}
                                    <div className={`
                                        absolute left-1/2 -translate-x-1/2 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent
                                        ${loc.coordinates.y < 50
                                            ? 'bottom-full border-b-[10px] border-b-white'
                                            : 'top-full border-t-[10px] border-t-white'}
                                    `}></div>
                                </div>
                            )}
                        </div>
                    )
                ))}
            </div>

            {/* Legend / Overlay */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 pointer-events-none flex flex-col gap-2">
                <span className="bg-white/90 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-[#242527] backdrop-blur-sm shadow-sm border border-[#242527]/5">
                    點擊標記查看詳情
                </span>
            </div>
        </div>
    );
};

