import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { BrandLogo } from './BrandLogo';


interface PolaroidProps {
    src: string;
    alt: string;
    caption?: string; // Optional caption
    rotation?: number; // Pre-determined random rotation
    className?: string; // For customized positioning if needed
}

export const Polaroid: React.FC<PolaroidProps> = ({
    src,
    alt,
    caption,
    rotation = 0,
    className = ""
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial Loading Animation
        // From y: 50, opacity: 0 -> y: 0, opacity: 1, rotate: random (-3 to 3)
        const randomTilt = (Math.random() * 6) - 3; // -3 to 3
        const finalRotation = rotation || randomTilt;

        gsap.fromTo(containerRef.current,
            {
                y: 50,
                opacity: 0,
                rotation: 0
            },
            {
                y: 0,
                opacity: 1,
                rotation: finalRotation,
                duration: 1,
                ease: "power2.out",
                delay: Math.random() * 0.3 // slight stagger effect naturally
            }
        );
    }, [rotation]);

    const handleMouseEnter = () => {
        gsap.to(containerRef.current, {
            y: -10,
            scale: 1.05,
            rotation: 0, // Straighten up or wiggle
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // shadow-2xl equivalent
            duration: 0.4,
            ease: "power2.out",
            zIndex: 50 // Bring to front
        });
    };

    const handleMouseLeave = () => {
        gsap.to(containerRef.current, {
            y: 0,
            scale: 1,
            rotation: rotation, // Return to original tilt
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // shadow-lg equivalent
            duration: 0.4,
            ease: "power2.out",
            zIndex: 1 // Back to normal stack
        });
    };

    const handleMouseDown = () => {
        gsap.to(containerRef.current, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out"
        });
    };

    const handleMouseUp = () => {
        gsap.to(containerRef.current, {
            scale: 1.05, // Return to hover state
            duration: 0.1,
            ease: "power2.out"
        });
    };

    return (
        <div
            ref={containerRef}
            className={`relative p-5 bg-white shadow-lg ${className} cursor-pointer will-change-transform`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}

        >
            {/* Frame / Content Area */}
            <div className="flex flex-col h-full bg-white relative">

                {/* Image Wrapper: Overflow hidden */}
                <div ref={imageWrapperRef} className="relative w-full aspect-square overflow-hidden bg-gray-100 mb-2">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                    />
                </div>

                {/* Caption Area (Noto Sans TC)
                {caption && (
                    <div className="px-2 text-center">
                        <p className="primary-font text-[#242527] text-lg font-medium tracking-wide leading-tight">
                            {caption}
                        </p>
                    </div>
                )} */}

                {/* Decorative Element (BrandLogo) */}
                <div className="flex-1 flex items-end justify-center pb-1 opacity-60">
                    <BrandLogo className="h-10 w-auto text-[#242527]" />
                </div>
            </div>
        </div>
    );
};
