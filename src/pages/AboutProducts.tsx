import React, { useEffect, useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getProductsData } from '../data/aboutData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';

interface ProductItem {
    title?: string;
    title_en?: string;
    desc?: string;
    desc_en?: string;
    image?: any;
    _key?: string;
}

export const AboutProducts: React.FC = () => {
    const { language } = useLanguage();
    const PRODUCTS_DATA = getProductsData(language);

    const [cmsItems, setCmsItems] = useState<ProductItem[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await client.fetch<{ products: ProductItem[] }>(`*[_type == "about"][0]{products}`);
                if (data?.products) {
                    setCmsItems(data.products);
                }
            } catch (error) {
                console.error("Failed to fetch products data", error);
            }
        };
        fetchProducts();
    }, []);

    const getLocalized = (zh: string | undefined, en: string | undefined, fallback: string) => {
        if (language === 'en') return en || zh || fallback;
        return zh || fallback;
    };

    const useCmsList = cmsItems.length > 0;
    const listToRender = useCmsList ? cmsItems : PRODUCTS_DATA;

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
                    <div className="w-full max-w-[1440px] flex flex-wrap justify-center gap-6 desktop:gap-[18px] px-6 desktop:px-[90px]">
                        {listToRender.map((item: any, index: number) => {
                            let displayTitle, displayDesc, displayImage;
                            const staticItem = PRODUCTS_DATA[index]; // Fallback for styles

                            if (useCmsList) {
                                const cmsItem = item as ProductItem;
                                displayTitle = getLocalized(cmsItem.title, cmsItem.title_en, staticItem?.title || "");
                                displayDesc = getLocalized(cmsItem.desc, cmsItem.desc_en, staticItem?.desc || "");
                                displayImage = cmsItem.image ? urlFor(cmsItem.image).url() : staticItem?.image;
                            } else {
                                displayTitle = item.title;
                                displayDesc = item.desc;
                                displayImage = item.image;
                            }

                            // Inherit styles from static data based on index (best effort)
                            const imagePosition = (staticItem as any)?.imagePosition || '';
                            const imageScale = (staticItem as any)?.imageScale;

                            return (
                                <div key={index} className="w-full max-w-[408px] flex flex-col items-start shadow-md rounded-[18px]">
                                    <div className="w-full aspect-[408/340.5] relative overflow-hidden rounded-t-[18px]">
                                        <img
                                            className={`w-full h-full object-cover ${imagePosition}`}
                                            src={displayImage}
                                            alt={displayTitle}
                                            style={imageScale ? { transform: `scale(${imageScale})` } : {}}
                                        />
                                    </div>
                                    <div className="self-stretch px-6 pt-[15px] pb-[30px] bg-white rounded-b-[18px] flex flex-col justify-start items-start gap-[7.5px]">
                                        <div className="self-stretch flex flex-col justify-center items-start gap-[9px]">
                                            <h3 className="self-stretch text-neutral-900 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:leading-[52.5px]">
                                                {displayTitle}
                                            </h3>
                                            <p className="self-stretch text-neutral-900 text-base desktop:text-[18px] font-bold font-['Noto_Sans_TC'] leading-normal desktop:leading-[24px] whitespace-pre-line">
                                                {displayDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <SiteFooter />
            </main>
        </div>
    );
};
