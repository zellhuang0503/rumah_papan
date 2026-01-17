import React, { useState, useEffect } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
<<<<<<< HEAD
import { PRODUCTS_DATA } from '../data/aboutData';
import { client, urlFor } from '../utils/sanity';
=======
import { getProductsData } from '../data/aboutData';
import { useLanguage } from '../contexts/LanguageContext';
>>>>>>> main

export const AboutProducts: React.FC = () => {
    const { language } = useLanguage();
    const PRODUCTS_DATA = getProductsData(language);

    // Reuse dimensions from Environment Page
    // Title: "農作產品"

    const [items, setItems] = useState(PRODUCTS_DATA);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const aboutDoc = await client.fetch(`*[_type == "about"][0]`);
                if (aboutDoc && aboutDoc.products) {
                    const mapped = aboutDoc.products.map((item: any) => ({
                        title: item.title,
                        desc: item.desc,
                        image: item.image ? urlFor(item.image).url() : "https://placehold.co/408x341"
                    }));
                    setItems(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch products data", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-12 desktop:gap-[120px]">
                {/* Header Section */}
                <div className="w-full flex flex-col items-center gap-8 desktop:gap-[72px]">
                    <h1 className="text-black text-3xl desktop:text-[54px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[75.6px] text-center">
                        {language === 'zh' ? '農作產品' : 'Farm Products'}
                    </h1>

                    {/* Grid Section */}
<<<<<<< HEAD
                    <div className="w-[1440px] flex flex-wrap justify-center gap-[18px] px-[90px]">
                        {items.map((item, index) => (
                            <div key={index} className="w-[408px] flex flex-col items-start shadow-md rounded-[18px]">
                                <img
                                    className="w-full h-[340.5px] object-cover rounded-t-[18px]"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <div className="self-stretch px-[24px] pt-[15px] pb-[30px] bg-white rounded-b-[18px] flex flex-col justify-start items-start gap-[7.5px]">
=======
                    <div className="w-full max-w-[1440px] flex flex-wrap justify-center gap-6 desktop:gap-[18px] px-6 desktop:px-[90px]">
                        {PRODUCTS_DATA.map((item, index) => (
                            <div key={index} className="w-full max-w-[408px] flex flex-col items-start shadow-md rounded-[18px]">
                                <div className="w-full aspect-[408/340.5] relative overflow-hidden rounded-t-[18px]">
                                    <img
                                        className={`w-full h-full object-cover ${(item as any).imagePosition || ''}`}
                                        src={item.image}
                                        alt={item.title}
                                        style={(item as any).imageScale ? { transform: `scale(${(item as any).imageScale})` } : {}}
                                    />
                                </div>
                                <div className="self-stretch px-6 pt-[15px] pb-[30px] bg-white rounded-b-[18px] flex flex-col justify-start items-start gap-[7.5px]">
>>>>>>> main
                                    <div className="self-stretch flex flex-col justify-center items-start gap-[9px]">
                                        <h3 className="self-stretch text-neutral-900 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[52.5px]">
                                            {item.title}
                                        </h3>
                                        <p className="self-stretch text-neutral-900 text-base desktop:text-[18px] font-bold font-['Noto_Sans_TC'] leading-normal desktop:leading-[24px] whitespace-pre-line">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <SiteFooter />
            </main>
        </div>
    );
};
