<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ABOUT_HERO_DATA } from '../data/aboutData';
import { client, urlFor } from '../utils/sanity';
=======

import React from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAboutHeroData } from '../data/aboutData';
import { useLanguage } from '../contexts/LanguageContext';
>>>>>>> main

export const About: React.FC = () => {
    const { language } = useLanguage();
    const ABOUT_HERO_DATA = getAboutHeroData(language);

    // Scaling Rules (1920 -> 1440, factor 0.75)

    const [heroData, setHeroData] = useState(ABOUT_HERO_DATA);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const data = await client.fetch(`*[_type == "about"][0]`);
                if (data) {
                    setHeroData({
                        story: {
                            ...data.heroStory,
                            image: data.heroStory?.image ? urlFor(data.heroStory.image).url() : ABOUT_HERO_DATA.story.image
                        },
                        cards: data.heroCards?.map((card: any, idx: number) => ({
                            ...card,
                            image: card.image ? urlFor(card.image).url() : ABOUT_HERO_DATA.cards[idx].image
                        })) || ABOUT_HERO_DATA.cards
                    });
                }
            } catch (error) {
                console.error("Failed to fetch about data", error);
            }
        };
        fetchAboutData();
    }, []);

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white">
            <HomeNavbar />

<<<<<<< HEAD
            <main className="w-full max-w-[1440px] mx-auto px-[90px] pt-[165px] flex justify-center items-start gap-[18px] pb-[120px]">
                {/* Left Column - Main Story Card */}
                <Link
                    to={heroData.story.path}
                    className="relative w-[621px] h-[561px] bg-neutral-200 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all"
=======
            <main className="w-full max-w-[1440px] mx-auto px-6 pt-32 desktop:px-[90px] desktop:pt-[165px] flex flex-col desktop:flex-row justify-center items-center desktop:items-start gap-8 desktop:gap-[18px] pb-20 desktop:pb-0">
                {/* Left Column - Main Story Card */}
                <Link
                    to={ABOUT_HERO_DATA.story.path}
                    className="relative w-full max-w-[621px] min-h-[400px] desktop:min-h-0 desktop:h-[561px] bg-orange-100 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all flex flex-col p-8 desktop:p-0"
>>>>>>> main
                >
                    {/* Background Image */}
                    {heroData.story.image && (
                        <div className="absolute inset-0 z-0">
                            <img
                                src={heroData.story.image}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt={heroData.story.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                        </div>
                    )}

                    {/* Content */}
<<<<<<< HEAD
                    <div className="absolute left-[58.5px] top-[60px] flex flex-col items-start z-10">
                        <h2 className="text-white text-[45px] font-bold font-['Noto_Sans_TC'] leading-[63px] drop-shadow-lg">
                            {heroData.story.title}
                        </h2>
                        <p className="text-white/90 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px] drop-shadow-md">
                            {heroData.story.subtitle}
=======
                    <div className="relative desktop:absolute desktop:left-[58.5px] desktop:top-[60px] flex flex-col items-start z-10">
                        <h2 className="text-black/80 text-3xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[63px]">
                            {ABOUT_HERO_DATA.story.title}
                        </h2>
                        <p className="text-black/80 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-normal desktop:leading-[24px] mt-4 desktop:mt-0">
                            {ABOUT_HERO_DATA.story.subtitle}
>>>>>>> main
                        </p>
                    </div>

                    {/* Tag */}
<<<<<<< HEAD
                    <div className="absolute right-[60px] bottom-[60px] text-right text-white text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line z-10 drop-shadow-md">
                        {heroData.story.tag}
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute right-[45px] top-[70px] w-[48px] h-[48px] flex items-center justify-center z-10">
                        <div className="w-[36px] h-[36px] rounded-full outline outline-[1.8px] outline-white flex items-center justify-center bg-white/20 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
=======
                    <div className="relative desktop:absolute desktop:right-[60px] desktop:bottom-[60px] text-left desktop:text-right text-neutral-900 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line mt-auto pt-8 desktop:pt-0 desktop:mt-0 z-10">
                        {ABOUT_HERO_DATA.story.tag}
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute right-6 top-6 desktop:right-[45px] desktop:top-[70px] w-[48px] h-[48px] flex items-center justify-center z-20">
                        <div className="w-[36px] h-[36px] rounded-full outline outline-[1.8px] outline-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
>>>>>>> main
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </Link>

                {/* Right Column - 3 Stacked Cards */}
<<<<<<< HEAD
                <div className="flex flex-col gap-[15px]">
                    {heroData.cards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.path}
                            className="relative w-[621px] h-[180px] bg-neutral-200 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all"
=======
                <div className="flex flex-col gap-4 desktop:gap-[15px] w-full max-w-[621px]">
                    {ABOUT_HERO_DATA.cards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.path}
                            className="relative w-full desktop:w-[621px] min-h-[160px] desktop:min-h-0 desktop:h-[180px] bg-orange-100 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all flex flex-col p-6 desktop:p-0"
>>>>>>> main
                        >
                            {/* Background Image */}
                            {card.image && (
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={card.image}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                        alt={card.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                                </div>
                            )}

                            {/* Content */}
<<<<<<< HEAD
                            <div className="absolute left-[48px] top-[43.5px] flex flex-col items-start z-10">
                                <h3 className="text-white text-[45px] font-bold font-['Noto_Sans_TC'] leading-[63px] drop-shadow-lg">
                                    {card.title}
                                </h3>
                                <p className="text-white/90 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px] drop-shadow-md">
=======
                            <div className="relative desktop:absolute desktop:left-[48px] desktop:top-[43.5px] flex flex-col items-start z-10">
                                <h3 className="text-black/80 text-2xl desktop:text-[45px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[63px]">
                                    {card.title}
                                </h3>
                                <p className="text-black/80 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-normal desktop:leading-[24px] mt-2 desktop:mt-0">
>>>>>>> main
                                    {card.subtitle}
                                </p>
                            </div>

                            {/* Tag */}
<<<<<<< HEAD
                            <div className="absolute right-[60px] bottom-[30px] text-right text-white text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line z-10 drop-shadow-md">
=======
                            <div className="relative desktop:absolute desktop:right-[60px] desktop:bottom-[30px] text-left desktop:text-right text-neutral-900 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line mt-auto pt-4 desktop:pt-0 desktop:mt-0 z-10">
>>>>>>> main
                                about {'\n'}RUMAH PAPAN
                            </div>

                            {/* Arrow Icon */}
<<<<<<< HEAD
                            <div className="absolute right-[45px] top-[36px] w-[48px] h-[48px] flex items-center justify-center z-10">
                                <div className="w-[36px] h-[36px] rounded-full outline outline-[1.8px] outline-white flex items-center justify-center bg-white/20 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
=======
                            <div className="absolute right-4 top-4 desktop:right-[45px] desktop:top-[36px] w-[48px] h-[48px] flex items-center justify-center z-20">
                                <div className="w-[36px] h-[36px] rounded-full outline outline-[1.8px] outline-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
>>>>>>> main
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};
