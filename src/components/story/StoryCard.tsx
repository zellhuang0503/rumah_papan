import React, { useState, useRef, useEffect } from 'react';
import type { StoryItem } from '../../data/storyData';
import { useLanguage } from '../../contexts/LanguageContext';

interface StoryCardProps {
    item: StoryItem;
}

const ExpandableDescription: React.FC<{
    text: string;
    className?: string;
    maxHeight?: string;
    textColor?: string;
}> = ({ text, className = "", maxHeight = "160px", textColor = "text-neutral-900" }) => {
    const { language } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    // Check for overflow on mount and resize
    useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                // Check if the scrollHeight is greater than the clientHeight
                // Using a small buffer (1px) to avoid false positives due to sub-pixel rendering
                const hasOverflow = textRef.current.scrollHeight > textRef.current.clientHeight + 1;
                setIsOverflowing(hasOverflow);
            }
        };

        // Initial check
        checkOverflow();
        // Double check after small delay for font loading
        setTimeout(checkOverflow, 100);

        // Check on window resize as text wrapping might change
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [text, maxHeight]);

    const btnText = language === 'zh'
        ? (isExpanded ? '收起' : '閱讀全文')
        : (isExpanded ? 'Show Less' : 'Read More');

    return (
        <div className="flex flex-col items-start gap-1 w-full relative group/desc">
            <div
                ref={textRef}
                className={`${className} ${isExpanded ? 'overflow-y-auto pr-1 custom-scrollbar cursor-pointer' : 'line-clamp-3'} transition-all duration-300`}
                style={{
                    maxHeight: isExpanded ? maxHeight : undefined,
                    scrollbarWidth: 'thin',
                }}
                onClick={(e) => {
                    if (isExpanded) {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsExpanded(false);
                    }
                }}
                title={isExpanded ? (language === 'zh' ? '點擊收起' : 'Click to collapse') : undefined}
            >
                {text}
            </div>
            {(isOverflowing || isExpanded) && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                    className={`mt-1 text-sm font-bold border-b ${textColor === 'text-white' ? 'border-white text-white' : 'border-neutral-900 text-neutral-900'} pb-0.5 hover:opacity-70 transition-opacity z-20`}
                >
                    {btnText}
                </button>
            )}
        </div>
    );
};

