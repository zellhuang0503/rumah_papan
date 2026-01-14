import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getIntroSlides } from '../../data/homeData';
import { useLanguage } from '../../contexts/LanguageContext';

export const IntroSection: React.FC = () => {
    const { language } = useLanguage();
    const slides = getIntroSlides(language);

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section id="intro-carousel" className="w-full flex flex-col items-center bg-orange-100 gap-[24px]">
            {/* Carousel Container */}
            <div className="relative w-full max-w-none desktop:max-w-[1260px] h-[500px] desktop:h-[600px] bg-white rounded-none desktop:rounded-[18px] overflow-hidden group">
                {/* Slides */}
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        {/* Background Placeholder */}
                        <div className="w-full h-full bg-gradient-to-b from-black/20 to-black/80 flex flex-col justify-end p-[54px] pb-[80px]">
                            {/* Title Position */}
                            <div className="absolute left-6 bottom-40 desktop:bottom-auto desktop:left-[54px] desktop:top-[421.5px]">
                                <h3 className="text-white text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[52.5px] drop-shadow-md">
                                    {slide.title}
                                </h3>
                            </div>
                            {/* Desc Position */}
                            <div className="absolute left-6 bottom-20 desktop:bottom-auto desktop:left-[54px] desktop:top-[482.25px] w-[calc(100%-48px)] desktop:w-[900px]">
                                <p className="text-white text-lg desktop:text-[27px] font-bold font-['Noto_Sans_TC'] leading-relaxed desktop:leading-[43px] drop-shadow-md">
                                    {slide.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Dots */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-6 desktop:bottom-auto desktop:left-[528.75px] desktop:top-[544.5px] flex gap-[12px] z-20">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-[12px] h-[12px] desktop:w-[18px] desktop:h-[18px] rounded-full border border-neutral-900 flex items-center justify-center transition-all bg-white/30 ${idx === currentSlide ? 'scale-110' : ''}`}
                        >
                            {idx === currentSlide && <div className="w-[8px] h-[8px] desktop:w-[12px] desktop:h-[12px] bg-neutral-800 rounded-full" />}
                        </button>
                    ))}
                </div>

                {/* Arrow Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 desktop:left-[24px] top-1/2 -translate-y-1/2 w-12 h-12 desktop:w-[72px] desktop:h-[72px] bg-white/50 rounded-full flex items-center justify-center opacity-100 desktop:opacity-0 desktop:group-hover:opacity-100 transition-all hover:bg-white z-20"
                >
                    <ArrowLeft className="w-6 h-6 desktop:w-8 desktop:h-8 text-neutral-900" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 desktop:right-[24px] top-1/2 -translate-y-1/2 w-12 h-12 desktop:w-[72px] desktop:h-[72px] bg-white/50 rounded-full flex items-center justify-center opacity-100 desktop:opacity-0 desktop:group-hover:opacity-100 transition-all hover:bg-white z-20"
                >
                    <ArrowRight className="w-6 h-6 desktop:w-8 desktop:h-8 text-neutral-900" />
                </button>
            </div>
        </section>
    );
};
