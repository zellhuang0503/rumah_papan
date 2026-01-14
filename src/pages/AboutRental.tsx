import React, { useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { RENTAL_DATA } from '../data/aboutData';
import { MoveRight, ArrowUpRight } from 'lucide-react';

export const AboutRental: React.FC = () => {
    // Scaling Rules (1920 -> 1440, factor 0.75)
    // Width: 1680 * 0.75 = 1260px
    // Spacing: 120 * 0.75 = 90px
    // Fonts: 72->54, 60->45, 50->37.5, 24->18

    // Carousel State
    const [currentHighlight, setCurrentHighlight] = useState(0);

    const nextHighlight = () => {
        if (!RENTAL_DATA?.highlights) return;
        setCurrentHighlight((prev) => (prev + 1) % RENTAL_DATA.highlights.length);
    };

    const prevHighlight = () => {
        if (!RENTAL_DATA?.highlights) return;
        setCurrentHighlight((prev) => (prev - 1 + RENTAL_DATA.highlights.length) % RENTAL_DATA.highlights.length);
    };

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-20 desktop:gap-[160px] px-6 desktop:px-0">
                {/* Header Group */}
                <div className="w-full flex flex-col items-center gap-12 desktop:gap-[100px]">
                    {/* Page Title */}
                    <h1 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-[1.4] text-center">
                        場地租借
                    </h1>

                    {/* Hero / Highlights Carousel */}
                    <section className="w-full max-w-[1200px] h-[400px] desktop:h-[600px] relative rounded-[21px] overflow-hidden group">
                        {/* Background Images */}
                        {RENTAL_DATA?.highlights?.map((item, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentHighlight ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                {/* Placeholder for Image */}
                                <div className="w-full h-full bg-neutral-800 relative">
                                    <img
                                        src={`https://placehold.co/1200x600?text=Slide+${index + 1}`}
                                        className="w-full h-full object-cover opacity-70"
                                        alt={item.title}
                                    />
                                    {/* Bottom Left Gradient/Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                                </div>

                                {/* Text Content - Bottom Left - Scaled Padding */}
                                <div className="absolute bottom-6 left-6 desktop:bottom-[60px] desktop:left-[60px] text-white">
                                    <h2 className="text-2xl desktop:text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4] mb-2 desktop:mb-[12px] drop-shadow-md">
                                        {item.title}
                                    </h2>
                                    <p className="text-lg desktop:text-[30px] font-bold font-['Noto_Sans_TC'] leading-[1.4] drop-shadow-md max-w-[900px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Controls Bottom Right (Dots + Arrows) */}
                        <div className="absolute bottom-6 right-6 desktop:bottom-[60px] desktop:right-[60px] z-20 flex items-center gap-4 desktop:gap-[24px]">
                            {/* Dots */}
                            <div className="flex gap-[12px] bg-red-500/0 p-2 text-white">
                                {RENTAL_DATA?.highlights?.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentHighlight(index)}
                                        className={`w-[12px] h-[12px] rounded-full border border-white transition-all ${index === currentHighlight ? 'bg-neutral-900 border-neutral-900 scale-125' : 'bg-transparent hover:bg-white/50'}`}
                                    />
                                ))}
                            </div>

                            {/* Arrows - Hidden on Mobile, Visible on Desktop */}
                            <div className="hidden desktop:flex gap-[12px]">
                                <button
                                    onClick={prevHighlight}
                                    className="w-[72px] h-[72px] rounded-full border-[2.25px] border-neutral-900 bg-white/50 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white transition-all"
                                >
                                    <MoveRight className="w-8 h-8 rotate-180" strokeWidth={1.5} />
                                </button>
                                <button
                                    onClick={nextHighlight}
                                    className="w-[72px] h-[72px] rounded-full border-[2.25px] border-neutral-900 bg-white/50 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white transition-all"
                                >
                                    <MoveRight className="w-8 h-8" strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Process Section - Horizontal Layout */}
                <section className="w-full max-w-[1200px] flex items-center justify-center">
                    <div className="w-full flex flex-col desktop:flex-row desktop:items-end gap-12 desktop:gap-[45px]">
                        <h2 className="text-black text-3xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight mb-0 desktop:mb-8 whitespace-nowrap text-center desktop:text-left">
                            租借流程
                        </h2>

                        <div className="w-full flex flex-col desktop:flex-row items-center desktop:items-start justify-between relative gap-12 desktop:gap-0">
                            {RENTAL_DATA?.process?.map((step, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col gap-[18px] w-full desktop:w-[280px] relative z-10 items-center desktop:items-start text-center desktop:text-left">
                                        <div className="flex items-center gap-[15px]">
                                            {/* Custom Icons for Steps */}
                                            <div className="w-[54px] h-[54px] flex-shrink-0">
                                                {index === 0 && (
                                                    <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M58.5 4.5C60.8869 4.5 63.1761 5.44821 64.864 7.13604C66.5518 8.82387 67.5 11.1131 67.5 13.5V41.625C67.5 42.5201 67.1444 43.3785 66.5115 44.0115C65.8785 44.6444 65.0201 45 64.125 45C63.2299 45 62.3715 44.6444 61.7385 44.0115C61.1056 43.3785 60.75 42.5201 60.75 41.625V13.5C60.75 12.9033 60.5129 12.331 60.091 11.909C59.669 11.4871 59.0967 11.25 58.5 11.25H13.5C12.9033 11.25 12.331 11.4871 11.909 11.909C11.4871 12.331 11.25 12.9033 11.25 13.5V58.5C11.25 59.0967 11.4871 59.669 11.909 60.091C12.331 60.5129 12.9033 60.75 13.5 60.75H37.125C38.0201 60.75 38.8785 61.1056 39.5115 61.7385C40.1444 62.3715 40.5 63.2299 40.5 64.125C40.5 65.0201 40.1444 65.8785 39.5115 66.5115C38.8785 67.1444 38.0201 67.5 37.125 67.5H13.5C11.1131 67.5 8.82387 66.5518 7.13604 64.864C5.44821 63.1761 4.5 60.8869 4.5 58.5V13.5C4.5 11.1131 5.44821 8.82387 7.13604 7.13604C8.82387 5.44821 11.1131 4.5 13.5 4.5H58.5ZM63.99 50.49C64.299 50.1584 64.6716 49.8924 65.0856 49.708C65.4996 49.5235 65.9465 49.4243 66.3997 49.4163C66.8528 49.4083 67.3029 49.4917 67.7232 49.6614C68.1434 49.8312 68.5252 50.0838 68.8457 50.4043C69.1662 50.7248 69.4188 51.1066 69.5886 51.5268C69.7583 51.9471 69.8417 52.3972 69.8337 52.8503C69.8257 53.3035 69.7265 53.7504 69.542 54.1644C69.3576 54.5784 69.0916 54.951 68.76 55.26L57.51 66.51C56.9586 67.0615 56.2332 67.405 55.4571 67.4821C54.681 67.5592 53.9022 67.3652 53.253 66.933L52.74 66.51L48.24 62.01L48.006 61.758C47.47 61.1107 47.1948 60.2868 47.2342 59.4473C47.2736 58.6078 47.6247 57.8132 48.219 57.219C48.8132 56.6247 49.6078 56.2736 50.4473 56.2342C51.2868 56.1948 52.1107 56.47 52.758 57.006L53.01 57.24L55.125 59.355L63.99 50.49ZM37.4715 47.268C38.3019 47.3541 39.0709 47.7449 39.6299 48.3649C40.189 48.985 40.4984 49.7902 40.4984 50.625C40.4984 51.4598 40.189 52.265 39.6299 52.8851C39.0709 53.5051 38.3019 53.8959 37.4715 53.982L37.125 54H21.375C20.4799 54 19.6214 53.6444 18.9885 53.0115C18.3556 52.3785 18 51.5201 18 50.625C18 49.7299 18.3556 48.8715 18.9885 48.2385C19.6214 47.6056 20.4799 47.25 21.375 47.25H37.125L37.4715 47.268ZM50.625 32.625C51.5201 32.625 52.3785 32.9806 53.0115 33.6135C53.6444 34.2464 54 35.1049 54 36C54 36.8951 53.6444 37.7535 53.0115 38.3865C52.3785 39.0194 51.5201 39.375 50.625 39.375H21.375C20.4799 39.375 19.6214 39.0194 18.9885 38.3865C18.3556 37.7535 18 36.8951 18 36C18 35.1049 18.3556 34.2464 18.9885 33.6135C19.6214 32.9806 20.4799 32.625 21.375 32.625H50.625ZM50.625 18C51.5201 18 52.3785 18.3556 53.0115 18.9885C53.6444 19.6214 54 20.4799 54 21.375C54 22.2701 53.6444 23.1286 53.0115 23.7615C52.3785 24.3944 51.5201 24.75 50.625 24.75H21.375C20.4799 24.75 19.6214 24.3944 18.9885 23.7615C18.3556 23.1286 18 22.2701 18 21.375C18 20.4799 18.3556 19.6214 18.9885 18.9885C19.6214 18.3556 20.4799 18 21.375 18H50.625Z" fill="#181818" />
                                                    </svg>
                                                )}
                                                {index === 1 && (
                                                    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M42 12C42 6.342 42 3.516 40.242 1.758C38.484 -1.78814e-07 35.658 0 30 0C24.342 0 21.516 -1.78814e-07 19.758 1.758C18 3.516 18 6.342 18 12M0 36C0 24.687 -3.57628e-07 19.029 3.516 15.516C7.032 12.003 12.687 12 24 12H36C47.313 12 52.971 12 56.484 15.516C59.997 19.032 60 24.687 60 36C60 47.313 60 52.971 56.484 56.484C52.968 59.997 47.313 60 36 60H24C12.687 60 7.029 60 3.516 56.484C0.00299978 52.968 0 47.313 0 36Z" stroke="#181818" strokeWidth="4" />
                                                        <path d="M30 45.999C33.315 45.999 36 43.761 36 41.001C36 38.241 33.315 36 30 36C26.685 36 24 33.762 24 30.999C24 28.239 26.685 26.001 30 26.001M30 45.999C26.685 45.999 24 43.761 24 41.001M30 45.999V48M30 26.001V24M30 26.001C33.315 26.001 36 28.239 36 30.999" stroke="#181818" strokeWidth="4" strokeLinecap="round" />
                                                    </svg>
                                                )}
                                                {index === 2 && (
                                                    <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M36 63C39.5457 63 43.0567 62.3016 46.3325 60.9447C49.6082 59.5879 52.5847 57.5991 55.0919 55.0919C57.5991 52.5847 59.5879 49.6082 60.9447 46.3325C62.3016 43.0567 63 39.5457 63 36C63 32.4543 62.3016 28.9433 60.9447 25.6675C59.5879 22.3918 57.5991 19.4153 55.0919 16.9081C52.5847 14.4009 49.6082 12.4121 46.3325 11.0553C43.0567 9.69838 39.5457 9 36 9C28.8392 9 21.9716 11.8446 16.9081 16.9081C11.8446 21.9716 9 28.8392 9 36C9 43.1608 11.8446 50.0284 16.9081 55.0919C21.9716 60.1554 28.8392 63 36 63ZM35.304 46.92L50.304 28.92L45.696 25.08L32.796 40.557L26.121 33.879L21.879 38.121L30.879 47.121L33.201 49.443L35.304 46.92Z" fill="black" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-neutral-900 text-2xl desktop:text-[37.5px] font-semibold font-['Roboto_Slab'] leading-none">
                                                {step.step}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2 desktop:gap-[9px]">
                                            <h3 className="text-neutral-900 text-2xl desktop:text-[37.5px] font-bold font-['Noto_Sans_TC']">
                                                {step.title}
                                            </h3>
                                            <p className="text-neutral-900 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.4]">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Arrow except last */}
                                    {index < RENTAL_DATA.process.length - 1 && (
                                        <div className="hidden desktop:block pt-[10px]">
                                            <svg width="60" viewBox="0 0 130 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-8">
                                                <path d="M0 -2C-1.10457 -2 -2 -1.10457 -2 0C-2 1.10457 -1.10457 2 0 2V0V-2ZM131.414 1.41421C132.195 0.633165 132.195 -0.633165 131.414 -1.41421L118.686 -14.1421C117.905 -14.9232 116.639 -14.9232 115.858 -14.1421C115.077 -13.3611 115.077 -12.0948 115.858 -11.3137L127.172 0L115.858 11.3137C115.077 12.0948 115.077 13.3611 115.858 14.1421C116.639 14.9232 117.905 14.9232 118.686 14.1421L131.414 1.41421ZM0 0V2H130V0V-2H0V0Z" fill="#181818" transform="scale(0.6) translate(0, 10)" />
                                            </svg>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Plans */}
                <section className="w-full max-w-[1200px] flex flex-col items-center gap-[18px]">
                    <div className="text-center mb-[18px]">
                        <h2 className="text-black text-3xl desktop:text-[45px] font-bold font-['Noto_Sans_TC']">
                            價目＆條件
                        </h2>
                        <p className="text-black text-base desktop:text-[18px] font-medium opacity-80 mt-2">
                            提供的詳細條件並整理成兩個「方案」
                        </p>
                    </div>

                    <div className="w-full flex flex-col desktop:flex-row gap-6 desktop:gap-[18px]">
                        {RENTAL_DATA?.plans?.map((plan, index) => (
                            <div key={index} className="flex-1 bg-transparent border-[2.25px] border-black rounded-[21px] p-8 desktop:p-[39px] flex flex-col justify-between min-h-[auto] desktop:min-h-[450px]">
                                <div className="flex flex-col gap-[9px]">
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC']">
                                        {plan.name}
                                    </h3>
                                    <h4 className="text-black text-[26px] font-bold font-['Noto_Sans_TC']">
                                        {plan.sub}
                                    </h4>
                                </div>
                                <div className="flex flex-col gap-[6px] mt-6 desktop:mt-0">
                                    {plan?.items?.map((item, i) => (
                                        <p key={i} className="text-black text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.5]">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="w-full max-w-[1200px] flex flex-col gap-[18px]">
                    <div className="w-full flex flex-col desktop:flex-row desktop:h-[345px] gap-6 desktop:gap-[18px]">
                        {/* Left Contact Card */}
                        <div className="w-full desktop:w-[301px] bg-white rounded-[27px] p-[30px] flex flex-col justify-between shrink-0 h-auto desktop:h-full gap-8 desktop:gap-0">
                            <div>
                                <h3 className="text-black text-[18px] font-serif font-medium leading-[1.45]">Contact us</h3>
                                <h2 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] mt-[6px] leading-[1.4]">聯絡方式</h2>
                            </div>
                            <p className="text-black text-[18px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">
                                {RENTAL_DATA?.contact?.desc}
                            </p>
                        </div>

                        {/* Right Social Card - Single Large Card */}
                        <div className="w-full desktop:flex-1 bg-white rounded-[27px] relative h-auto desktop:h-full flex flex-col justify-end">
                            {/* Social Links Container - Positioned at bottom */}
                            <div className="relative desktop:absolute inset-auto desktop:bottom-[45px] desktop:left-0 w-full px-8 pb-8 desktop:px-[60px] desktop:pb-0 flex flex-col desktop:flex-row desktop:justify-between items-start desktop:items-end gap-8 desktop:gap-0 pt-8 desktop:pt-0">
                                {/* Facebook */}
                                <a href="https://www.facebook.com/RumahPapanPandamaran/" target="_blank" rel="noreferrer" className="flex flex-col gap-[6px] group cursor-pointer hover:opacity-70 transition-opacity">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-black text-[18px] font-medium font-serif leading-[1.45]">Facebook</span>
                                        <ArrowUpRight className="w-[18px] h-[18px] text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">聯繫班厝</h3>
                                </a>

                                {/* Instagram */}
                                <a href="https://www.instagram.com/rumah.papan/" target="_blank" rel="noreferrer" className="flex flex-col gap-[6px] group cursor-pointer hover:opacity-70 transition-opacity">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-black text-[18px] font-medium font-serif leading-[1.45]">Instagram</span>
                                        <ArrowUpRight className="w-[18px] h-[18px] text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">預約勘場</h3>
                                </a>

                                {/* WhatsApp */}
                                <a href="#" className="flex flex-col gap-[6px] group cursor-pointer hover:opacity-70 transition-opacity">
                                    <div className="flex items-center gap-[4px]">
                                        <span className="text-black text-[18px] font-medium font-serif leading-[1.45]">WhatsApp</span>
                                        <ArrowUpRight className="w-[18px] h-[18px] text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-black text-[37.5px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">詢問檔期</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </main>
        </div>
    );
};
