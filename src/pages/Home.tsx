import React, { useState, useEffect } from 'react';
import { client } from '../utils/sanity';
import { HomeNavbar } from '../components/HomeNavbar';
import { HeroSection } from '../components/home/HeroSection';
import { IntroSection } from '../components/home/IntroSection';
import { FeatureCards } from '../components/home/FeatureCards';
import { PhilosophySection } from '../components/home/PhilosophySection';
import { Testimonials } from '../components/home/Testimonials';
import { NewsSection } from '../components/home/NewsSection';
import { SiteFooter } from '../components/SiteFooter';
import { WebsiteGuideModal } from '../components/WebsiteGuideModal';
import { Info } from 'lucide-react';

export const Home: React.FC = () => {
    const [isGuideOpen, setIsGuideOpen] = React.useState<boolean>(false);
    const [homeData, setHomeData] = useState<any>(null);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const data = await client.fetch(`* [_type == "home"][0]`);
                setHomeData(data);
            } catch (error) {
                console.error("Failed to fetch home data", error);
            }
        };
        fetchHomeData();
    }, []);

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white">
            <HomeNavbar />

            <main className="w-full relative flex flex-col gap-[120px]">
                <HeroSection bubbles={homeData?.heroBubbles} />
                <div className="flex flex-col gap-[40px]">
                    <IntroSection />
                    <FeatureCards />
                </div>
                <PhilosophySection />
                <Testimonials />
                <NewsSection />
                <SiteFooter />
            </main>

            {/* Bottom Right Info Button - Keeping existing functionality */}
            <button
                className="fixed bottom-10 right-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer z-50"
                onClick={() => setIsGuideOpen(true)}
            >
                <Info className="w-8 h-8 text-[#181818]" />
            </button>

            <WebsiteGuideModal
                isOpen={isGuideOpen}
                onClose={() => setIsGuideOpen(false)}
            />
        </div>
    );
};
