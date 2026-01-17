<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Polaroid } from '../components/Polaroid';
import { mockStories } from '../data/mockStories';
import { client, urlFor } from '../utils/sanity';

export const Stories: React.FC = () => {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await client.fetch(`*[_type == "story"] | order(publishedAt desc)`);
                if (data && data.length > 0) {
                    setStories(data);
                } else {
                    // Fallback to mock data if Sanity is empty
                    setStories(mockStories.map(s => ({
                        ...s,
                        titleText: s.title.zh,
                        imageUrl: s.cover_image
                    })));
                }
            } catch (error) {
                console.error('Error fetching stories from Sanity:', error);
                setStories(mockStories.map(s => ({
                    ...s,
                    titleText: s.title.zh,
                    imageUrl: s.cover_image
                })));
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

=======

import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search } from 'lucide-react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { StoryFilter } from '../components/story/StoryFilter';
import { StoryCard } from '../components/story/StoryCard';
import { getStories, type StoryCategory } from '../data/storyData';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const Stories: React.FC = () => {
    const { language } = useLanguage();
    const stories = getStories(language);

    const [activeCategory, setActiveCategory] = useState<StoryCategory>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredStories = stories.filter(story => {
        const matchesCategory = activeCategory === 'all' || story.category === activeCategory;
        const matchesSearch = searchQuery === '' ||
            story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (story.tags && story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

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
    }, [activeCategory, searchQuery, language]); // Added language to dependency

    // Translations
    const labels = {
        title: language === 'zh' ? '故事誌' : 'Story Log',
        search: language === 'zh' ? '技能換宿' : 'Work Swap / Search'
    };

>>>>>>> main
    return (
        <div ref={containerRef} className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full flex flex-col items-center pt-[165px] pb-[120px]">

                {/* Header Section */}
                <div className="w-full max-w-[1260px] px-[90px] mb-[24px] flex flex-col items-center gap-10 anim-header opacity-0">
                    <h1 className="text-[54px] font-bold text-[#242527] font-noto-sans-tc leading-[75px]">
                        {labels.title}
                    </h1>

                    {/* Search Input (Previously Intro Badge) */}
                    <div className="inline-flex justify-start items-center">
                        <div className="w-[537px] px-[18px] py-[9px] bg-neutral-800/10 rounded-full outline outline-1 outline-offset-[-1px] outline-zinc-500 flex justify-start items-center gap-3 transition-colors focus-within:bg-neutral-800/20 focus-within:outline-neutral-800">
                            <Search className="w-5 h-5 text-zinc-800 opacity-50" strokeWidth={3} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={labels.search}
                                className="flex-1 bg-transparent border-none outline-none text-zinc-800 text-[18px] font-medium font-noto-sans-tc leading-[24px] placeholder:text-zinc-800/50 text-center"
                            />
                        </div>
                    </div>
                </div>

<<<<<<< HEAD
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
                        {stories.map((story, index) => (
                            <div key={story._id || index} className="flex justify-center">
                                <Polaroid
                                    src={story.coverImage ? urlFor(story.coverImage).url() : story.imageUrl}
                                    caption={story.titleText || story.title}
                                    className={`transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-all duration-300 w-full max-w-[320px]`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
=======
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
                <div className="w-full px-6 desktop:px-0 desktop:max-w-[1260px] flex flex-wrap gap-6 desktop:gap-[24px]">
                    {filteredStories.map((story) => (
                        <div key={story.id} className="story-card-item w-full desktop:w-auto">
                            <StoryCard item={story} />
                        </div>
                    ))}
                </div>

            </main>

            <SiteFooter />
        </div>
>>>>>>> main
    );
};
