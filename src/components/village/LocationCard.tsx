import React from 'react';
import type { LocationItem } from '../../data/villageMapData';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

interface LocationCardProps {
    item: LocationItem;
}

export const LocationCard: React.FC<LocationCardProps> = ({ item }) => {
    return (
        <div className="w-full md:w-[calc(50%-10px)] desktop:w-[calc(33.333%-14px)] h-[400px] desktop:h-[445px] relative rounded-[16px] overflow-hidden group shadow-md shrink-0 location-card-item border border-[#242527]/5">
            {/* Background Image */}
            {item.image && (
                <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            )}

            {/* Front Side (Default View) */}
            <div className={`w-full h-full absolute left-0 top-0 flex flex-col justify-center items-center gap-4 px-6 md:px-10 transition-all duration-500
                ${item.image ? 'bg-black/30 backdrop-blur-[1px] group-hover:opacity-0' : 'bg-white group-hover:bg-orange-50/50'}
            `}>
                <div className={`text-center text-3xl md:text-4xl font-bold font-noto-sans-tc leading-tight
                    ${item.image ? 'text-white' : 'text-[#242527]'}
                `}>
                    {item.name}
                </div>

                <div className={`flex flex-col items-center gap-2 text-center
                    ${item.image ? 'text-white/90' : 'text-[#242527]/70'}
                `}>
                    {item.subName && <span className="text-sm font-bold tracking-wider uppercase">{item.subName}</span>}
                    <div className="flex items-start justify-center gap-1.5 px-4">
                        <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${item.image ? 'text-white' : 'text-[#F1592C]'}`} />
                        <span className="text-sm md:text-base font-medium leading-relaxed">{item.address}</span>
                    </div>
                </div>
            </div>

            {/* Back Side (Interactive View) - Slides up on hover */}
            <div className="w-full h-full bg-[#242527]/95 absolute left-0 top-full group-hover:top-0 transition-all duration-500 ease-out px-8 py-10 flex flex-col justify-between backdrop-blur-md">
                <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-orange-100 text-2xl font-bold font-noto-sans-tc">
                            {item.featureTitle || '特色亮點'}
                        </h4>
                        <div className="w-10 h-1 bg-[#F1592C] rounded-full"></div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-orange-50/90 text-base md:text-lg font-medium font-noto-sans-tc leading-relaxed whitespace-pre-line">
                            {item.featureDescription?.join('\n')}
                        </p>

                        <div className="flex flex-col gap-3 py-4 border-t border-white/10 mt-2">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-1 shrink-0 text-[#F1592C]" />
                                <span className="text-orange-50/80 text-sm md:text-base">{item.address}</span>
                            </div>

                            {item.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 shrink-0 text-[#F1592C]" />
                                    <span className="text-orange-50/80 text-base font-medium">{item.phone}</span>
                                </div>
                            )}

                            {item.distanceInfo && (
                                <p className="text-xs md:text-sm text-white/50 italic pl-8">
                                    {item.distanceInfo}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {item.googleMapLink && (
                    <a
                        href={item.googleMapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 w-full bg-[#F1592C] text-white py-3 rounded-xl text-center font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-[#F1592C] transition-all duration-300"
                    >
                        <ExternalLink className="w-5 h-5" />
                        開啟 Google 地圖導航
                    </a>
                )}
            </div>
        </div>
    );
};

