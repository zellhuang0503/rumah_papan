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
            className={`bg-white p-4 shadow-lg transform transition-transform hover:scale-105 hover:z-10 ${className}`}
            style={style}
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200 mb-4">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            </div>
            {caption && (
                <div className="text-center font-handwriting text-gray-600 text-sm"> {/* Assuming a handwriting font style for caption */}
                    {caption}
                </div>
            )}
        </div>
    );
};
