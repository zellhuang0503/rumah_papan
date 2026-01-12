import React from 'react';
import type { LocationItem } from '../../data/villageMapData';

interface LocationCardProps {
    item: LocationItem;
}

export const LocationCard: React.FC<LocationCardProps> = ({ item }) => {
    // Dimensions scaled to fit 3 columns in 1200px content width (gap 20px)
    // Available: 1160px / 3 = ~386px. Using 384px for safety.
    // Width: 384px
    // Height: 445px
    // Radius: 16px

    // We add 'location-card-item' class for GSAP targeting in parent component
    return (
        <div className="w-[384px] h-[445px] relative rounded-[16px] overflow-hidden group shadow-md shrink-0 location-card-item">
            {/* Added initial state classes (opacity-0 etc) just in case GSAP takes a moment, but GSAP .set() usually handles it. 
                However, for safety, let's keep it clean and let GSAP handle the initial set via context to avoid flash.
                Actually, removing inline transform classes to avoid conflict with GSAP. Keeping class name only. */}

            {/* Front Side (Default) */}
            <div className="w-full h-full bg-white absolute left-0 top-0 flex flex-col justify-center items-center gap-[9px] px-[45px] py-[14px]">
                <div className="self-stretch text-center text-stone-900 text-[34px] font-bold font-noto-sans-tc leading-[48px]">
                    {item.name}
                </div>
                <div className="self-stretch text-center text-stone-900 text-[17px] font-medium font-noto-sans-tc leading-[26px]">
                    {item.subName && (
                        <>
                            {item.subName}
                            <br />
                        </>
                    )}
                    {item.address}
                </div>
            </div>

            {/* Back Side (Description Overlay) - Slides up on hover */}
            <div className="w-full h-full bg-black/50 absolute left-0 top-full group-hover:top-0 transition-all duration-500 ease-in-out px-[22px] py-[45px] flex flex-col justify-between items-start backdrop-blur-sm">
                <div className="self-stretch text-orange-100 text-[34px] font-bold font-noto-sans-tc leading-[48px]">
                    {item.featureTitle || '特色'}
                </div>
                <div className="self-stretch text-orange-100 text-[17px] font-medium font-noto-sans-tc leading-[26px] whitespace-pre-line">
                    {item.featureDescription?.join('\n')}

                    {item.distanceInfo && (
                        <>
                            <br /><br />
                            {item.distanceInfo}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
