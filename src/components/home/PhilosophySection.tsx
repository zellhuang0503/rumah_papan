import React from 'react';

export const PhilosophySection: React.FC = () => {
    // Scaled dimensions
    // Text 7xl (72) -> 54px.
    // Text 2xl (24) -> 18px.
    // Width 540 -> 405px.

    return (
        <section className="w-full flex flex-col items-center bg-orange-100 gap-[12px] px-6 desktop:px-0">
            <h2 className="text-neutral-900 text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[75.6px] text-center">
                生活 × 在地 × 新村
            </h2>
            <div className="w-full max-w-[405px] text-center text-neutral-900 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-relaxed desktop:leading-[24px]">
                在班達馬蘭新村，我們用故事、風景與人情，<br />留住一個個正在發生的華人新村日常。
            </div>
        </section>
    );
};
