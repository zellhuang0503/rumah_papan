import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight } from 'lucide-react';
// import { Polaroid } from './Polaroid'; // We'll build a custom structure or reuse it if fits

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
    bg: '#F3EFE9',        // Lighter cream background matching the image
    primary: '#EA580C',   // Orange for text
    text: '#1F2937',      // Dark gray/black
    frame: '#FFFFFF',     // White frame for polaroid
};

export const PolaroidHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);
    const polaroidMainRef = useRef<HTMLDivElement>(null);
    const polaroidSmallRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Line Animation
            if (lineRef.current) {
                const length = lineRef.current.getTotalLength();
                gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(lineRef.current, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    }
                });
            }

            // Main Polaroid Float
            gsap.to(polaroidMainRef.current, {
                y: -10,
                rotation: 3,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Small Polaroid Float
            gsap.to(polaroidSmallRef.current, {
                y: -5,
                rotation: -8,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full min-h-screen bg-[#F3EFE9] overflow-hidden px-8 py-6 font-sans flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start relative z-20">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    {/* House Icon Concept */}
                    <div className="relative w-12 h-12">
                        <svg viewBox="0 0 40 40" className="w-full h-full text-black" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20 5L5 20H10V35H30V20H35L20 5Z" />
                            <rect x="15" y="25" width="10" height="10" />
                        </svg>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-xl leading-none text-black tracking-wide">班厝故事館</h1>
                        <span className="text-xs tracking-[0.2em] text-black uppercase mt-1">RUMAH PAPAN</span>
                    </div>
                </div>

                {/* Contact Button */}
                <button className="flex items-center gap-3 bg-[#EAE1D4] border border-black rounded-full px-6 py-2 hover:bg-black hover:text-[#EAE1D4] transition-all shadow-sm">
                    <Mail size={18} />
                    <span className="font-bold tracking-wide text-sm">聯絡我們</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex items-center justify-center relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 w-full items-center">

                    {/* Left: Typography Block */}
                    <div className="flex justify-center lg:justify-end pr-0 lg:pr-20 relative">
                        {/* Vertical Text "歡迎來到" */}
                        <div className="hidden lg:flex flex-col justify-start pt-2 mr-6 h-[200px]">
                            <span className="text-3xl font-bold text-[#242527] leading-tight">歡</span>
                            <span className="text-3xl font-bold text-[#242527] leading-tight">迎</span>
                            <span className="text-3xl font-bold text-[#242527] leading-tight">來</span>
                            <span className="text-3xl font-bold text-[#242527] leading-tight">到</span>
                        </div>

                        {/* Main Text Block */}
                        <div className="flex flex-col items-start lg:items-start text-left">
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#242527] mb-2 tracking-tight">Welcome to</h2>
                            <h1 className="text-6xl lg:text-7xl font-bold text-[#EA580C] mb-4 tracking-tight leading-none">班達馬蘭</h1>
                            <h3 className="text-3xl lg:text-4xl font-bold text-[#242527] mb-1">Selamat datang di</h3>
                            <h1 className="text-5xl lg:text-6xl font-bold text-[#EA580C] tracking-tight leading-none">Rumah Papan</h1>

                            {/* Mobile only vertical text fallback */}
                            <p className="lg:hidden mt-4 text-xl text-gray-500 font-bold">(歡迎來到)</p>
                        </div>
                    </div>

                    {/* Right: Polaroid Block */}
                    <div className="relative flex justify-center lg:justify-start h-[500px] lg:h-[600px] items-center">
                        {/* Dashed Line Background */}
                        <svg className="absolute w-[150%] h-[150%] -left-[20%] -top-[20%] pointer-events-none z-0 opacity-40">
                            <path
                                ref={lineRef}
                                d="M 100 0 Q 300 400, 500 600"
                                fill="none"
                                stroke="#555"
                                strokeWidth="2"
                                strokeDasharray="12, 12"
                            />
                        </svg>

                        {/* Main Polaroid */}
                        <div
                            ref={polaroidMainRef}
                            className="relative bg-white p-4 shadow-2xl transform rotate-2 w-72 md:w-80 lg:w-96 z-20"
                        >
                            {/* Photo Container */}
                            <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-6 relative">
                                {/* Red Banner Overlay */}
                                <div className="absolute top-0 left-0 w-full bg-[#EA580C] h-6 flex justify-between items-center px-2 z-10">
                                    <div className="flex w-full justify-between text-[#EAE1D4] font-serif font-bold text-sm">
                                        <span>马</span><span>兰</span><span>新</span><span>村</span><span>故</span>
                                    </div>
                                    {/* Small hanging tags simulation */}
                                    <div className="absolute top-full left-0 w-full flex justify-between px-2">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="w-1 h-1 bg-[#EA580C] rounded-b-full"></div>
                                        ))}
                                    </div>
                                </div>

                                <img
                                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800"
                                    alt="Main"
                                    className="w-full h-full object-cover mt-2 filter contrast-110 sepia-[.1]"
                                />
                            </div>

                            {/* Bottom Stamp/Icon */}
                            <div className="flex justify-center pb-2">
                                <div className="w-8 h-8 text-gray-400 opacity-60">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Area */}
            <div className="relative z-30 w-full flex justify-between items-end">
                {/* Peeking Polaroid */}
                <div
                    ref={polaroidSmallRef}
                    className="w-56 bg-white p-3 shadow-lg transform -rotate-12 translate-y-16 hover:translate-y-4 transition-transform duration-500 cursor-pointer"
                >
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=800"
                            alt="Small"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Language Switcher */}
                <button className="w-14 h-14 bg-[#1F2937] text-[#EAE1D4] rounded-full flex items-center justify-center text-lg font-bold shadow-xl hover:scale-105 transition-transform mb-4 mr-4">
                    中文
                </button>
            </div>
        </div>
    );
};
