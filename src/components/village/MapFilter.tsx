import React from 'react';
import type { LocationCategory } from '../../data/villageMapData';
import { Utensils, MapPin, Landmark } from 'lucide-react';

interface MapFilterProps {
    activeCategory: LocationCategory;
    onCategoryChange: (category: LocationCategory) => void;
}

export const MapFilter: React.FC<MapFilterProps> = ({ activeCategory, onCategoryChange }) => {
    const filters: { id: LocationCategory; label: string; icon: React.ReactNode }[] = [
        { id: 'food', label: '肉骨茶', icon: <Utensils size={18} /> },
        { id: 'attraction', label: '景點', icon: <MapPin size={18} /> },
        { id: 'temple', label: '廟宇', icon: <Landmark size={18} /> },
    ];

    return (
        <div className="flex flex-wrap gap-4 items-center justify-center">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => onCategoryChange(filter.id)}
                    className={`
                        flex items-center gap-3 px-8 py-3 rounded-[8px] border transition-all duration-300
                        font-bold text-[1.125rem] tracking-wide
                        ${activeCategory === filter.id
                            ? 'bg-[#F3E3CB] border-[#F3E3CB] text-[#242527]' // Active state (based on screenshot beige)
                            : 'bg-transparent border-[#242527] text-[#242527] hover:bg-[#F3E3CB]/20' // Inactive state
                        }
                    `}
                >
                    <span>{filter.label}</span>
                    {filter.icon}
                </button>
            ))}
        </div>
    );
};
