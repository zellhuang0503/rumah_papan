import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, Menu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Welcome: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        document.title = "班厝故事館 | 歡迎來到班達馬蘭";

        const ctx = gsap.context(() => {
            // Desktop Animations
            const polaroids = document.querySelectorAll('.polaroid-item');
            polaroids.forEach((item, index) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 100, rotation: index % 2 === 0 ? -5 : 5 },
                    {
                        opacity: 1, y: 0, rotation: index % 2 === 0 ? -3 : 3,
                        duration: 1,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%", // Trigger earlier on mobile
                            end: "top 60%",
                            scrub: 1,
                        }
                    }
                );
            });

            // SVG Draw only on large screens if desired, or adjust path
            if (pathRef.current && containerRef.current && window.innerWidth >= 1024) {
                const length = pathRef.current.getTotalLength();
                gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(pathRef.current, {
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
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const stories = [
        { id: 1, img: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&q=80&w=800", rotate: "-rotate-2 lg:-rotate-[10.61deg]", pos: "lg:top-[264px] lg:left-[calc(50%-80px)] xl:left-[396px]" },
        { id: 2, img: "https://images.unsplash.com/photo-1525207934214-cdf79545aa2c?auto=format&fit=crop&q=80&w=800", rotate: "rotate-3 lg:rotate-[6deg]", pos: "lg:top-[800px] lg:right-[calc(50%-40px)] xl:right-[362px]" },
        { id: 3, img: "https://images.unsplash.com/photo-1542640244-7e67286feb8f?auto=format&fit=crop&q=80&w=800", rotate: "rotate-1 lg:rotate-[10.5deg]", pos: "lg:top-[1200px] lg:left-[calc(50%-40px)] xl:left-[389px]" },
        { id: 4, img: "https://images.unsplash.com/photo-1517724395460-6dd82d6da0cd?auto=format&fit=crop&q=80&w=800", rotate: "-rotate-2 lg:-rotate-[7.6deg]", pos: "lg:top-[1600px] lg:right-[calc(50%-80px)] xl:right-[411px]" },
        { id: 5, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800", rotate: "rotate-2 lg:-rotate-[7.6deg]", pos: "lg:top-[2000px] lg:left-[calc(50%-0px)] xl:left-[466px]" },
    ];

    return (
        <div ref={containerRef} className="relative w-full min-h-screen bg-[#FFFFFF] overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[#FFFFFF] opacity-50 bg-noise pointer-events-none fixed" />

            {/* --- Navigation --- */}
            <nav className="absolute top-0 w-full h-auto py-6 lg:h-[175px] flex items-center justify-between px-6 md:px-12 lg:px-[120px] z-50">
                {/* Logo Group */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-10 lg:w-[80px] lg:h-[68px] bg-[#181818] mask-logo"></div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-lg md:text-2xl lg:text-[29px] leading-[140%] text-[#181818] tracking-widest">班厝故事館</h1>
                        <span className="font-serif text-xs md:text-sm lg:text-[19px] leading-[145%] text-[#181818]">RUMAH PAPAN</span>
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                <button className="lg:hidden p-2">
                    <Menu className="w-8 h-8 text-[#181818]" />
                </button>

                {/* Desktop Buttons */}
                <div className="hidden lg:flex items-center gap-[300px]">
                    <button className="flex items-center justify-center gap-2 px-8 py-4 border-[3px] border-[#242527] rounded-full hover:bg-[#242527] hover:text-white transition-all group">
                        <Mail className="w-8 h-8 group-hover:text-white" />
                        <span className="font-bold text-[24px] text-[#181818] group-hover:text-white">聯絡我們</span>
                    </button>
                </div>
            </nav>

            {/* --- Sidebar Text (Desktop Only) --- */}
            <div className="absolute left-[20px] xl:left-[38px] top-1/2 -translate-y-1/2 flex flex-col items-start gap-12 z-40 opacity-50 select-none hidden 2xl:flex">
                <span className="rotate-90 origin-left whitespace-nowrap font-serif font-medium text-[16px] text-[#242527] tracking-[0.15em]">Rumah Papan</span>
                <span className="rotate-90 origin-left whitespace-nowrap font-serif font-medium text-[16px] text-[#242527] tracking-[0.15em]">Bak Kut Teh</span>
                <span className="rotate-90 origin-left whitespace-nowrap font-serif font-medium text-[16px] text-[#242527] tracking-[0.15em]">Chinese New Village</span>
            </div>

            {/* --- Floating Buttons (Responsive Scale) --- */}
            <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex flex-col gap-3 lg:gap-4 scale-75 lg:scale-100 origin-bottom-right">
                <button className="w-16 h-16 lg:w-[112px] lg:h-[112px] bg-[#242527] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <span className="font-serif font-medium text-xl lg:text-[35px] text-[#F3E3CB]">EN</span>
                </button>
                <button className="w-16 h-16 lg:w-[112px] lg:h-[112px] bg-[#242527] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform border-[3px] border-[#F1592C] relative">
                    <ArrowRight className="w-8 h-8 lg:w-12 lg:h-12 text-[#F1592C]" />
                </button>
            </div>


            {/* --- Main Content --- */}
            <main className="relative w-full max-w-[1920px] mx-auto pt-32 lg:pt-[280px] pb-40">

                {/* SVG Path (Desktop Only for visual clarity) */}
                <svg className="hidden lg:block absolute top-[300px] left-0 w-full h-[3500px] pointer-events-none z-0" viewBox="0 0 1920 3500" preserveAspectRatio="none">
                    <path
                        ref={pathRef}
                        d="M 960 100 
                    Q 1400 600, 960 1100
                    Q 500 1600, 960 2100
                    Q 1400 2600, 960 3100"
                        fill="none"
                        stroke="#242527"
                        strokeWidth="2"
                        strokeDasharray="12,12"
                        className="opacity-100"
                    />
                </svg>

                {/* --- Hero Title Block --- */}
                {/* Desktop: Absolute Frame 299 at top: 313px */}
                <div className="relative z-10 
                    lg:absolute lg:top-[313px] lg:left-0 lg:w-full lg:h-[442px]
                    px-6 md:px-16 lg:px-0
                    mb-20 lg:mb-0 text-center lg:text-left pointer-events-none"
                >

                    {/* Mobile: Vertical Text Horizontal */}
                    <div className="lg:hidden flex justify-center gap-2 mb-4 font-bold text-3xl text-[#181818]">
                        <span>歡</span><span>迎</span><span>來</span><span>到</span>
                    </div>

                    {/* Mobile: Stacked Titles */}
                    <div className="lg:hidden flex flex-col items-center">
                        <h2 className="font-serif font-semibold text-4xl text-[#000000cc]">Welcome to</h2>
                        <h1 className="font-black text-6xl text-[#F1592C] mt-2">班達馬蘭</h1>
                        <h3 className="font-serif font-semibold text-2xl text-[#000000cc] mt-4">Selamat datang di</h3>
                        <h2 className="font-serif font-semibold text-5xl text-[#F1592C] mt-2">Rumah Papan</h2>
                    </div>


                    {/* DESKTOP: Exact Absolute Positioning */}
                    <div className="hidden lg:block relative w-full h-full scale-[0.6] xl:scale-100 origin-top-left xl:origin-top-left" style={{ width: '1920px' }}>

                        {/* 歡迎來到 */}
                        <div className="absolute left-[300px] top-[46.19px] w-[61.77px] h-[264px] flex flex-col font-bold text-[60.27px] leading-[110%] text-[rgba(0,0,0,0.8)]">
                            <span>歡</span><span>迎</span><span>來</span><span>到</span>
                        </div>

                        {/* Welcome to */}
                        <div className="absolute left-[381.59px] top-[27px] w-[448px] h-[116px] font-serif font-semibold text-[79.99px] leading-[145%] text-[rgba(0,0,0,0.8)]">
                            Welcome to
                        </div>

                        {/* 班達馬蘭 */}
                        <div className="absolute left-[379.52px] top-[112.45px] w-[462px] h-[161px] font-sans font-black text-[115.28px] leading-[140%] text-[#F1592C]">
                            班達馬蘭
                        </div>

                        {/* Selamat datang di */}
                        <div className="absolute left-[381.59px] top-[252.25px] w-[448px] h-[76px] font-serif font-semibold text-[52.32px] leading-[145%] text-[rgba(0,0,0,0.8)]">
                            Selamat datang di
                        </div>

                        {/* Rumah Papan */}
                        <div className="absolute left-[300.39px] top-[300.97px] w-[529px] h-[114px] font-serif font-semibold text-[78.84px] leading-[145%] text-[#F1592C]">
                            Rumah Papan
                        </div>

                    </div>
                </div>

                {/* --- Polaroids Grid (Responsive: Flex on Mobile, Absolute on Desktop) --- */}
                <div className="relative w-full flex flex-col items-center gap-16 lg:block lg:h-[2800px]">
                    {stories.map((story, i) => (
                        <div
                            key={story.id}
                            // Mobile: Relative, Stacked, scaled down
                            // Desktop: Absolute positioned based on props
                            className={`
                        polaroid-item 
                        relative lg:absolute 
                        w-[280px] md:w-[350px] lg:w-[465px] 
                        bg-white p-3 lg:p-[13px] pb-8 lg:pb-[40px] 
                        shadow-2xl 
                        ${story.rotate} 
                        ${story.pos} 
                        transition-transform hover:z-20 hover:scale-105 duration-300
                    `}
                        >
                            <div className="relative w-full aspect-[439/455] bg-gray-200 overflow-hidden mb-4">
                                <img src={story.img} alt="Story" className="w-full h-full object-cover filter contrast-[1.1]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>

                            <div className="flex flex-col items-center text-center px-2 lg:px-4">
                                <h4 className="font-bold text-2xl lg:text-[41px] leading-[140%] text-[#101828]">技能換宿</h4>
                                <p className="font-medium text-sm lg:text-[24px] leading-[140%] text-[#364153] mt-2 max-w-[390px]">
                                    白天幫忙打理故事館，夜裡在班達馬蘭星空下交換故事。
                                </p>
                                <div className="w-[30px] lg:w-[48px] h-[3px] lg:h-[4px] bg-[#F1592C] rounded-full my-3 lg:my-4"></div>
                                <span className="font-serif text-xs lg:text-[14px] text-[#181818] opacity-40 absolute bottom-3 lg:bottom-4 right-3 lg:right-4">rumah papan</span>
                                <span className="absolute top-3 lg:top-4 left-3 lg:left-4 font-sans text-[10px] lg:text-[12px] text-gray-400 opacity-80">EST. 1951</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Bottom CTA --- */}
                <div className="lg:absolute lg:top-[3000px] lg:left-1/2 lg:-translate-x-1/2 mt-20 pb-40 flex justify-center w-full">
                    <div className="flex flex-col items-center gap-4 cursor-pointer group scale-75 md:scale-90 lg:scale-100 origin-center">
                        <div className="relative w-[276px] h-[120px] bg-[#F3E3CB] border-[4px] border-[#242527] rounded-full flex items-center justify-center shadow-[0_4px_0_#242527] group-hover:shadow-none group-hover:translate-y-1 transition-all">
                            <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[30px] h-[142px] bg-[#F1592C] rounded-sm"></div>
                            <span className="font-bold text-[39px] text-black tracking-widest z-10">進入新村</span>
                        </div>
                        <div className="w-[31px] h-[31px] bg-[#242527] rotate-45 mt-[-15px] group-hover:mt-0 transition-all"></div>
                    </div>
                </div>

            </main>

        </div>
    );
};
