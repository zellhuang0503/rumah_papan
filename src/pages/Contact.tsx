import React from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { SiteFooter } from '../components/SiteFooter';
import { FOUNDER_DATA, CONTACT_LINKS } from '../data/contactData';
import { Facebook, Instagram, Phone } from 'lucide-react'; // Placeholder icons, will use specific ones if needed

export const Contact: React.FC = () => {
    // Layout Rules:
    // Global Width: 1200px
    // Spacing Gap: 24px (based on design gap-6)
    // Scaling: 0.75x

    return (
        <div className="min-h-screen w-full bg-orange-100 relative overflow-x-hidden font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full relative flex flex-col items-center pt-[165px] gap-[96px]"> {/* gap-24 -> 96px */}

                {/* Founder Section */}
                <section className="w-[1200px] bg-white rounded-[18px] px-[24px] py-[15px] flex justify-center items-center gap-[15px] overflow-hidden shadow-sm">
                    {/* Image Container (Left - Flex 1) */}
                    <div className="flex-1 self-stretch relative rounded-[18px] overflow-hidden">
                        {/* Image with specific styles from snippet - Removed 'rounded' to avoid double-rounding issues */}
                        <img
                            src={FOUNDER_DATA.image}
                            alt={FOUNDER_DATA.name}
                            className="w-[524px] h-full absolute left-[-67px] top-0 rounded-[18px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.10)] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.20)] outline outline-[6px] outline-white object-cover"
                        />
                    </div>

                    {/* Content Container (Right - Scaled Fixed Width) */}
                    <div className="w-[765px] h-[470px] p-[30px] inline-flex flex-col justify-between items-start">
                        <div className="self-stretch flex flex-col justify-start items-start gap-[9px]">
                            <h2 className="self-stretch justify-start text-black text-[54px] font-semibold font-['Roboto_Slab'] leading-[1.45]">
                                {FOUNDER_DATA.name}
                            </h2>
                            <p className="self-stretch justify-start text-black/80 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[1.35]">
                                {FOUNDER_DATA.bio}
                            </p>
                        </div>

                        <div className="self-stretch inline-flex justify-between items-end">
                            <div className="inline-flex flex-col justify-start items-start gap-[3px]">
                                <h3 className="self-stretch justify-start text-neutral-800 text-[36px] font-bold font-['Noto_Sans_TC'] leading-[1.4]">
                                    {FOUNDER_DATA.title}
                                </h3>
                                <p className="self-stretch justify-start text-neutral-800 text-[18px] font-bold font-['Noto_Sans_TC'] leading-[1.35]">
                                    {FOUNDER_DATA.subtitle}
                                </p>
                            </div>

                            {/* Decorative Squares */}
                            <div className="w-[160px] self-stretch flex justify-end items-end gap-[15px]">
                                <div className="w-[42px] h-[42px] relative bg-neutral-800/10"> {/* Placeholder for square 1 */}
                                    <div className="w-[36px] h-[36px] absolute left-[3px] top-[3px] bg-neutral-800"></div>
                                </div>
                                <div className="w-[42px] h-[42px] relative bg-neutral-800/10"> {/* Placeholder for square 2 */}
                                    <div className="w-[36px] h-[36px] absolute left-[3px] top-[3px] bg-neutral-800"></div>
                                </div>
                                <div className="w-[42px] h-[42px] relative bg-neutral-800/10"> {/* Placeholder for square 3 */}
                                    <div className="absolute left-[20px] top-[38px] w-[2px] h-[1px] bg-black"></div> {/* Minuscule detail from snippet */}
                                    <div className="w-[36px] h-[36px] absolute left-[3px] top-[3px] bg-neutral-800"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Grid Section */}
                <section className="w-[1200px] flex flex-wrap content-start gap-[18px]">
                    {/* Card 1: Contact Title (Vertical) */}
                    {/* Original w-96 (384) -> 288px. h-[459] -> 344px */}
                    <div className="w-[288px] h-[344px] bg-white rounded-[27px] relative overflow-hidden flex flex-col justify-end p-[30px]">
                        <div className="absolute top-[230px] left-[30px] flex items-center gap-[6px]">
                            <span className="text-black text-[18px] font-medium font-['Roboto_Slab']">Contact us</span>
                        </div>
                        <h2 className="text-black/80 text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight mt-[10px]">
                            聯絡方式
                        </h2>
                    </div>

                    {/* Card 2: Facebook (Wide) */}
                    {/* Original w-[1254]? No, based on grid logic:
                        Row width 1680. 
                        Card 1: 384. Remainder 1296. 
                        Card 2: 1254? + gap?
                        Let's use flex-1 for the rest of the row.
                    */}
                    <div className="flex-1 h-[344px] bg-white rounded-[27px] p-[18px] flex flex-col justify-end">
                        <div className="w-full bg-white px-[24px] py-[9px] rounded-[18px] flex flex-col items-start gap-[6px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-black text-[18px] font-medium font-['Roboto_Slab']">Facebook</span>
                                <Facebook className="w-4 h-4 text-black" />
                            </div>
                            <h3 className="text-black/80 text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight">
                                {CONTACT_LINKS[0].value}
                            </h3>
                        </div>
                    </div>

                    {/* Row 2 */}
                    {/* Card 3: Instagram */}
                    {/* Original 827 (approx half). Scaled 0.75 -> 620px */}
                    <div className="basis-[calc(50%-9px)] h-[344px] bg-white rounded-[27px] p-[18px] flex flex-col justify-end">
                        <div className="w-full bg-white px-[24px] py-[9px] rounded-[18px] flex flex-col items-start gap-[6px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-black/80 text-[18px] font-medium font-['Roboto_Slab']">Instagram</span>
                                <Instagram className="w-4 h-4 text-black" />
                            </div>
                            <h3 className="text-black/80 text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight">
                                {CONTACT_LINKS[1].value}
                            </h3>
                        </div>
                    </div>

                    {/* Card 4: WhatsApp */}
                    {/* Original 829. Scaled -> 622px */}
                    <div className="basis-[calc(50%-9px)] h-[344px] bg-white rounded-[27px] p-[18px] flex flex-col justify-end">
                        <div className="w-full bg-white px-[24px] py-[9px] rounded-[18px] flex flex-col items-start gap-[6px]">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-black/80 text-[18px] font-medium font-['Roboto_Slab']">WhatsApp</span>
                                <Phone className="w-4 h-4 text-black" />
                            </div>
                            <h3 className="text-black/80 text-[36px] font-bold font-['Noto_Sans_TC'] leading-tight">
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
