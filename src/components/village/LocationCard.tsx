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
            {/* Front Side (Default) */}
            <div className="w-full h-full bg-white absolute left-0 top-0 flex flex-col justify-center items-center gap-[9px] px-6 py-4 desktop:px-[45px] desktop:py-[14px]">
                <div className="self-stretch text-center text-stone-900 text-3xl desktop:text-[34px] font-bold font-noto-sans-tc leading-[1.4]">
                    {item.name}
                </div>
                <div className="self-stretch text-center text-stone-900 text-base desktop:text-[17px] font-medium font-noto-sans-tc leading-[1.5]">
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
