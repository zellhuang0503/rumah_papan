import React from 'react';
import type { LocationCategory } from '../../data/villageMapData';
import { Soup, Camera, Landmark } from 'lucide-react'; // Icons: Soup(Food), Camera(Attraction), Landmark(Temple)

interface MapFilterProps {
    activeCategory: LocationCategory;
    onCategoryChange: (category: LocationCategory) => void;
}

export const MapFilter: React.FC<MapFilterProps> = ({ activeCategory, onCategoryChange }) => {
    // Defines the 3 main categories shown in the design
    const categories: { id: LocationCategory; label: string; icon: React.ReactNode }[] = [
        { id: 'food', label: '肉骨茶', icon: <Soup size={32} /> },
        { id: 'attraction', label: '景點', icon: <Camera size={32} /> },
        { id: 'temple', label: '廟宇', icon: <Landmark size={32} /> },
    ];

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onCategoryChange(activeCategory === cat.id ? 'all' : cat.id)}
                    className={`
                        relative overflow-hidden group rounded-[20px] px-8 py-10
                        flex items-center justify-between
                        text-[2rem] font-bold tracking-wider font-noto-sans-tc
                        border-[2px] transition-all duration-300
                        ${activeCategory === cat.id
                            ? 'bg-[#242527] text-[#F3E3CB] border-[#242527]'
                            : 'bg-[#F3E3CB] text-[#242527] border-[#242527] hover:bg-[#242527]/5'
                        }
                    `}
                >
                    <span className="z-10">{cat.label}</span>
                    <span className={`z-10 transition-transform duration-300 ${activeCategory === cat.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {cat.icon}
                    </span>
                </button>
            ))}
        </div>
    );
};
