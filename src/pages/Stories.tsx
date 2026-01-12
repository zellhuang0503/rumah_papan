import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search } from 'lucide-react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { StoryFilter } from '../components/story/StoryFilter';
import { StoryCard } from '../components/story/StoryCard';
import { stories, type StoryCategory } from '../data/storyData';

gsap.registerPlugin(ScrollTrigger);

export const Stories: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<StoryCategory>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredStories = stories.filter(story => {
        const matchesCategory = activeCategory === 'all' || story.category === activeCategory;
        const matchesSearch = searchQuery === '' ||
            story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Header Animation
            gsap.fromTo(".anim-header",
                { autoAlpha: 0, y: 50 },
                { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }
            );

            // Filter Animation
            gsap.fromTo(".anim-filter",
                { autoAlpha: 0, y: 30 },
                { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
            );

            // Stories Stagger Animation
            const cards = document.querySelectorAll(".story-card-item");
            if (cards.length > 0) {
                gsap.fromTo(cards,
                    { autoAlpha: 0, y: 50 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        delay: 0.5,
                        ease: "power3.out"
                    }
                );
            }

            ScrollTrigger.refresh();

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Refresh layout when filtering changes
    useLayoutEffect(() => {
        ScrollTrigger.refresh();
    }, [activeCategory, searchQuery]);

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white">
            <HomeNavbar />

            <main className="w-full flex flex-col items-center pt-[165px] pb-[120px]">

                {/* Header Section */}
                <div className="w-full max-w-[1260px] px-[90px] mb-[24px] flex flex-col items-center gap-10 anim-header opacity-0">
                    <h1 className="text-[54px] font-bold text-[#242527] font-noto-sans-tc leading-[75px]">
                        故事誌
                    </h1>

                    {/* Search Input (Previously Intro Badge) */}
                    <div className="inline-flex justify-start items-center">
                        <div className="w-[537px] px-[18px] py-[9px] bg-neutral-800/10 rounded-full outline outline-1 outline-offset-[-1px] outline-zinc-500 flex justify-start items-center gap-3 transition-colors focus-within:bg-neutral-800/20 focus-within:outline-neutral-800">
                            <Search className="w-5 h-5 text-zinc-800 opacity-50" strokeWidth={3} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="技能換宿"
                                className="flex-1 bg-transparent border-none outline-none text-zinc-800 text-[18px] font-medium font-noto-sans-tc leading-[24px] placeholder:text-zinc-800/50 text-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="mb-[60px] anim-filter opacity-0">
                    <StoryFilter
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                </div>

                {/* Stories Grid */}
                {/* 
                   Figma Width: 1680px -> Scaled: 1260px
                   Gap: 24px -> Scaled: 18px
                   We specificly use a container that fits these cards.
                */}
                {/* 
                   Bento Grid Layout System
                   Total Width: 1260px (at 0.75x scale)
                   Gap: 24px
                   
                   Valid Row Combinations to fill 1260px:
                   1. Full Width Banner/Standard: 1260px
                   2. Standard (940px) + Compact (288px) + Gap (24px) = 1252px (~1260)
                   3. Highlight (514px) + Overlay (408px) + Compact (288px) + 2 Gaps (48px) = 1258px (~1260)
                   
                   * Note: Partial rows will align left due to flex-wrap + gap.
                */}
                <div className="w-full max-w-[1260px] flex flex-wrap gap-[24px]">
                    {filteredStories.map((story) => (
                        <div key={story.id} className="story-card-item">
                            <StoryCard item={story} />
                        </div>
                    ))}
                </div>

            </main>

            <SiteFooter />
        </div>
    );
};
