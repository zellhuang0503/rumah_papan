import React, { useState, useEffect } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ABOUT_HERO_DATA } from '../data/aboutData';
import { client, urlFor } from '../utils/sanity';

export const About: React.FC = () => {
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

            <main className="w-full max-w-[1440px] mx-auto px-[90px] pt-[165px] flex justify-center items-start gap-[18px] pb-[120px]">
                {/* Left Column - Main Story Card */}
                <Link
                    to={heroData.story.path}
                    className="relative w-[621px] h-[561px] bg-neutral-200 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all"
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
                    <div className="absolute left-[58.5px] top-[60px] flex flex-col items-start z-10">
                        <h2 className="text-white text-[45px] font-bold font-['Noto_Sans_TC'] leading-[63px] drop-shadow-lg">
                            {heroData.story.title}
                        </h2>
                        <p className="text-white/90 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px] drop-shadow-md">
                            {heroData.story.subtitle}
                        </p>
                    </div>

                    {/* Tag */}
                    <div className="absolute right-[60px] bottom-[60px] text-right text-white text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line z-10 drop-shadow-md">
                        {heroData.story.tag}
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute right-[45px] top-[70px] w-[48px] h-[48px] flex items-center justify-center z-10">
                        <div className="w-[36px] h-[36px] rounded-full outline outline-[1.8px] outline-white flex items-center justify-center bg-white/20 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </Link>

                {/* Right Column - 3 Stacked Cards */}
                <div className="flex flex-col gap-[15px]">
                    {heroData.cards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.path}
                            className="relative w-[621px] h-[180px] bg-neutral-200 rounded-[18px] outline outline-[1.5px] outline-neutral-900 overflow-hidden group hover:shadow-lg transition-all"
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
                            <div className="absolute left-[48px] top-[43.5px] flex flex-col items-start z-10">
                                <h3 className="text-white text-[45px] font-bold font-['Noto_Sans_TC'] leading-[63px] drop-shadow-lg">
                                    {card.title}
                                </h3>
                                <p className="text-white/90 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px] drop-shadow-md">
                                    {card.subtitle}
                                </p>
                            </div>

                            {/* Tag */}
                            <div className="absolute right-[60px] bottom-[30px] text-right text-white text-[15px] font-normal font-['Roboto_Slab'] leading-[21px] whitespace-pre-line z-10 drop-shadow-md">
                                about {'\n'}RUMAH PAPAN
                            </div>

                            {/* Arrow Icon */}
                            <div className="absolute right-[45px] top-[36px] w-[48px] h-[48px] flex items-center justify-center z-10">
                                <div className="w-[36px] h-[36px] rounded-full outline outline-[1.8px] outline-white flex items-center justify-center bg-white/20 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
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