const MobileStoryCard: React.FC<{ item: StoryItem }> = ({ item }) => {
    const { language } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    const TRUNCATE_LIMIT = 60;
    const shouldTruncate = item.description.length > TRUNCATE_LIMIT;
    const btnText = language === 'zh'
        ? (isExpanded ? '收起' : '閱讀全文')
        : (isExpanded ? 'Show Less' : 'Read More');

    const displayText = shouldTruncate && !isExpanded
        ? `${item.description.slice(0, TRUNCATE_LIMIT)}...`
        : item.description;

    return (
        <div className="desktop:hidden w-full bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-2 border border-neutral-100">
            {/* Image Area - Only render if imageUrl exists */}
            {item.imageUrl && (
                <div className="w-full h-[240px] md:h-[360px] lg:h-[480px] bg-neutral-100 relative overflow-hidden">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={`w-full h-full object-cover ${item.imagePosition || ''}`}
                        style={item.imageScale ? { transform: `scale(${item.imageScale})` } : {}}
                    />
                    {item.tags.length > 0 && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-neutral-900">
                            {item.tags[0]}
                        </div>
                    )}
                </div>
            )}

            {/* Content Area */}
            <div className="p-6 flex flex-col gap-3">
                {/* Title */}
                <h3 className="text-xl font-bold font-noto-sans-tc text-neutral-900 leading-tight">
                    {item.title}
                </h3>

                {/* Description with JS Truncation Logic */}
                <div className="flex flex-col gap-1">
                    <p className="text-base text-neutral-600 font-noto-sans-tc leading-relaxed whitespace-pre-line">
                        {displayText}
                    </p>

                    {shouldTruncate && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsExpanded(!isExpanded);
                            }}
                            className="self-start mt-1"
                        >
                            <span className="text-neutral-900 text-sm font-bold border-b border-neutral-900 pb-0.5">
                                {btnText}
                            </span>
                        </button>
                    )}
                </div>

                {/* Tags for Text-Only cards (since Image tags are hidden if no image) */}
                {!item.imageUrl && item.tags.length > 0 && (
                    <div className="mt-2 text-neutral-400 text-sm font-medium font-noto-sans-tc">
                        {item.tags.map(t => t).join(' ')}
                    </div>
                )}
            </div>
        </div>
    );
};

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
            <>
                <MobileStoryCard item={item} />
                <div className={`hidden desktop:flex w-full max-w-[1260px] h-[360px] p-[24px] items-center gap-[84px] ${containerBase}`}>
                    <div className="flex-1 flex flex-col justify-start items-start gap-4 z-10 h-full overflow-hidden">
                        <h3 className="w-[382px] text-stone-900 text-[37.5px] font-bold font-noto-sans-tc leading-[52.5px] whitespace-pre-line flex-shrink-0">
                            {item.title}
                        </h3>
                        <ExpandableDescription
                            text={item.description}
                            className="self-stretch text-stone-900 text-[18px] font-medium font-noto-sans-tc leading-[24px]"
                            maxHeight="140px"
                        />
                        {item.tags.length > 0 && (
                            <div className="mt-auto text-neutral-800 text-[18px] font-bold font-noto-sans-tc flex-shrink-0">
                                {item.tags[0]}
                            </div>
                        )}
                    </div>

                    {/* Image Area */}
                    <div className="w-[660px] h-[288px] relative rounded-[27px] overflow-hidden flex-shrink-0">
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.1] ${item.imagePosition || ''}`}
                            style={item.imageScale ? { transform: `scale(${item.imageScale})` } : {}}
                        />
                    </div>
                </div>
            </>
        );
    }

    // 2. Text Highlight Variant (White bg, Large text)
    if (item.variant === 'text-highlight') {
        return (
            <>
                <MobileStoryCard item={item} />
                <div className={`hidden desktop:block w-[514px] h-[360px] bg-white ${containerBase}`}>
                    <div className="absolute top-0 left-0 w-full h-full px-[24px] pb-[30px] pt-[80px] flex flex-col justify-end items-start gap-[18px]">
                        <h3 className="self-stretch text-black text-[30px] font-bold font-noto-sans-tc leading-[43px] whitespace-pre-line flex-shrink-0">
                            {item.title}
                        </h3>
                        <ExpandableDescription
                            text={item.description}
                            className="self-stretch text-black text-[18px] font-bold font-noto-sans-tc leading-[24px]"
                            maxHeight="110px"
                        />
                    </div>
                    {item.tags.length > 0 && (
                        <div className="absolute top-[24px] right-[24px] text-right text-neutral-800 text-[18px] font-bold font-noto-sans-tc">
                            {item.tags[0]}
                        </div>
                    )}
                    {/* Decorative background/shape */}
                    <div className="w-full h-full absolute top-0 left-0 bg-stone-950/5 -z-10 pointer-events-none" />
                </div>
            </>
        );
    }

    // 3. Text Overlay Variant (Medium size, white bg, clean text)
    if (item.variant === 'text-overlay') {
        return (
            <>
                <MobileStoryCard item={item} />
                <div className={`hidden desktop:flex w-[408px] h-[360px] px-[24px] pb-[42px] pt-[80px] flex-col justify-end gap-[24px] bg-white ${containerBase}`}>
                    <div className="self-stretch flex-shrink-0">
                        <h3 className="text-black text-[27px] font-bold font-noto-sans-tc leading-[42px] whitespace-pre-line">
                            {item.title}
                        </h3>
                    </div>
                    <ExpandableDescription
                        text={item.description}
                        className="self-stretch text-black text-[18px] font-medium font-noto-sans-tc leading-[24px]"
                        maxHeight="110px"
                    />
                    {item.tags.length > 0 && (
                        <div className="absolute top-[24px] right-[24px] text-right text-neutral-800 text-[18px] font-bold font-noto-sans-tc">
                            {item.tags[0]}
                        </div>
                    )}
                </div>
            </>
        );
    }

    // 4. Compact Variant (Small size, centered text)
    if (item.variant === 'compact') {
        return (
            <>
                <MobileStoryCard item={item} />
                <div className={`hidden desktop:flex w-[288px] h-[360px] px-[42px] pt-[60px] flex-col justify-center items-center gap-[12px] bg-white ${containerBase}`}>
                    <h3 className="self-stretch text-center text-black text-[18px] font-bold font-noto-sans-tc leading-[24px] flex-shrink-0">
                        {item.title}
                    </h3>
                    <div className="self-stretch text-center">
                        <ExpandableDescription
                            text={item.description}
                            className="text-black text-[18px] font-medium font-noto-sans-tc leading-[24px] text-center"
                            maxHeight="140px"
                        />
                    </div>
                    {item.tags.length > 0 && (
                        <div className="absolute top-[24px] right-[24px] text-right text-neutral-800 text-[18px] font-bold font-noto-sans-tc">
                            {item.tags[0]}
                        </div>
                    )}
                </div>
            </>
        );
    }

    // 5. Standard / Full Image Variant
    if (item.variant === 'standard') {
        // Allow full width if specified, otherwise default to 940px
        const widthClass = item.size === 'full' ? 'w-full max-w-[1260px]' : 'w-full max-w-[940px]';

        return (
            <>
                <MobileStoryCard item={item} />
                <div className={`hidden desktop:block ${widthClass} h-[360px] relative ${containerBase}`}>
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.1] ${item.imagePosition || ''}`}
                        style={item.imageScale ? { transform: `scale(${item.imageScale})` } : {}}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-[24px] pt-[60px] flex flex-col justify-end">
                        <h3 className="text-white text-[37.5px] font-bold font-noto-sans-tc leading-[52.5px] flex-shrink-0">
                            {item.title}
                        </h3>
                        <div className="mt-2">
                            <ExpandableDescription
                                text={item.description}
                                className="text-white text-[18px] font-medium font-noto-sans-tc leading-[24px]"
                                maxHeight="100px"
                                textColor="text-white"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return null;
};
