import React, { useState, useMemo } from 'react';
import { type LocationItem, type LocationCategory } from '../../data/villageMapData';
import { Phone, ExternalLink, X } from 'lucide-react';
import villageMapImage from '../../assets/images/pandamaran_tourist_map.jpg';
import { sanitizeUrl } from '../../utils/security';

const MAP_PLACEHOLDER_URL = villageMapImage;

interface MapViewerProps {
    activeCategory: LocationCategory;
    locations: LocationItem[];
    mapImage?: string;
    isAdmin?: boolean;
}

export const MapViewer: React.FC<MapViewerProps> = ({ activeCategory, locations = [], mapImage, isAdmin }) => {
    const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
    const [lastCoords, setLastCoords] = useState<{ x: number; y: number } | null>(null);

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

    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isAdmin) {
            setSelectedLocation(null);
            return;
        }

        // Get coordinates relative to the container div
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const roundedX = Math.round(x);
        const roundedY = Math.round(y);

        setLastCoords({ x: roundedX, y: roundedY });

        const coordString = `X: ${roundedX}, Y: ${roundedY}`;

        // Log to console for backup
        console.log(`[Admin] Map Clicked:`, { x: roundedX, y: roundedY });

        // Show alert as requested, but also updated the UI
        window.alert(`🎯 Coordinates Captured!\n\n${coordString}\n\nPaste these numbers into Sanity CMS.`);
    };

    return (
        <div
            className={`w-full aspect-video md:aspect-[16/9] bg-[#F1F0E9] rounded-3xl overflow-hidden shadow-lg border border-[#242527]/10 relative group ${isAdmin ? 'ring-4 ring-pink-500 ring-opacity-50 cursor-crosshair' : ''}`}
            onClick={handleMapClick}
        >
            {/* Map Image Layer */}
            <img
                src={mapImage || MAP_PLACEHOLDER_URL}
                alt="Village Map"
                className={`w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105 ${isAdmin ? 'cursor-crosshair' : ''}`}
                style={{ filter: 'sepia(0.15) contrast(1.05) saturate(1.1) brightness(1.05)' }} // Subtle illustration effect
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
                                w-8 h-8 md:w-10 md:h-10 rounded-full
                                shadow-[0_8px_16px_rgba(0,0,0,0.5)] 
                                border-[3px] md:border-4 border-white 
                                ring-1 ring-black/20
                                transition-all duration-300
                                ${selectedLocation?.id === loc.id
                                    ? 'bg-[#242527] scale-125 z-40 shadow-[0_12px_24px_rgba(0,0,0,0.6)]'
                                    : 'bg-[#F1592C] hover:scale-110 hover:shadow-[0_12px_20px_rgba(0,0,0,0.4)] z-20'}
                            `}>
                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-sm" />
                            </div>

                            {/* Desktop Tooltip Card (Hidden on Mobile) */}
                            {selectedLocation?.id === loc.id && (
                                <div className={`
                                    hidden md:block
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
                                            {loc.phone && (
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="w-4 h-4 shrink-0 text-[#F1592C]" />
                                                    <span>{loc.phone}</span>
                                                </div>
                                            )}
                                        </div>

                                        {loc.googleMapLink && (
                                            <a
                                                href={sanitizeUrl(loc.googleMapLink)}
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

            {/* Mobile Bottom Sheet (Fixed Overlay) */}
            {selectedLocation && (
                <div className="md:hidden fixed inset-0 z-[100] flex flex-col justify-end pointer-events-none">
                    {/* Backdrop - Click to close */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] animate-in fade-in duration-300 pointer-events-auto"
                        onClick={() => setSelectedLocation(null)}
                    />

                    {/* Bottom Sheet Card */}
                    <div className="bg-white w-full rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] overflow-hidden animate-in slide-in-from-bottom duration-300 pointer-events-auto relative z-10 max-h-[85vh] flex flex-col">

                        {/* Drag Handle / Header */}
                        <div className="w-full flex justify-center pt-3 pb-1" onClick={() => setSelectedLocation(null)}>
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedLocation(null)}
                            className="absolute right-4 top-4 p-2 bg-gray-100/80 rounded-full hover:bg-gray-200 transition-colors z-20"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        <div className="overflow-y-auto overscroll-contain pb-safe">
                            {selectedLocation.image && (
                                <div className="w-full h-48 sm:h-56 relative -mt-6 rounded-b-[24px] overflow-hidden">
                                    {/* Overlay gradient for text readability if needed, or just image */}
                                    <img src={selectedLocation.image} alt={selectedLocation.name} className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="p-6 flex flex-col gap-5">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#242527] font-noto-sans-tc leading-tight">{selectedLocation.name}</h3>
                                    {selectedLocation.subName && <p className="text-sm text-gray-500 font-medium mt-1">{selectedLocation.subName}</p>}
                                </div>

                                <div className="flex flex-col gap-3">
                                    {selectedLocation.phone && (
                                        <div className="flex items-center gap-3 text-base text-gray-600">
                                            <Phone className="w-5 h-5 shrink-0 text-[#F1592C]" />
                                            <span>{selectedLocation.phone}</span>
                                        </div>
                                    )}
                                </div>

                                {selectedLocation.googleMapLink && (
                                    <a
                                        href={sanitizeUrl(selectedLocation.googleMapLink)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 w-full bg-[#F1592C] text-white py-3.5 rounded-xl text-center text-base font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        開啟 Google 地圖
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Legend / Overlay */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 pointer-events-none flex flex-col gap-2">
                <span className="bg-white/90 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-[#242527] backdrop-blur-sm shadow-sm border border-[#242527]/5">
                    {isAdmin ? 'Admin: Click anywhere to pick coordinates' : '點擊標記查看詳情'}
                </span>

                {isAdmin && lastCoords && (
                    <div className="bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-mono shadow-lg border border-pink-400 animate-bounce">
                        Last Click: {lastCoords.x}, {lastCoords.y}
                    </div>
                )}
            </div>
        </div>
    );
};
