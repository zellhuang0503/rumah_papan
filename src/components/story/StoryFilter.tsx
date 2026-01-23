import React from 'react';
import { type StoryCategory, getStoryCategories } from '../../data/storyData';
import { useLanguage } from '../../contexts/LanguageContext';

interface StoryFilterProps {
    activeCategory: StoryCategory;
    onCategoryChange: (category: StoryCategory) => void;
}

export const StoryFilter: React.FC<StoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
    const { language } = useLanguage();
    const categories = getStoryCategories(language);

    return (
        <div className="flex flex-wrap justify-center items-center gap-6">
            {categories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`
                            px-[24px] py-[12px] rounded-full flex justify-center items-center gap-2
                            outline outline-[2.25px] outline-offset-[-2.25px] outline-neutral-800
                            transition-all duration-300
                            ${isActive ? 'bg-[#242527] text-white' : 'bg-transparent text-[#242527] hover:bg-[#242527]/10'}
                        `}
                    >
                        <span className={`font-bold font-noto-sans-tc ${language === 'zh' ? 'text-[18px] leading-[24px]' : 'text-[16px] leading-tight'}`}>
                            {category.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
