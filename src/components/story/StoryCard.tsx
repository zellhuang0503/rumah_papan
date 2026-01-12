import React from 'react';
import type { StoryItem } from '../../data/storyData';
import { ArrowUpRight } from 'lucide-react';

interface StoryCardProps {
    item: StoryItem;
}

export const StoryCard: React.FC<StoryCardProps> = ({ item }) => {

    // Scale Factor: 0.75
    // Base widths from Figma (approx):
    // Full: ~1680 -> 1260
    // Large: ~686 -> 514.5
    // Medium: ~544 -> 408
    // Small: ~384 -> 288 (matches grid cols)

    // Card Container Base Classes
    const containerBase = "relative bg-white rounded-[27px] overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-md";

    // 1. Banner Variant (Image Left, Text Right)
    if (item.variant === 'banner') {
        return (
            <div className={`w-full max-w-[1260px] h-[360px] p-[24px] flex items-center gap-[84px] ${containerBase}`}>
                <div className="flex-1 flex flex-col justify-start items-start gap-4 z-10">
                    <h3 className="w-[382px] text-stone-900 text-[37.5px] font-bold font-noto-sans-tc leading-[52.5px] whitespace-pre-line">
                        {item.title}
                    </h3>
                    <p className="self-stretch text-stone-900 text-[18px] font-medium font-noto-sans-tc leading-[24px]">
                        {item.description}
                    </p>
                    {item.tags.length > 0 && (
                        <div className="mt-4 text-neutral-800 text-[18px] font-bold font-noto-sans-tc">
                            {item.tags[0]}
                        </div>
                    )}
                </div>

                {/* Image Area */}
                <div className="w-[660px] h-[288px] relative rounded-[27px] overflow-hidden">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Icon Overlays */}
                    <div className="absolute top-[18px] left-[18px] flex gap-2">
                        {/* Placeholder icons */}
                    </div>
                </div>
            </div>
        );
    }

    // 2. Text Highlight Variant (White bg, Large text)
    if (item.variant === 'text-highlight') {
        return (
            <div className={`w-[514px] h-[360px] bg-white ${containerBase}`}>
                <div className="absolute top-0 left-0 w-full h-full px-[24px] py-[30px] flex flex-col justify-end items-start gap-[18px]">
                    <h3 className="self-stretch text-black text-[30px] font-bold font-noto-sans-tc leading-[43px] whitespace-pre-line">
                        {item.title}
                    </h3>
                    <p className="self-stretch text-black text-[18px] font-bold font-noto-sans-tc leading-[24px]">
                        {item.description}
                    </p>
                    {item.tags.length > 0 && (
                        <div className="absolute top-[24px] right-[24px] text-right text-neutral-800 text-[18px] font-bold font-noto-sans-tc">
                            {item.tags[0]}
                        </div>
                    )}
                </div>
                {/* Decorative background/shape */}
                <div className="w-full h-full absolute top-0 left-0 bg-stone-950/5 -z-10 pointer-events-none" />
            </div>
        );
    }

    // 3. Text Overlay Variant (Medium size, white bg, clean text)
    if (item.variant === 'text-overlay') {
        return (
            <div className={`w-[408px] h-[360px] px-[24px] py-[42px] flex flex-col justify-end gap-[24px] bg-white ${containerBase}`}>
                <div className="self-stretch">
                    <h3 className="text-black text-[27px] font-bold font-noto-sans-tc leading-[42px] whitespace-pre-line">
                        {item.title}
                    </h3>
                </div>
                <p className="self-stretch text-black text-[18px] font-medium font-noto-sans-tc leading-[24px]">
                    {item.description}
                </p>
                {item.tags.length > 0 && (
                    <div className="absolute top-[24px] right-[24px] text-right text-neutral-800 text-[18px] font-bold font-noto-sans-tc">
                        {item.tags[0]}
                    </div>
                )}
            </div>
        );
    }

    // 4. Compact Variant (Small size, centered text)
    if (item.variant === 'compact') {
        return (
            <div className={`w-[288px] h-[360px] px-[42px] flex flex-col justify-center items-center gap-[12px] bg-white ${containerBase}`}>
                <h3 className="self-stretch text-center text-black text-[18px] font-bold font-noto-sans-tc leading-[24px]">
                    {item.title}
                </h3>
                <p className="self-stretch text-center text-black text-[18px] font-medium font-noto-sans-tc leading-[24px]">
                    {item.description}
                </p>
                {item.tags.length > 0 && (
                    <div className="absolute top-[24px] right-[24px] text-right text-neutral-800 text-[18px] font-bold font-noto-sans-tc">
                        {item.tags[0]}
                    </div>
                )}
            </div>
        );
    }

    // 5. Standard / Full Image Variant
    if (item.variant === 'standard') {
        // Allow full width if specified, otherwise default to 940px
        const widthClass = item.size === 'full' ? 'w-full max-w-[1260px]' : 'w-full max-w-[940px]';

        return (
            <div className={`${widthClass} h-[360px] relative ${containerBase}`}>
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-[24px] pt-[60px] flex flex-col justify-end">
                    <h3 className="text-white text-[37.5px] font-bold font-noto-sans-tc leading-[52.5px]">
                        {item.title}
                    </h3>
                    <p className="text-white text-[18px] font-medium font-noto-sans-tc leading-[24px] mt-2">
                        {item.description}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};
