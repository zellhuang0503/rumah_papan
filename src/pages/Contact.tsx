import React, { useEffect, useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { getFounderData, CONTACT_LINKS } from '../data/contactData';
import { useLanguage } from '../contexts/LanguageContext';
import { client, urlFor } from '../utils/sanity';

interface ContactData {
    founderImage?: any;
    founderName?: string;
    founderName_en?: string;
    founderBio?: string;
    founderBio_en?: string;
    founderTitle?: string;
    founderTitle_en?: string;
    founderSubtitle?: string;
    founderSubtitle_en?: string;
    facebookHandle?: string;
    facebookLink?: string;
    instagramHandle?: string;
    instagramLink?: string;
    whatsappHandle?: string;
    whatsappLink?: string;
}

export const Contact: React.FC = () => {
    const { language } = useLanguage();
    const FOUNDER_DATA = getFounderData(language);

    // CMS Data State
    const [data, setData] = useState<ContactData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch<ContactData>(`*[_type == "contact"][0]`);
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error("Failed to fetch contact data", error);
            }
        };
        fetchData();
    }, []);

    const labels = {
        title: language === 'zh' ? '聯絡方式' : 'Contact Info'
    };

    // Merged: CMS data takes precedence, fallback to Static Data
    // Helper to get localized string
    const getLocalized = (zh: string | undefined, en: string | undefined, fallback: string) => {
        if (language === 'en') return en || zh || fallback;
        return zh || fallback;
    };

    const displayFounderName = getLocalized(data?.founderName, data?.founderName_en, FOUNDER_DATA.name);
    const displayFounderBio = getLocalized(data?.founderBio, data?.founderBio_en, FOUNDER_DATA.bio);
    const displayFounderTitle = getLocalized(data?.founderTitle, data?.founderTitle_en, FOUNDER_DATA.title);
    const displayFounderSubtitle = getLocalized(data?.founderSubtitle, data?.founderSubtitle_en, FOUNDER_DATA.subtitle);

    // Image doesn't need localization usually, unless specified
    const displayFounderImage = data?.founderImage ? urlFor(data.founderImage).url() : FOUNDER_DATA.image;

    const displayFbLink = data?.facebookLink || CONTACT_LINKS[0].link;
    const displayFbLabel = data?.facebookHandle || CONTACT_LINKS[0].value;

    const displayIgLink = data?.instagramLink || CONTACT_LINKS[1].link;
    const displayIgLabel = data?.instagramHandle || CONTACT_LINKS[1].value;

    const displayWaLink = data?.whatsappLink || CONTACT_LINKS[2].link;
    const displayWaLabel = data?.whatsappHandle || CONTACT_LINKS[2].value;

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-12 desktop:gap-[96px] px-6 desktop:px-0">

                {/* Founder Section */}
                <section className="w-full max-w-[1200px] bg-white rounded-[18px] px-4 py-6 desktop:px-[24px] desktop:py-[15px] flex flex-col desktop:flex-row justify-center items-center gap-4 desktop:gap-[30px] overflow-hidden shadow-sm">
                    {/* Image Container - Unified Portrait Mode */}
                    <div className="w-[130px] md:w-[200px] desktop:w-[360px] aspect-[3/4] relative rounded-[18px] overflow-hidden shrink-0 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.10)] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.08)]">
                        {/* Image with specific styles */}
                        <img
                            src={displayFounderImage}
                            alt={displayFounderName}
                            className="w-full h-full object-cover object-center transform scale-100"
                        />
                    </div>

                    {/* Content Container (Right - Scaled Fixed Width) */}
                    <div className="flex-1 py-1 desktop:w-[765px] desktop:h-[470px] desktop:p-[30px] flex flex-col justify-between items-start gap-2 desktop:gap-0">
                        {/* Name & Bio */}
                        <div className="w-full flex flex-col justify-start items-start gap-2 desktop:gap-6">
                            <h2 className="w-full text-black text-lg md:text-2xl desktop:text-[54px] font-semibold font-['Roboto_Slab'] leading-[1.45]">
                                {displayFounderName}
                            </h2>
                            <p className="w-full text-black/80 text-xs md:text-sm desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.6] desktop:leading-[1.8] line-clamp-4 desktop:line-clamp-none whitespace-pre-wrap">
                                {displayFounderBio}
                            </p>
                        </div>

                        {/* Title & Socials */}
                        <div className="w-full flex flex-col desktop:flex-row justify-between items-start desktop:items-end gap-2 desktop:gap-0">
                            <div className="flex flex-col justify-start items-start gap-0 desktop:gap-[3px]">
                                <h3 className="w-full text-neutral-800 text-sm md:text-lg desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">
                                    {displayFounderTitle}
                                </h3>
                                <p className="w-full text-neutral-800 text-xs md:text-base desktop:text-[18px] font-bold font-['Noto_Sans_TC'] leading-[1.35]">
                                    {displayFounderSubtitle}
                                </p>
                            </div>

                            {/* Social Icons (Static from FOUNDER_DATA) */}
                            <div className="w-full desktop:w-[160px] flex justify-start desktop:justify-end items-center desktop:items-end gap-2 desktop:gap-[15px]">
                                {(FOUNDER_DATA as any).socials.map((social: any) => (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] desktop:w-[42px] desktop:h-[42px] relative flex justify-center items-center transition-colors hover:opacity-70"
                                    >
                                        <i className={`${social.icon} text-[16px] md:text-[18px] desktop:text-[24px] text-neutral-800`} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Grid Section */}
                <section className="w-full max-w-[1200px] flex flex-col desktop:flex-row flex-wrap content-start gap-6 desktop:gap-[18px]">
                    {/* Card 1: Contact Title */}
                    <div className="w-full desktop:w-[288px] h-[120px] desktop:h-[344px] bg-white rounded-[27px] relative overflow-hidden flex flex-col justify-end p-6 desktop:p-[30px] gap-3 desktop:gap-0">
                        <div className="flex items-center gap-[6px] desktop:absolute desktop:top-[230px] desktop:left-[30px]">
                            <span className="text-black text-[18px] font-medium font-['Roboto_Slab']">Contact us</span>
                        </div>
                        <h2 className="text-black/80 text-3xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight desktop:mt-[10px]">
                            {labels.title}
                        </h2>
                    </div>

                    {/* Card 2: Facebook */}
                    <a
                        href={displayFbLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full desktop:flex-1 h-[180px] desktop:h-[344px] bg-white rounded-[27px] p-6 desktop:p-[18px] flex flex-col justify-end cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                        <div className="w-full bg-white p-0 desktop:px-[24px] desktop:py-[9px] rounded-[18px] flex flex-col items-start gap-1 desktop:gap-[6px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-black text-base desktop:text-[18px] font-medium font-['Roboto_Slab']">Facebook</span>
                                <i className="fi fi-brands-facebook text-[16px] text-black" />
                            </div>
                            <h3 className="text-black/80 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight truncate w-full">
                                {displayFbLabel}
                            </h3>
                        </div>
                    </a>

                    {/* Card 3: Instagram */}
                    <a
                        href={displayIgLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full desktop:basis-[calc(50%-9px)] h-[180px] desktop:h-[344px] bg-white rounded-[27px] p-6 desktop:p-[18px] flex flex-col justify-end cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                        <div className="w-full bg-white p-0 desktop:px-[24px] desktop:py-[9px] rounded-[18px] flex flex-col items-start gap-1 desktop:gap-[6px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-black/80 text-base desktop:text-[18px] font-medium font-['Roboto_Slab']">Instagram</span>
                                <i className="fi fi-brands-instagram text-[16px] text-black" />
                            </div>
                            <h3 className="text-black/80 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight truncate w-full">
                                {displayIgLabel}
                            </h3>
                        </div>
                    </a>

                    {/* Card 4: WhatsApp */}
                    <a
                        href={displayWaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full desktop:basis-[calc(50%-9px)] h-[180px] desktop:h-[344px] bg-white rounded-[27px] p-6 desktop:p-[18px] flex flex-col justify-end cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                        <div className="w-full bg-white p-0 desktop:px-[24px] desktop:py-[9px] rounded-[18px] flex flex-col items-start gap-1 desktop:gap-[6px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-black/80 text-base desktop:text-[18px] font-medium font-['Roboto_Slab']">WhatsApp</span>
                                <i className="fi fi-brands-whatsapp text-[16px] text-black" />
                            </div>
                            <h3 className="text-black/80 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight truncate w-full">
                                {displayWaLabel}
                            </h3>
                        </div>
                    </a>
                </section>

                <SiteFooter />
            </main>
        </div>
    );
};
