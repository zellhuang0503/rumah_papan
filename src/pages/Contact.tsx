import React from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { FOUNDER_DATA, CONTACT_LINKS } from '../data/contactData';

export const Contact: React.FC = () => {
    // Layout Rules:
    // Global Width: 1200px
    // Spacing Gap: 24px (based on design gap-6)
    // Scaling: 0.75x

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-32 desktop:pt-[165px] gap-12 desktop:gap-[96px] px-6 desktop:px-0">

                {/* Founder Section */}
                <section className="w-full max-w-[1200px] bg-white rounded-[18px] px-6 py-8 desktop:px-[24px] desktop:py-[15px] flex flex-col desktop:flex-row justify-center items-center gap-8 desktop:gap-[15px] overflow-hidden shadow-sm">
                    {/* Image Container */}
                    <div className="w-full h-[300px] desktop:flex-1 desktop:h-full relative rounded-[18px] overflow-visible desktop:overflow-hidden desktop:self-stretch shrink-0">
                        {/* Image with specific styles */}
                        <img
                            src={FOUNDER_DATA.image}
                            alt={FOUNDER_DATA.name}
                            className="w-full h-full desktop:w-[524px] desktop:absolute desktop:left-[-67px] desktop:top-0 rounded-[18px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.10)] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.20)] outline outline-[6px] outline-white object-cover"
                        />
                    </div>

                    {/* Content Container */}
                    <div className="w-full desktop:w-[765px] h-auto desktop:h-[470px] desktop:p-[30px] flex flex-col justify-between items-start gap-8 desktop:gap-0">
                        <div className="w-full flex flex-col justify-start items-start gap-4 desktop:gap-[9px]">
                            <h2 className="w-full text-black text-3xl desktop:text-[54px] font-semibold font-['Roboto_Slab'] leading-[1.45]">
                                {FOUNDER_DATA.name}
                            </h2>
                            <p className="w-full text-black/80 text-base desktop:text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.6]">
                                {FOUNDER_DATA.bio}
                            </p>
                        </div>

                        <div className="w-full flex flex-col desktop:flex-row justify-between items-start desktop:items-end gap-6 desktop:gap-0">
                            <div className="flex flex-col justify-start items-start gap-1 desktop:gap-[3px]">
                                <h3 className="w-full text-neutral-800 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">
                                    {FOUNDER_DATA.title}
                                </h3>
                                <p className="w-full text-neutral-800 text-lg desktop:text-[18px] font-bold font-['Noto_Sans_TC'] leading-[1.35]">
                                    {FOUNDER_DATA.subtitle}
                                </p>
                            </div>

                            {/* Social Icons */}
                            <div className="w-full desktop:w-[160px] flex justify-start desktop:justify-end items-center desktop:items-end gap-4 desktop:gap-[15px]">
                                {(FOUNDER_DATA as any).socials.map((social: any) => (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[42px] h-[42px] relative flex justify-center items-center transition-colors hover:opacity-70"
                                    >
                                        <i className={`${social.icon} text-[24px] text-neutral-800`} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Grid Section */}
                <section className="w-full max-w-[1200px] flex flex-col desktop:flex-row flex-wrap content-start gap-6 desktop:gap-[18px]">
                    {/* Card 1: Contact Title */}
                    <div className="w-full desktop:w-[288px] h-[240px] desktop:h-[344px] bg-white rounded-[27px] relative overflow-hidden flex flex-col justify-end p-6 desktop:p-[30px]">
                        <div className="absolute top-[30px] desktop:top-[230px] left-[30px] flex items-center gap-[6px]">
                            <span className="text-black text-[18px] font-medium font-['Roboto_Slab']">Contact us</span>
                        </div>
                        <h2 className="text-black/80 text-3xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight mt-[10px]">
                            聯絡方式
                        </h2>
                    </div>

                    {/* Card 2: Facebook */}
                    <div className="w-full desktop:flex-1 h-[140px] desktop:h-[344px] bg-white rounded-[27px] p-4 desktop:p-[18px] flex flex-col justify-end">
                        <div className="w-full bg-white px-6 py-3 desktop:px-[24px] desktop:py-[9px] rounded-[18px] flex flex-col items-start gap-1 desktop:gap-[6px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-black text-base desktop:text-[18px] font-medium font-['Roboto_Slab']">Facebook</span>
                                <i className="fi fi-brands-facebook text-[16px] text-black" />
                            </div>
                            <h3 className="text-black/80 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight truncate w-full">
                                {CONTACT_LINKS[0].value}
                            </h3>
                        </div>
                    </div>

                    {/* Row 2 Wrapper for Desktop / Stack on Mobile */}
                    {/* Actually we can just keep them as siblings and let flex-wrap handle desktop, full width on mobile */}

                    {/* Card 3: Instagram */}
                    <div className="w-full desktop:basis-[calc(50%-9px)] h-[140px] desktop:h-[344px] bg-white rounded-[27px] p-4 desktop:p-[18px] flex flex-col justify-end">
                        <div className="w-full bg-white px-6 py-3 desktop:px-[24px] desktop:py-[9px] rounded-[18px] flex flex-col items-start gap-1 desktop:gap-[6px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-black/80 text-base desktop:text-[18px] font-medium font-['Roboto_Slab']">Instagram</span>
                                <i className="fi fi-brands-instagram text-[16px] text-black" />
                            </div>
                            <h3 className="text-black/80 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight truncate w-full">
                                {CONTACT_LINKS[1].value}
                            </h3>
                        </div>
                    </div>

                    {/* Card 4: WhatsApp */}
                    <div className="w-full desktop:basis-[calc(50%-9px)] h-[140px] desktop:h-[344px] bg-white rounded-[27px] p-4 desktop:p-[18px] flex flex-col justify-end">
                        <div className="w-full bg-white px-6 py-3 desktop:px-[24px] desktop:py-[9px] rounded-[18px] flex flex-col items-start gap-1 desktop:gap-[6px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-black/80 text-base desktop:text-[18px] font-medium font-['Roboto_Slab']">WhatsApp</span>
                                <i className="fi fi-brands-whatsapp text-[16px] text-black" />
                            </div>
                            <h3 className="text-black/80 text-2xl desktop:text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight truncate w-full">
                                {CONTACT_LINKS[2].value}
                            </h3>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </main>
        </div>
    );
};
