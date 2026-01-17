import React from 'react';
import type { LocationItem } from '../../data/villageMapData';

interface LocationCardProps {
    item: LocationItem;
}

export const LocationCard: React.FC<LocationCardProps> = ({ item }) => {
    // RWD:
    // Mobile: w-full, Height auto or fixed? Current fixed 445px might be too tall for mobile.
    // Desktop: w-[384px], h-[445px].

    return (
        <div className="w-full md:w-[calc(50%-10px)] desktop:w-[384px] h-[400px] desktop:h-[445px] relative rounded-[16px] overflow-hidden group shadow-md shrink-0 location-card-item">
            {/* Background Image (if any) */}
            {item.image && (
                <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            )}

            {/* Front Side (Default) */}
            {/* If image exists, use dark overlay and white text. Else white bg and dark text. */}
            <div className={`w-full h-full absolute left-0 top-0 flex flex-col justify-center items-center gap-[9px] px-6 py-4 desktop:px-[45px] desktop:py-[14px] transition-all
                ${item.image ? 'bg-black/30 backdrop-blur-[2px]' : 'bg-white'}
            `}>
                <div className={`self-stretch text-center text-3xl desktop:text-[34px] font-bold font-noto-sans-tc leading-[1.4] whitespace-pre-line
                    ${item.image ? 'text-white drop-shadow-md' : 'text-stone-900'}
                `}>
                    {item.name}
                </div>
                <div className={`self-stretch text-center text-base desktop:text-[17px] font-medium font-noto-sans-tc leading-[1.5]
                    ${item.image ? 'text-white/90 drop-shadow-sm' : 'text-stone-900'}
                `}>
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
            <div className="w-full h-full bg-black/50 absolute left-0 top-full group-hover:top-0 transition-all duration-500 ease-in-out px-6 py-8 desktop:px-[22px] desktop:py-[45px] flex flex-col justify-between items-start backdrop-blur-sm">
                <div className="self-stretch text-orange-100 text-3xl desktop:text-[34px] font-bold font-noto-sans-tc leading-[1.4]">
                    {item.featureTitle || '特色'}
                </div>
                <div className="self-stretch text-orange-100 text-base desktop:text-[17px] font-medium font-noto-sans-tc leading-[1.5] whitespace-pre-line">
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
