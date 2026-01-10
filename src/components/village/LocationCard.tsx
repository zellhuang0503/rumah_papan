import React from 'react';
import type { LocationItem } from '../../data/villageMapData';

interface LocationCardProps {
    item: LocationItem;
}

export const LocationCard: React.FC<LocationCardProps> = ({ item }) => {
    return (
        <div className="bg-white rounded-[16px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center h-full border border-gray-100">
            <h3 className="text-[1.875rem] font-bold text-gray-900 mb-2 font-noto-sans-tc">
                {item.name}
            </h3>
            {item.description && (
                <p className="text-[1.125rem] text-gray-600 mb-1 font-medium font-roboto-slab">
                    {item.description}
                </p>
            )}
            <p className="text-[0.875rem] text-gray-500 leading-relaxed max-w-[90%]">
                {item.address}
            </p>
        </div>
    );
};
