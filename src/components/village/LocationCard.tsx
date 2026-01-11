import React, { useState } from 'react';
import type { LocationItem } from '../../data/villageMapData';
import { Info } from 'lucide-react';

interface LocationCardProps {
    item: LocationItem;
}

export const LocationCard: React.FC<LocationCardProps> = ({ item }) => {
    // We will use a group-hover approach for simpler CSS interaction, 
    // or state if mobile needs tap-to-reveal. 
    // Given it's desktop-first (1440), hover is good.

    return (
        <div className="group relative w-full h-[470px] perspective-1000">
            {/* Inner Container for Flip Effect */}
            <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180 bg-white rounded-[20px] shadow-sm border border-gray-100">

                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden w-full h-full bg-white rounded-[20px] p-8 flex flex-col items-center justify-center text-center gap-4">
                    <h3 className="text-[1.875rem] font-bold text-gray-900 font-noto-sans-tc leading-tight">
                        {item.name}
                    </h3>
                    {item.subName && (
                        <p className="text-[1.125rem] text-gray-400 font-medium font-roboto-slab border-b border-gray-100 pb-4 w-2/3 mx-auto">
                            {item.subName}
                        </p>
                    )}
                    <p className="text-[0.875rem] text-gray-500 leading-relaxed max-w-[90%] font-noto-sans-tc">
                        {item.address}
                    </p>

                    {/* Indication to flip/hover */}
                    <div className="absolute bottom-6 text-[#F47A56] flex items-center gap-2 text-sm font-bold opacity-60">
                        <Info size={16} />
                        <span>了解更多</span>
                    </div>
                </div>

                {/* Back Side (Feature Info) */}
                <div className="absolute inset-0 backface-hidden w-full h-full bg-[#242527] rounded-[20px] p-8 flex flex-col justify-start text-left rotate-y-180 overflow-y-auto custom-scrollbar">
                    {item.featureTitle && (
                        <h4 className="text-[#F3E3CB] text-[1.5rem] font-bold mb-6 font-noto-sans-tc border-b border-gray-700 pb-2">
                            {item.featureTitle}
                        </h4>
                    )}

                    <div className="flex flex-col gap-4">
                        {item.featureDescription?.map((desc, idx) => (
                            <p key={idx} className="text-white/90 text-[1rem] leading-relaxed font-noto-sans-tc">
                                {desc}
                            </p>
                        ))}
                    </div>

                    {item.distanceInfo && (
                        <div className="mt-8 pt-4 border-t border-gray-700">
                            <p className="text-[#F47A56] text-[0.875rem] font-bold mb-1">
                                交通資訊
                            </p>
                            <p className="text-gray-300 text-[0.875rem]">
                                {item.distanceInfo}
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
