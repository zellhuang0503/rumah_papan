import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, Menu } from 'lucide-react';
import { Polaroid } from '../components/Polaroid';
import { BrandLogo } from '../components/BrandLogo';

gsap.registerPlugin(ScrollTrigger);

export const Welcome: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [scale, setScale] = useState(1);

    useEffect(() => {
        document.title = "班厝故事館 | 歡迎來到班達馬蘭";

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                // Scale the 1920px design to fit current width
                const newScale = Math.min(window.innerWidth / 1920, 1);
                setScale(newScale);
            } else {
                setScale(1);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const ctx = gsap.context(() => {
            // Desktop Animations
            const polaroids = document.querySelectorAll('.polaroid-item');
            polaroids.forEach((item) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 150 },
                    {
                        opacity: 1, y: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            end: "top 60%",
                            scrub: 1,
                        }
                    }
                );
            });
        }, containerRef);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Image assets (using placeholders for now based on user code)
    const images = [
        "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1525207934214-cdf79545aa2c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1542640244-7e67286feb8f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1517724395460-6dd82d6da0cd?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <div ref={containerRef} className="relative w-full min-h-screen bg-[#F3E3CB] overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white">

            {/* ================= MOBILE VIEW (< 1024px) ================= */}
            <div className="lg:hidden relative">
                {/* Navigation Mobile */}
                <nav className="fixed top-0 w-full h-auto py-4 bg-white/90 backdrop-blur-md z-50 flex items-center justify-between px-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <BrandLogo className="w-10 h-10 text-[#181818]" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-lg text-[#181818]">班厝故事館</h1>
                            <span className="font-serif text-[10px] text-[#181818]">RUMAH PAPAN</span>
                        </div>
                    </div>
                    <button className="p-2"><Menu className="w-6 h-6 text-[#181818]" /></button>
                </nav>

                <div className="pt-24 px-6 pb-20 flex flex-col gap-12">
                    {/* Hero Mobile */}
                    <div className="text-center flex flex-col items-center">
                        <div className="flex gap-2 mb-2 font-bold text-2xl text-[#181818]">
                            <span>歡</span><span>迎</span><span>來</span><span>到</span>
                        </div>
                        <h2 className="font-serif font-semibold text-3xl text-[#000000cc]">Welcome to</h2>
                        <h1 className="font-black text-5xl text-[#F1592C] mt-1">班達馬蘭</h1>
                        <h3 className="font-serif font-semibold text-xl text-[#000000cc] mt-2">Selamat datang di</h3>
                        <h2 className="font-serif font-semibold text-4xl text-[#F1592C] mt-1">Rumah Papan</h2>
                    </div>

                    {/* Polaroids Mobile (Simplified Stack) */}
                    {images.slice(0, 3).map((img, i) => (
                        <div key={i} className="bg-white p-3 pb-8 shadow-xl transform rotate-1">
                            <img src={img} className="w-full aspect-[4/5] object-cover bg-gray-200" alt="Story" />
                            <div className="text-center mt-4">
                                <h4 className="font-bold text-xl text-[#101828]">技能換宿</h4>
                                <p className="text-sm text-[#364153] mt-1">白天幫忙打理故事館，夜裡在班達馬蘭星空下交換故事。</p>
                            </div>
                        </div>
                    ))}

                    {/* CTA Mobile */}
                    <div className="flex justify-center">
                        <button className="bg-[#F3E3CB] border-2 border-[#242527] px-6 py-3 rounded-full font-bold text-xl">進入新村</button>
                    </div>
                </div>
            </div>


            {/* ================= DESKTOP VIEW (>= 1024px) ================= */}
            {/* Consuming User's Exact HTML Export relative to 1920px width */}
            <div className="hidden lg:block relative origin-top-left" style={{ width: '1920px', height: '100%', transform: `scale(${scale})` }}>

                {/* Background Container */}
                <div className="w-[1920px] h-[4900px] left-0 top-[282px] absolute">

                    {/* Variant 4: Top Group */}
                    <div data-property-1="Variant4" className="w-[1920px] h-[1204px] left-0 top-0 absolute">
                        {/* Decorative Dashed Box */}



                        {/* Polaroid 1: 班厝故事館 (Right, Top) */}
                        <Polaroid
                            src={images[1]}
                            alt="班厝故事館"
                            caption="班厝故事館"
                            rotation={6}
                            className="absolute left-[1144.62px] top-[10px] w-[465px] h-[523px] origin-top-left"
                        />

                        {/* Polaroid 2: 走進新村 (Left, Bottom) */}
                        <Polaroid
                            src={images[0]}
                            alt="走進新村"
                            caption="走進新村"
                            rotation={-10.61}
                            className="absolute left-[331px] top-[110px] w-[465px] h-[523px] origin-top-left"
                        />
                    </div>

                    {/* Variant 2: Middle Group (傳統習俗) */}
                    <div data-property-1="Variant2" className="w-[220px] h-[712px] left-0 top-[976px] absolute">



                        <Polaroid
                            src={images[2]}
                            alt="傳統習俗"
                            caption="傳統習俗"
                            rotation={10.5}
                            className="absolute left-[1212.25px] top-[300px] w-[465px] h-[523px] origin-top-left"
                        />
                    </div>

                    {/* Variant 2: Middle Group (技能換宿) */}
                    <div data-property-1="Variant2" className="w-[1920px] h-[597px] left-0 top-[1533px] absolute">



                        <Polaroid
                            src={images[3]}
                            alt="技能換宿"
                            caption="技能換宿"
                            rotation={-7.6}
                            className="absolute left-[316px] top-[346px] w-[465px] h-[523px] origin-top-left"
                        />
                    </div>

                    {/* Variant 2: Bottom Group (肉骨茶 & 節慶活動) */}
                    <div data-property-1="Variant2" className="w-[1939px] h-[982px] left-0 top-[1994px] absolute">





                        {/* 肉骨茶 */}
                        <Polaroid
                            src={images[4]}
                            alt="肉骨茶"
                            caption="肉骨茶"
                            rotation={-7.6}
                            className="absolute left-[270px] top-[1131px] w-[465px] h-[523px] origin-top-left"
                        />

                        {/* 節慶活動 */}
                        <Polaroid
                            src={images[0]}
                            alt="節慶活動"
                            caption="節慶活動"
                            rotation={6.91}
                            className="absolute left-[1137.90px] top-[50px] w-[465px] h-[523px] origin-top-left"
                        />
                    </div>

                    {/* Variant 2: Bottommost (木鱉果) */}
                    <div data-property-1="Variant2" className="w-[1920px] h-[771px] left-0 top-[2940px] absolute">



                        <Polaroid
                            src={images[1]}
                            alt="木鱉果"
                            caption="木鱉果"
                            rotation={6}
                            className="absolute left-[928.63px] top-[808px] w-[465px] h-[523px] origin-top-left"
                        />
                    </div>

                    {/* Bottom CTA Button */}
                    <div data-property-1="Default" className="left-[822px] top-[4500px] absolute inline-flex flex-col justify-start items-center cursor-pointer hover:scale-105 transition-transform">
                        <div className="self-stretch px-14 py-8 relative bg-orange-100 rounded-full outline outline-4 outline-offset-[-4.05px] outline-neutral-800 inline-flex justify-center items-center gap-3.5 overflow-hidden">
                            <div className="w-7 h-36 left-[-27.03px] top-[-11.62px] absolute bg-red-500"></div>
                            <div className="text-center justify-start text-black text-4xl font-medium font-sans leading-[54.86px]">進入新村</div>
                        </div>
                    </div>

                </div>

                {/* Header / Nav (Desktop) */}
                <div className="w-[1920px] px-28 py-14 left-0 top-0 absolute inline-flex justify-between items-center overflow-hidden z-50">
                    <div className="flex justify-start items-center gap-4">
                        <div className="w-20 h-20 relative">
                            <BrandLogo className="w-full h-full text-[#181818]" />
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <div className="whitespace-nowrap justify-start text-neutral-900 text-3xl font-bold font-sans leading-10">班厝故事館</div>
                            <div className="whitespace-nowrap justify-start text-neutral-900 text-xl font-normal font-serif leading-7 tracking-[0.1em]">RUMAH PAPAN</div>
                        </div>
                    </div>
                    <button className="px-8 py-4 bg-white/0 border-[3px] border-[#181818] rounded-full flex justify-center items-center gap-3 cursor-pointer hover:bg-[#181818] hover:text-white transition-all group">
                        <Mail className="w-6 h-6 text-[#181818] group-hover:text-white fill-current" />
                        <span className="justify-start text-neutral-900 text-2xl font-bold font-sans leading-8 group-hover:text-white">聯絡我們</span>
                    </button>
                </div>

                {/* Hero Text Block */}
                <div data-property-1="Variant2" className="w-[1920px] h-96 left-0 top-[313px] absolute z-20">
                    <div className="w-16 left-[300px] top-[46.19px] absolute justify-start text-black/80 text-6xl font-bold font-sans leading-[66.30px]">歡<br />迎<br />來<br />到</div>
                    <div className="left-[381.59px] top-[27px] absolute justify-start text-black/80 text-7xl font-semibold font-serif leading-[115.98px]">Welcome to </div>
                    <div className="left-[300.39px] top-[300.97px] absolute justify-start text-red-500 text-7xl font-semibold font-serif leading-[114.31px]">Rumah Papan </div>
                    <div className="left-[381.59px] top-[252.25px] absolute justify-start text-black/80 text-5xl font-semibold font-serif leading-[75.87px]">Selamat datang di </div>
                    <div className="left-[379.52px] top-[112.45px] absolute justify-start text-red-500 text-9xl font-black font-sans leading-[161.39px]">班達馬蘭</div>
                </div>

                {/* Side Floating Text */}
                <div className="w-6 h-[657px] left-[38px] top-[212px] absolute opacity-50 inline-flex flex-col justify-between items-start z-10">
                    <div className="origin-top-left rotate-90 justify-start text-neutral-800 text-base font-medium font-serif capitalize leading-6 tracking-widest whitespace-nowrap mt-20">Chinese New Village</div>
                    <div className="origin-top-left rotate-90 justify-start text-neutral-800 text-base font-medium font-serif capitalize leading-6 tracking-widest whitespace-nowrap mt-20">Bak Kut Teh</div>
                    <div className="origin-top-left rotate-90 justify-start text-neutral-800 text-base font-medium font-serif capitalize leading-6 tracking-widest whitespace-nowrap mt-20">rumah papan</div>
                </div>

                {/* Bottom Right Floating Buttons */}
                <div className="p-10 left-[1728px] top-[798px] fixed z-50 flex flex-col gap-4">
                    <div className="w-28 h-28 bg-neutral-800 rounded-full flex justify-center items-center shadow-2xl cursor-pointer hover:scale-105 transition-transform">
                        <span className="text-orange-100 text-4xl font-medium font-serif leading-[50.75px]">中文</span>
                    </div>
                    <div className="w-28 h-28 bg-neutral-800 rounded-full flex justify-center items-center shadow-2xl cursor-pointer hover:scale-105 transition-transform border-[3px] border-[#F1592C]">
                        <ArrowRight className="w-10 h-10 text-[#F1592C]" />
                    </div>
                </div>

            </div>

        </div>
    );
};
