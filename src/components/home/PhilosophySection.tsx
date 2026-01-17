import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export const PhilosophySection: React.FC = () => {
    const { language } = useLanguage();

    const title = language === 'zh'
        ? '生活 × 在地 × 新村'
        : 'Life × Local × New Village';

    const desc = language === 'zh'
        ? <>在班達馬蘭新村，我們用故事、風景與人情，<br />留住一個個正在發生的華人新村日常。</>
        : <>In Pandamaran New Village, we use stories, scenery, and human touch<br />to preserve the daily life of a Chinese New Village as it happens.</>;

    // Scaled dimensions
    // Text 7xl (72) -> 54px.
    // Text 2xl (24) -> 18px.
    // Width 540 -> 405px. (Expanded width slightly for EN or keep as is)

    // For EN, the text might be wider, so we remove max-w-[405px] restriction for EN or increase it?
    // Let's relax max-w for EN.
    const descMaxWidth = language === 'zh' ? 'max-w-[405px]' : 'max-w-[600px]';

    return (
        <section className="w-full flex flex-col items-center bg-orange-100 gap-[12px] px-6 desktop:px-0">
            <h2 className="text-neutral-900 text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[75.6px] text-center">
                {title}
            </h2>
            <div className={`w-full ${descMaxWidth} text-center text-neutral-900 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-relaxed desktop:leading-[24px]`}>
                {desc}
            </div>
        </section>
    );
};
