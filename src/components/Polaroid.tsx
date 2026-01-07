import React from 'react';

type PolaroidProps = {
    src: string;
    alt?: string;
    caption?: string;
    className?: string; // For positioning and rotation
    style?: React.CSSProperties;
};

export const Polaroid: React.FC<PolaroidProps> = ({
    src,
    alt = 'Photo',
    caption,
    className = '',
    style
}) => {
    return (
        <div
            className={`bg-[#EAE1D4] p-4 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:z-50 ${className}`}
            style={style}
        >
            <div className="aspect-[4/5] w-full overflow-hidden bg-gray-200 mb-4 filter sepia-[.15]">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            </div>
            {caption && (
                <div className="text-center font-serif italic text-[#242527] text-sm tracking-wide">
                    {caption}
                </div>
            )}
        </div>
    );
};
