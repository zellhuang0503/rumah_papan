import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { INTRO_SLIDES } from '../../data/homeData';

export const IntroSection: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % INTRO_SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + INTRO_SLIDES.length) % INTRO_SLIDES.length);
    };

    return (
        <section className="w-full flex flex-col items-center bg-orange-100 gap-[24px]">
            {/* Carousel Container */}
            <div className="relative w-[1260px] h-[600px] bg-white rounded-[18px] overflow-hidden group">
                {/* Slides */}
                {INTRO_SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 bg-cover bg-center ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        {/* Background Placeholder */}
                        <div className="w-full h-full bg-gradient-to-b from-black/20 to-black/80 flex flex-col justify-end p-[54px] pb-[80px]">
                            <div className="absolute left-[54px] top-[421.5px]">
                                <h3 className="text-white text-[36px] font-bold font-['Noto_Sans_TC'] leading-[52.5px] drop-shadow-md">
                                    {slide.title}
                                </h3>
                            </div>
                            <div className="absolute left-[54px] top-[482.25px] w-[900px]">
                                <p className="text-white text-[27px] font-bold font-['Noto_Sans_TC'] leading-[43px] drop-shadow-md">
                                    {slide.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Dots */}
                <div className="absolute left-[528.75px] top-[544.5px] flex gap-[12px] z-20">
                    {INTRO_SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-[18px] h-[18px] rounded-full border border-neutral-900 flex items-center justify-center transition-all bg-white/30 ${idx === currentSlide ? 'scale-110' : ''}`}
                        >
                            {idx === currentSlide && <div className="w-[12px] h-[12px] bg-neutral-800 rounded-full" />}
                        </button>
                    ))}
                </div>

                {/* Arrow Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-[24px] top-1/2 -translate-y-1/2 w-[72px] h-[72px] bg-white/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                >
                    <ArrowLeft className="w-8 h-8 text-neutral-900" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-[24px] top-1/2 -translate-y-1/2 w-[72px] h-[72px] bg-white/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                >
                    <ArrowRight className="w-8 h-8 text-neutral-900" />
                </button>
            </div>
        </section>
    );
};
