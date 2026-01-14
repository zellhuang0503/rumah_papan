import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { GuidelineLayer } from '../components/GuidelineLayer';
import { Polaroid } from '../components/Polaroid';

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

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Use useLayoutEffect for GSAP to ensure DOM is fully updated with new scale before calculating triggers
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Set Initial States (Static Visible Items)
            // P1, P2, and Line 1 (P1->P2) are ALWAYS visible.
            gsap.set([".polaroid-1", ".polaroid-2"], { autoAlpha: 1 });
            gsap.set("#mask-path-1", { strokeDashoffset: 0 }); // Show Line 1

            // 2. Set Initial Hidden States for Scroll Items (P3+)
            // Hide P3-P7 and their incoming lines (2-7)
            gsap.set([".polaroid-3", ".polaroid-4", ".polaroid-5", ".polaroid-6", ".polaroid-7", ".cta-button"], { autoAlpha: 0, y: 50 });
            gsap.set(["#mask-path-2", "#mask-path-3", "#mask-path-4", "#mask-path-5", "#mask-path-6", "#mask-path-7"], { strokeDashoffset: 10000 });

            // 3. Define Scroll Reveal Helper
            const revealItem = (triggerClass: string, lineId: string | null, targetClass: string) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerClass, // Trigger when this polaroid hits the view
                        start: "top 80%",      // When top of polaroid hits 80% viewport height
                        end: "top 50%",
                        toggleActions: "play none none reverse" // Play on enter, reverse on leave up
                    }
                });

                // If there's a connecting line, draw it first
                if (lineId) {
                    tl.to(lineId, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" });
                }

                // Then fade in the polaroid
                tl.to(targetClass, { autoAlpha: 1, y: 0, duration: 0.8 }, lineId ? "<+=0.5" : 0); // Overlap slightly
            };

            // 4. Register Animations
            // P3 (with Line 2 from P2)
            revealItem(".polaroid-3", "#mask-path-2", ".polaroid-3");

            // P4 (with Line 3 from P3)
            revealItem(".polaroid-4", "#mask-path-3", ".polaroid-4");

            // P5 (with Line 4 from P4)
            revealItem(".polaroid-5", "#mask-path-4", ".polaroid-5");

            // P6 (with Line 5 from P5)
            revealItem(".polaroid-6", "#mask-path-5", ".polaroid-6");

            // P7 (with Line 6 from P6)
            revealItem(".polaroid-7", "#mask-path-6", ".polaroid-7");

            // CTA (with Line 7 from P7)
            revealItem(".cta-button", "#mask-path-7", ".cta-button");

            // 5. Hero Text Entrance Animation (Wave Effect)
            // Initial State: Hidden and shifted left
            gsap.set([".hero-text-vertical", ".hero-text-row-1", ".hero-text-row-2", ".hero-text-row-3", ".hero-text-row-4", ".hero-text-vertical-mobile", ".hero-text-row-1-mobile", ".hero-text-row-2-mobile", ".hero-text-row-3-mobile", ".hero-text-row-4-mobile"], { autoAlpha: 0, x: -50 });

            const textTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

            // Animate Vertical Text first
            textTl.to([".hero-text-vertical", ".hero-text-vertical-mobile"], { autoAlpha: 1, x: 0 })
                // Then the horizontal rows sequentially with overlapping stagger (wave effect)
                .to([".hero-text-row-1", ".hero-text-row-2", ".hero-text-row-3", ".hero-text-row-4", ".hero-text-row-1-mobile", ".hero-text-row-2-mobile", ".hero-text-row-3-mobile", ".hero-text-row-4-mobile"], {
                    autoAlpha: 1,
                    x: 0,
                    stagger: 0.15
                }, "-=0.5"); // Start slightly before vertical text finishes

            // Force ScrollTrigger to refresh positions after setup
            ScrollTrigger.refresh();

        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [scale]);

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
                <nav className="fixed top-0 w-full h-auto py-4 bg-transparent z-50 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <BrandLogo className="w-10 h-10 text-[#181818]" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-lg text-[#181818]">班厝故事館</h1>
                            <span className="font-serif text-[10px] text-[#181818]">RUMAH PAPAN</span>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-white/0 border-[2px] border-[#181818] rounded-full flex justify-center items-center gap-2 cursor-pointer active:bg-[#181818] active:text-white transition-all group">
                        <Mail className="w-4 h-4 text-[#181818] group-hover:text-white transition-colors" />
                        <span className="text-[#181818] text-sm font-bold font-sans leading-none group-hover:text-white pt-[1px]">聯絡我們</span>
                    </button>
                </nav>

                <div className="pt-24 px-6 pb-20 flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-8 items-center md:items-start max-w-[768px] mx-auto">
                    {/* Hero Mobile (Spans 2 cols on Tablet) */}
                    <div className="md:col-span-2 text-center flex flex-col items-center mb-4">
                        <div className="hero-text-vertical-mobile flex gap-2 mb-2 font-bold text-2xl text-[#181818]">
                            <span>歡</span><span>迎</span><span>來</span><span>到</span>
                        </div>
                        <h2 className="hero-text-row-1-mobile font-serif font-semibold text-3xl text-[#000000cc]">Welcome to</h2>
                        <h1 className="hero-text-row-2-mobile font-black text-5xl text-[#F1592C] mt-1">班達馬蘭</h1>
                        <h3 className="hero-text-row-3-mobile font-serif font-semibold text-xl text-[#000000cc] mt-2">Selamat datang di</h3>
                        <h2 className="hero-text-row-4-mobile font-serif font-semibold text-4xl text-[#F1592C] mt-1">Rumah Papan</h2>
                    </div>

                    {/* Polaroids Mobile (Simplified Stack) - 7 Items, 240px width */}
                    {[
                        { src: images[1], caption: "班厝故事館", desc: "班厝故事館" },
                        { src: images[0], caption: "走進新村", desc: "走進新村" },
                        { src: images[2], caption: "傳統習俗", desc: "傳統習俗" },
                        { src: images[3], caption: "技能換宿", desc: "技能換宿" },
                        { src: images[0], caption: "節慶活動", desc: "節慶活動" },
                        { src: images[4], caption: "肉骨茶", desc: "肉骨茶" },
                        { src: images[1], caption: "木鱉果", desc: "木鱉果" },
                    ].map((item, i) => (
                        <div key={i} className="pointer-events-auto flex justify-center w-full">
                            {/* Wrapper: Width 240px. Original 465x523. Scale needed: 240/465 ≈ 0.516. Height ≈ 270px */}
                            <div style={{ width: '240px', height: '270px', position: 'relative' }}>
                                {/* Inner renders at full size (465x523) then scales down */}
                                <div style={{ width: '465px', height: '523px', transform: 'scale(0.5161)', transformOrigin: 'top left' }}>
                                    <Polaroid
                                        src={item.src}
                                        alt={item.caption}
                                        caption={item.caption}
                                        description={item.desc}
                                        className="w-full h-full shadow-xl transform rotate-1"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* CTA Mobile */}
                    <div className="flex justify-center pb-32 md:col-span-2 mt-8">
                        <Link to="/home" className="bg-[#F3E3CB] border-2 border-[#242527] px-6 py-3 rounded-full font-bold text-xl text-[#242527]">進入新村</Link>
                    </div>
                </div>

                {/* Mobile Fixed Bottom Right Buttons */}
                <div className="lg:hidden fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-auto">
                    <div className="w-14 h-14 bg-neutral-800 rounded-full flex justify-center items-center shadow-xl cursor-pointer active:scale-95 transition-transform">
                        <span className="text-orange-100 text-lg font-medium font-serif">中文</span>
                    </div>
                    <Link to="/home" className="w-14 h-14 bg-neutral-800 rounded-full flex justify-center items-center shadow-xl cursor-pointer active:scale-95 transition-transform border-[2px] border-[#F1592C]">
                        <ArrowRight className="w-6 h-6 text-[#F1592C]" />
                    </Link>
                </div>
            </div>


            {/* ================= DESKTOP VIEW (>= 1024px) ================= */}
            {/* Wrapper to handle the flow height of the scaled content */}
            <div className="hidden lg:block relative" style={{ height: `${5200 * scale}px` }}> {/* Dynamically adjust height */}
                <div className="absolute top-0 left-0 origin-top-left" style={{ width: '1920px', height: '5200px', transform: `scale(${scale})` }}>

                    {/* Background Container */}
                    <div className="w-[1920px] h-[4900px] left-0 top-[282px] absolute">

                        {/* Dashed Guideline Layer */}
                        <GuidelineLayer />

                        {/* Variant 4: Top Group */}
                        <div data-property-1="Variant4" className="w-[1920px] h-[1204px] left-0 top-0 absolute">
                            {/* Decorative Dashed Box */}



                            {/* Polaroid 1: 班厝故事館 (Right, Top) */}
                            <Polaroid
                                src={images[1]}
                                alt="班厝故事館"
                                caption="班厝故事館"
                                rotation={6}
                                className="absolute left-[1144.62px] top-[10px] w-[465px] h-[523px] origin-top-left polaroid-1"
                                disableEntryAnim={true}
                            />

                            {/* Polaroid 2: 走進新村 (Left, Bottom) */}
                            <Polaroid
                                src={images[0]}
                                alt="走進新村"
                                caption="走進新村"
                                rotation={-10.61}
                                className="absolute left-[331px] top-[110px] w-[465px] h-[523px] origin-top-left polaroid-2"
                                disableEntryAnim={true}
                            />
                        </div>

                        {/* Variant 2: Middle Group (傳統習俗) */}
                        <div data-property-1="Variant2" className="w-[220px] h-[712px] left-0 top-[976px] absolute">



                            <Polaroid
                                src={images[2]}
                                alt="傳統習俗"
                                caption="傳統習俗"
                                rotation={10.5}
                                className="absolute left-[1212.25px] top-[300px] w-[465px] h-[523px] origin-top-left polaroid-3"
                                disableEntryAnim={true}
                            />
                        </div>

                        {/* Variant 2: Middle Group (技能換宿) */}
                        <div data-property-1="Variant2" className="w-[1920px] h-[597px] left-0 top-[1533px] absolute">



                            <Polaroid
                                src={images[3]}
                                alt="技能換宿"
                                caption="技能換宿"
                                rotation={-7.6}
                                className="absolute left-[316px] top-[346px] w-[465px] h-[523px] origin-top-left polaroid-4"
                                disableEntryAnim={true}
                            />
                        </div>

                        {/* Variant 2: Bottom Group (肉骨茶 & 節慶活動) */}
                        <div data-property-1="Variant2" className="w-[1939px] h-[982px] left-0 top-[1994px] absolute">





                            {/* 肉骨茶 - This is Visually Lower, so it's P6 */}
                            <Polaroid
                                src={images[4]}
                                alt="肉骨茶"
                                caption="肉骨茶"
                                rotation={-7.6}
                                className="absolute left-[270px] top-[1131px] w-[465px] h-[523px] origin-top-left polaroid-6"
                                disableEntryAnim={true}
                            />

                            {/* 節慶活動 - This is Visually Higher, so it's P5 */}
                            <Polaroid
                                src={images[0]}
                                alt="節慶活動"
                                caption="節慶活動"
                                rotation={6.91}
                                className="absolute left-[1137.90px] top-[50px] w-[465px] h-[523px] origin-top-left polaroid-5"
                                disableEntryAnim={true}
                            />
                        </div>

                        {/* Variant 2: Bottommost (木鱉果) */}
                        <div data-property-1="Variant2" className="w-[1920px] h-[771px] left-0 top-[2940px] absolute pointer-events-none">



                            <Polaroid
                                src={images[1]}
                                alt="木鱉果"
                                caption="木鱉果"
                                rotation={6}
                                className="absolute left-[928.63px] top-[808px] w-[465px] h-[523px] origin-top-left pointer-events-auto polaroid-7"
                                disableEntryAnim={true}
                            />
                        </div>

                        {/* Bottom CTA Button */}
                        <Link to="/home" data-property-1="Default" className="left-[822px] top-[4500px] absolute inline-flex flex-col justify-start items-center cursor-pointer hover:scale-105 transition-transform cta-button">
                            <div className="self-stretch px-14 py-8 relative bg-orange-100 rounded-full outline outline-4 outline-offset-[-4.05px] outline-neutral-800 inline-flex justify-center items-center gap-3.5 overflow-hidden">
                                <div className="w-7 h-36 left-[-27.03px] top-[-11.62px] absolute bg-[#F1592C]"></div>
                                <div className="text-center justify-start text-black text-4xl font-medium font-sans leading-[54.86px]">進入新村</div>
                            </div>
                        </Link>

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
                            <Mail className="w-6 h-6 text-[#181818] group-hover:text-white transition-colors" />
                            <span className="justify-start text-neutral-900 text-2xl font-bold font-sans leading-none group-hover:text-white pt-[3px]">聯絡我們</span>
                        </button>
                    </div>

                    {/* Hero Text Block */}
                    {/* Hero Text Block - Fixed Size Container 540x370 */}
                    {/* Hero Text Block - Fixed Size Container 470px, Vertical Gap 10px */}
                    <div
                        data-property-1="Variant2"
                        className="absolute left-[300px] top-[340px] z-20 w-[470px] flex flex-col gap-[10px] pointer-events-none"
                        style={{ transform: 'scale(1.1)', transformOrigin: 'top left' }}
                    >

                        {/* Top Section: Vertical Text + Right Aligned Stack */}
                        <div className="flex justify-start gap-[10px] items-stretch w-full pr-0 pointer-events-auto">
                            {/* Left: Vertical Text (Justified to match Right Stack Height) */}
                            <div className="hero-text-vertical flex flex-col justify-between h-full text-black/80 text-[56px] font-bold font-sans leading-none">
                                <span>歡</span><span>迎</span><span>來</span><span>到</span>
                            </div>

                            {/* Right: Horizontal Text Stack - Flexible Width to fill remaining space of 470px */}
                            <div className="flex flex-col flex-1 gap-1">
                                {/* Line 1: Welcome to */}
                                <div className="hero-text-row-1 flex justify-between w-full text-black/80 text-7xl font-semibold font-serif leading-none">
                                    <span>Welcome</span>
                                    <span>to</span>
                                </div>

                                {/* Line 2: 班達馬蘭 */}
                                <div className="hero-text-row-2 flex justify-between w-full text-[#F1592C] text-8xl font-black font-sans leading-none mt-[-5px]">
                                    <span>班</span><span>達</span><span>馬</span><span>蘭</span>
                                </div>

                                {/* Line 3: Selamat datang di */}
                                <div className="hero-text-row-3 flex justify-between w-full text-black/80 text-5xl font-semibold font-serif leading-none mt-1">
                                    <span>Selamat</span>
                                    <span>datang</span>
                                    <span>di</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section: Rumah Papan (Centered, 70px as compromise) */}
                        <div className="hero-text-row-4 w-[470px] text-center text-[#F1592C] text-[70px] font-semibold font-serif leading-none tracking-normal whitespace-nowrap">Rumah Papan</div>
                    </div>





                </div>

                {/* Side Floating Text - Fixed Position (Outside Scaled Container) */}
                <div className="hidden lg:block fixed top-0 left-0 bg-transparent z-10 pointer-events-none" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                    <div className="w-6 h-[657px] left-[38px] top-[212px] absolute opacity-50 inline-flex flex-col justify-between items-start">
                        <div className="origin-top-left rotate-90 justify-start text-neutral-800 text-base font-medium font-serif capitalize leading-6 tracking-widest whitespace-nowrap mt-20">Chinese New Village</div>
                        <div className="origin-top-left rotate-90 justify-start text-neutral-800 text-base font-medium font-serif capitalize leading-6 tracking-widest whitespace-nowrap mt-20">Bak Kut Teh</div>
                        <div className="origin-top-left rotate-90 justify-start text-neutral-800 text-base font-medium font-serif capitalize leading-6 tracking-widest whitespace-nowrap mt-20">rumah papan</div>
                    </div>

                    {/* Bottom Right Floating Buttons - Fixed Position */}
                    <div className="p-10 left-[1728px] top-[798px] absolute z-50 flex flex-col gap-4 pointer-events-auto">
                        <div className="w-28 h-28 bg-neutral-800 rounded-full flex justify-center items-center shadow-2xl cursor-pointer hover:scale-105 transition-transform">
                            <span className="text-orange-100 text-4xl font-medium font-serif leading-[50.75px]">中文</span>
                        </div>
                        <Link to="/home" className="w-28 h-28 bg-neutral-800 rounded-full flex justify-center items-center shadow-2xl cursor-pointer hover:scale-105 transition-transform border-[3px] border-[#F1592C] flex justify-center items-center">
                            <ArrowRight className="w-10 h-10 text-[#F1592C]" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};
