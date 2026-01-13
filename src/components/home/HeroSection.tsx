import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { BubbleLink } from '../BubbleLink';
import { getHeroContentMap } from '../../data/homeData';
import { useLanguage } from '../../contexts/LanguageContext';

export const HeroSection: React.FC = () => {
    const { language } = useLanguage();
    const contentMap = getHeroContentMap(language);

    // State tracks KEY
    const [activeKey, setActiveKey] = useState<string>('about');
    const activeContent = contentMap[activeKey as keyof typeof contentMap];

    const handleBubbleClick = (key: string) => {
        setActiveKey(key);
    };

    // Restored Layout Values from Step 152
    // Container: px-[120px], pt-24 pb-12
    // Left: max-w-[600px]
    // Right: w-[720px], gap-x-[16px], gap-y-[40px]
    // Fonts: text-5xl, text-xl

    return (
        <section className="relative w-full min-h-[634px] bg-orange-100 pt-[208px] pb-24 flex justify-center">
            {/* Centered Container Max Width 1440px */}
            <div className="w-full max-w-[1440px] px-[120px] flex items-center justify-between">
                {/* LEFT CONTENT */}
                <div className="flex flex-col items-start max-w-[600px] z-20 transition-all duration-300 gap-6">
                    {/* Removed min-h-[220px] so button follows text */}
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-[#242527] font-bold text-5xl leading-tight tracking-tight mb-2 min-h-[1.2em]">
                            {activeContent.title}
                        </h1>
                        <p className="text-[#364153] text-xl font-medium leading-relaxed min-h-[3em]">
                            {activeContent.body}
                        </p>
                    </div>

                    {/* CTA - Gap changed to 16px (gap-4) */}
                    <div className="flex flex-col items-center gap-4 cursor-pointer group">
                        <div className="w-16 h-16 rounded-full border-2 border-[#181818] flex items-center justify-center group-hover:bg-[#181818] group-hover:text-white transition-all">
                            <ArrowDown className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-bold text-[#181818]">
                            往下看更多
                        </span>
                    </div>
                </div>

                {/* RIGHT CONTENT - BUBBLE CLUSTER */}
                <div className="flex flex-wrap content-center justify-center gap-x-[16px] gap-y-[40px] w-[720px] z-10 pt-10">
                    <BubbleLink
                        text="關於班厝"
                        onClick={() => handleBubbleClick('about')}
                        isActive={activeKey === 'about'}
                    />
                    <BubbleLink
                        text="來碗班達馬蘭肉骨茶"
                        onClick={() => handleBubbleClick('bkt')}
                        isActive={activeKey === 'bkt'}
                    />
                    <BubbleLink
                        text="想不想用走的認識新村？"
                        onClick={() => handleBubbleClick('walk')}
                        variant="large"
                        isActive={activeKey === 'walk'}
                    />
                    <BubbleLink
                        text="永續生活"
                        onClick={() => handleBubbleClick('sustainability')}
                        isActive={activeKey === 'sustainability'}
                    />
                    <BubbleLink
                        text="下個來交換故事的人會是你嗎？"
                        onClick={() => handleBubbleClick('exchange')}
                        variant="large"
                        isActive={activeKey === 'exchange'}
                    />
                    <BubbleLink
                        text="一起過節好嗎？"
                        onClick={() => handleBubbleClick('festivals')}
                        variant="large"
                        isActive={activeKey === 'festivals'}
                    />
                    <BubbleLink
                        text="技能換宿"
                        onClick={() => handleBubbleClick('stay')}
                        isActive={activeKey === 'stay'}
                    />
                </div>
            </div>
        </section>
    );
};
