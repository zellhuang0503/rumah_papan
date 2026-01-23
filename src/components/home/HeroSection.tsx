
import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { BubbleLink } from '../BubbleLink';
import { getHeroContentMap } from '../../data/homeData';
import { useLanguage } from '../../contexts/LanguageContext';

export const HeroSection: React.FC = () => {
    const { language } = useLanguage();
    const contentMap = getHeroContentMap(language);

    // Bubble Text Map
    const BUBBLE_TEXTS = {
        zh: {
            about: "關於班厝",
            bkt: "來碗班達馬蘭肉骨茶",
            walk: "想不想用走的認識新村？",
            sustainability: "永續生活",
            exchange: "下個來交換故事的人會是你嗎？",
            festivals: "一起過節好嗎？",
            stay: "技能換宿"
        },
        en: {
            about: "About Rumah Papan",
            bkt: "Have a bowl of BKT",
            walk: "Walk to know the village?",
            sustainability: "Sustainable Life",
            exchange: "Next story exchanger?",
            festivals: "Celebrate together?",
            stay: "Work Swap"
        }
    };

    const bubbles = BUBBLE_TEXTS[language as keyof typeof BUBBLE_TEXTS] || BUBBLE_TEXTS.zh;

    // State tracks KEY
    const [activeKey, setActiveKey] = useState<string>('about');
    const activeContent = contentMap[activeKey as keyof typeof contentMap];

    const handleBubbleClick = (key: string) => {
        setActiveKey(key);
    };

    const ctaText = language === 'zh' ? '往下看更多' : 'See More';

    // Restored Layout Values from Step 152
    // Container: px-[120px], pt-24 pb-12
    // Left: max-w-[600px]
    // Right: w-[720px], gap-x-[16px], gap-y-[40px]
    // Fonts: text-5xl, text-xl

    return (
        <section className="relative w-full min-h-[634px] bg-orange-100 pt-40 pb-12 desktop:pt-36 desktop:pb-24 flex justify-center transition-all duration-300">
            {/* Centered Container Max Width 1440px */}
            <div className="w-full max-w-[1440px] px-6 desktop:px-[120px] flex flex-col desktop:flex-row items-center justify-between gap-12 desktop:gap-0">
                {/* LEFT CONTENT */}
                <div className="flex flex-col items-center desktop:items-start w-full desktop:max-w-[600px] z-20 transition-all duration-300 gap-6 text-center desktop:text-left">
                    {/* Removed min-h-[220px] so button follows text */}
                    <div className="flex flex-col items-center desktop:items-start gap-2">
                        <h1 className="text-[#242527] font-bold text-3xl desktop:text-5xl leading-tight tracking-tight mb-2 min-h-[1.2em]">
                            {activeContent.title}
                        </h1>
                        <p className="text-[#364153] text-lg desktop:text-xl font-medium leading-relaxed min-h-[3em]">
                            {activeContent.body}
                        </p>
                    </div>

                    {/* CTA - Gap changed to 16px (gap-4) */}
                    <div
                        className="flex flex-col items-center gap-4 cursor-pointer group"
                        onClick={() => {
                            const introSection = document.getElementById('intro-carousel');
                            if (introSection) {
                                const yOffset = -100; // Offset for fixed navbar
                                const scrollY = window.scrollY || window.pageYOffset;
                                const targetY = introSection.getBoundingClientRect().top + scrollY + yOffset;
                                window.scrollTo({ top: targetY, behavior: 'smooth' });
                            }
                        }}
                    >
                        <div className="w-16 h-16 rounded-full border-2 border-[#181818] flex items-center justify-center group-hover:bg-[#181818] group-hover:text-white transition-all">
                            <ArrowDown className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-bold text-[#181818]">
                            {ctaText}
                        </span>
                    </div>
                </div>

                {/* RIGHT CONTENT - BUBBLE CLUSTER */}
                <div className="flex flex-wrap content-center justify-center gap-4 desktop:gap-x-[16px] desktop:gap-y-[40px] w-full desktop:w-[720px] z-10 pt-0 desktop:pt-10">
                    <BubbleLink
                        text={bubbles.about}
                        onClick={() => handleBubbleClick('about')}
                        isActive={activeKey === 'about'}
                    />
                    <BubbleLink
                        text={bubbles.bkt}
                        onClick={() => handleBubbleClick('bkt')}
                        isActive={activeKey === 'bkt'}
                    />
                    <BubbleLink
                        text={bubbles.walk}
                        onClick={() => handleBubbleClick('walk')}
                        variant="large"
                        isActive={activeKey === 'walk'}
                    />
                    <BubbleLink
                        text={bubbles.sustainability}
                        onClick={() => handleBubbleClick('sustainability')}
                        isActive={activeKey === 'sustainability'}
                    />
                    <BubbleLink
                        text={bubbles.exchange}
                        onClick={() => handleBubbleClick('exchange')}
                        variant="large"
                        isActive={activeKey === 'exchange'}
                    />
                    <BubbleLink
                        text={bubbles.festivals}
                        onClick={() => handleBubbleClick('festivals')}
                        variant="large"
                        isActive={activeKey === 'festivals'}
                    />
                    <BubbleLink
                        text={bubbles.stay}
                        onClick={() => handleBubbleClick('stay')}
                        isActive={activeKey === 'stay'}
                    />
                </div>
            </div>
        </section>
    );
};
