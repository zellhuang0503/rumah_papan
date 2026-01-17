import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search } from 'lucide-react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { StoryFilter } from '../components/story/StoryFilter';
import { StoryCard } from '../components/story/StoryCard';
import { getStories, type StoryCategory, type StoryItem } from '../data/storyData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';

gsap.registerPlugin(ScrollTrigger);

export const Stories: React.FC = () => {
    const { language } = useLanguage();

    // State for Data
    const [cmsStories, setCmsStories] = useState<StoryItem[]>([]);
    const [useCms, setUseCms] = useState(false);
    const [loading, setLoading] = useState(true);

    const [activeCategory, setActiveCategory] = useState<StoryCategory>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch CMS Data
    useEffect(() => {
        const fetchStories = async () => {
            try {
                // Fetch all stories
                const data = await client.fetch(`*[_type == "story"] | order(publishedAt desc)`);

                if (data && data.length > 0) {
                    const mappedStories: StoryItem[] = data.map((doc: any) => ({
                        id: doc._id,
                        category: doc.category || 'all',
                        // Handle Bi-lingual fields with fallbacks
                        title: (language === 'zh' ? doc.title_zh : doc.title_en) || doc.title || "Untitled",
                        description: (language === 'zh' ? doc.description_zh : doc.description_en) || doc.excerpt || "",
                        imageUrl: doc.coverImage ? urlFor(doc.coverImage).url() : undefined,
                        images: doc.extraImages ? doc.extraImages.map((img: any) => urlFor(img).url()) : [],
                        tags: doc.tags || [],
                        variant: doc.variant || 'standard',
                        size: doc.size || 'medium',
                        imageScale: doc.imageScale,
                        imagePosition: doc.imagePosition
                    }));
                    setCmsStories(mappedStories);
                    setUseCms(true);
                }
            } catch (error) {
                console.error("Failed to fetch stories from Sanity:", error);
                // Fallback to static data is handled by 'useCms' staying false
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, [language]); // Re-map when language changes

    // Determine Source (CMS or Static)
    const displayStories = useCms ? cmsStories : getStories(language);

    // Filter Logic
    const filteredStories = displayStories.filter(story => {
        const matchesCategory = activeCategory === 'all' || story.category === activeCategory;
        const matchesSearch = searchQuery === '' ||
            story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (story.tags && story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

        return matchesCategory && matchesSearch;
    });

    // Animations (GSAP)
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
    }, [filteredStories]); // Re-run anim when list changes

    // Refresh layout when filtering changes
    useLayoutEffect(() => {
        ScrollTrigger.refresh();
    }, [activeCategory, searchQuery, language, filteredStories]);

    // Translations
    const labels = {
        title: language === 'zh' ? '故事誌' : 'Story Log',
        search: language === 'zh' ? '搜尋故事...' : 'Search stories...'
    };

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full flex flex-col items-center pt-[165px] pb-[120px]">

                {/* Header Section */}
                <div className="w-full max-w-[1260px] px-[90px] mb-[24px] flex flex-col items-center gap-10 anim-header opacity-0">
                    <h1 className="text-[54px] font-bold text-[#242527] font-noto-sans-tc leading-[75px]">
                        {labels.title}
                    </h1>

                    {/* Search Input */}
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
                */}
                <div className="w-full px-6 desktop:px-0 desktop:max-w-[1260px] flex flex-wrap gap-6 desktop:gap-[24px]">
                    {loading && !useCms ? (
                        // Optional Loading State (or just show static initially)
                        // We display static immediately if useCms is false, so no flash of white.
                        // But if fetching takes time, useCms flips to true later.
                        // This is acceptable "Hydration".
                        null
                    ) : null}

                    {filteredStories.map((story) => (
                        <div key={story.id} className="story-card-item w-full desktop:w-auto">
                            <StoryCard item={story} />
                        </div>
                    ))}

                    {filteredStories.length === 0 && (
                        <div className="w-full text-center py-20 text-neutral-500 font-medium">
                            {language === 'zh' ? '沒有找到相關故事' : 'No stories found'}
                        </div>
                    )}
                </div>

            </main>

            <SiteFooter />
        </div>
    );
};
