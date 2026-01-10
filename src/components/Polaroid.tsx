import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { BrandLogo } from './BrandLogo';

interface PolaroidProps {
    src: string;
    alt: string;
    caption?: string; // Used as Title for Text Card
    description?: string; // New prop for Text Card content
    rotation?: number;
    className?: string;
    disableEntryAnim?: boolean; // Allow disabling internal entry animation
}

export const Polaroid: React.FC<PolaroidProps> = ({
    src,
    alt,
    caption,
    description = "白天幫忙打理故事館，夜裡在班達馬蘭星空下交換故事。", // Default/Fallback description
    rotation = 0,
    className = "",
    disableEntryAnim = false
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const photoCardRef = useRef<HTMLDivElement>(null);
    const textCardRef = useRef<HTMLDivElement>(null);

    // State to track interaction phase
    // 'idle': Photo on top, Text hidden behind
    // 'hover': Text peeking out from behind
    // 'swapped': Text on top, Photo behind
    const [state, setState] = useState<'idle' | 'hover' | 'swapped'>('idle');

    // Initial Appearance Animation
    useEffect(() => {
        if (disableEntryAnim) {
            // If animation is disabled, we still need to apply the rotation
            if (containerRef.current) {
                gsap.set(containerRef.current, { rotation: rotation });
            }
            return;
        }

        const randomTilt = (Math.random() * 6) - 3;
        const finalRotation = rotation || randomTilt;

        gsap.fromTo(containerRef.current,
            { y: 50, opacity: 0, rotation: 0 },
            {
                y: 0, opacity: 1, rotation: finalRotation,
                duration: 1, ease: "power2.out", delay: Math.random() * 0.3
            }
        );
    }, [rotation, disableEntryAnim]);

    // Cleanup animations on unmount or state change prevention
    useEffect(() => {
        return () => { gsap.killTweensOf([photoCardRef.current, textCardRef.current]); };
    }, []);

    const handleMouseEnter = () => {
        if (state === 'swapped') return;
        setState('hover');

        // Peek Animation
        // Text card rotates and slides out slightly
        gsap.to(textCardRef.current, {
            rotation: 6,
            x: 20,
            y: 5,
            duration: 0.4,
            ease: "back.out(1.7)"
        });

        // Lift container slightly
        gsap.to(containerRef.current, {
            scale: 1.05,
            zIndex: 50,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            duration: 0.3
        });
    };

    const handleMouseLeave = () => {
        setState('idle');

        // Reset Container
        gsap.to(containerRef.current, {
            scale: 1,
            zIndex: 1,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            duration: 0.4
        });

        // Reset Cards positions
        gsap.to([photoCardRef.current, textCardRef.current], {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out"
        });

        // Ensure Z-Index reset (Photo on top)
        if (photoCardRef.current && textCardRef.current) {
            photoCardRef.current.style.zIndex = "2";
            textCardRef.current.style.zIndex = "1";
        }
    };

    const handleClick = () => {
        if (state === 'hover' || state === 'idle') {
            // Perform Swap: Text to Front
            setState('swapped');
            performSwapAnimation(textCardRef.current, photoCardRef.current);
        } else if (state === 'swapped') {
            // Perform Swap: Photo to Front
            setState('hover'); // Return to hover state essentially
            performSwapAnimation(photoCardRef.current, textCardRef.current);
        }
    };

    const performSwapAnimation = (toFront: HTMLDivElement | null, toBack: HTMLDivElement | null) => {
        if (!toFront || !toBack) return;

        const tl = gsap.timeline();

        // 1. Separate cards (Cut the deck)
        tl.to(toFront, { x: 60, rotation: 10, duration: 0.25, ease: "power1.in" }, 0)
            .to(toBack, { x: -60, rotation: -10, duration: 0.25, ease: "power1.in" }, 0)

            // 2. Swap Z-Index in the middle of movement
            .call(() => {
                toFront.style.zIndex = "2";
                toBack.style.zIndex = "1";
            })

            // 3. Stack back together
            .to(toFront, { x: 0, rotation: 0, duration: 0.35, ease: "back.out(1.2)" }, 0.25)
            .to(toBack, { x: 0, rotation: 0, duration: 0.35, ease: "back.out(1.2)" }, 0.25);
    };

    return (
        <div
            ref={containerRef}
            className={`relative bg-transparent ${className} cursor-pointer perspective-1000`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* PHOTO CARD (Default z-index: 2) */}
            <div
                ref={photoCardRef}
                className="absolute top-0 left-0 w-full h-full p-5 bg-white shadow-lg flex flex-col justify-between z-20 origin-center will-change-transform"
            >
                <div className="w-full aspect-square bg-gray-100 overflow-hidden mb-2 relative">
                    <img src={src} alt={alt} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex items-end justify-center pb-1 opacity-60">
                    <BrandLogo className="h-10 w-auto text-[#242527]" />
                </div>
            </div>

            {/* TEXT CARD (Default z-index: 1) */}
            <div
                ref={textCardRef}
                className="absolute top-0 left-0 w-full h-full p-5 bg-white shadow-lg flex flex-col items-center justify-center text-center z-10 origin-center will-change-transform"
            >
                <div className="flex flex-col items-center justify-center gap-4 h-full">
                    <h3 className="font-bold text-2xl text-[#242527] tracking-widest">{caption || "技能換宿"}</h3>
                    <div className="w-8 h-1 bg-[#F1592C] rounded-full"></div>
                    <p className="text-[#364153] text-base leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
                <div className="absolute bottom-4 opacity-60">
                    <BrandLogo className="h-6 w-auto text-[#242527]" />
                </div>
            </div>
        </div>
    );
};
