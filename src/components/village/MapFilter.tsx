import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { LocationCategory } from '../../data/villageMapData';
import { Soup, Camera, Landmark } from 'lucide-react';

interface MapFilterProps {
    activeCategory: LocationCategory;
    onCategoryChange: (category: LocationCategory) => void;
}

export const MapFilter: React.FC<MapFilterProps> = ({ activeCategory, onCategoryChange }) => {
    const { language } = useLanguage();

    // Defines the 3 main categories shown in the design
    const categories: { id: LocationCategory; label: string; icon: React.ReactNode }[] = [
        {
            id: 'food',
            label: language === 'zh' ? '肉骨茶' : 'Bak Kut Teh',
            icon: <Soup size={28} strokeWidth={2} />
        },
        {
            id: 'attraction',
            label: language === 'zh' ? '景點' : 'Attractions',
            icon: <Camera size={28} strokeWidth={2} />
        },
        {
            id: 'temple',
            label: language === 'zh' ? '廟宇' : 'Temples',
            icon: <Landmark size={28} strokeWidth={2} />
        },
    ];

    return (
        <div className="w-full max-w-[630px] grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onCategoryChange(activeCategory === cat.id ? 'all' : cat.id)}
                    className={`
                        relative overflow-hidden group rounded-[20px] 
                        ${language === 'zh' ? 'px-5 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5' : 'px-4 py-3 md:px-4 md:py-4 lg:px-6 lg:py-5'}
                        flex items-center justify-between gap-1
                        ${language === 'zh' ? 'text-lg md:text-xl lg:text-2xl' : 'text-base md:text-lg lg:text-xl'} font-bold tracking-wider font-noto-sans-tc
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
