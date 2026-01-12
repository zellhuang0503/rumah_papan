import React from 'react';
import { type StoryCategory, STORY_CATEGORIES } from '../../data/storyData';

interface StoryFilterProps {
    activeCategory: StoryCategory;
    onCategoryChange: (category: StoryCategory) => void;
}

export const StoryFilter: React.FC<StoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-6">
            {STORY_CATEGORIES.map((category) => {
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
                        <span className="text-[18px] font-bold font-noto-sans-tc leading-[24px]">
                            {category.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
