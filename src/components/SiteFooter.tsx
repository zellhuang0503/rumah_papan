import React from 'react';
import { BrandLogo } from './BrandLogo';
import { FOOTER_DATA } from '../data/homeData';

export const SiteFooter: React.FC = () => {
    // Scaled dimensions
    // Width 1808 -> 1356px
    // Padding pl-28 (112) -> 84px. pr-24 (96) -> 72px. py-40 (160) -> 120px.
    // Rounded 30 -> 22.5px

    return (
        <section className="w-full flex justify-center pb-[60px]">
            <div className="w-[1356px] pl-[84px] pr-[72px] py-[120px] bg-neutral-800 rounded-[22.5px] flex flex-col justify-start items-start gap-[7.5px] overflow-hidden">
                <div className="self-stretch flex justify-between items-start">
                    {/* Left Column */}
                    <div className="w-[360px] flex flex-col items-start gap-[24px]">
                        <div className="flex items-center gap-[18px]">
                            <BrandLogo className="w-[60px] h-[48px] text-orange-100" />
                            <div className="flex flex-col items-start">
                                <span className="text-orange-100 text-[22.5px] font-bold font-['Noto_Sans_TC'] leading-[30px]">
                                    {FOOTER_DATA.title}
                                </span>
                                <span className="text-orange-100 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px]">
                                    {FOOTER_DATA.subtitle}
                                </span>
                            </div>
                        </div>

                        <p className="text-orange-100 text-[18px] font-bold font-['Noto_Sans_TC'] leading-[24px]">
                            {FOOTER_DATA.description}
                        </p>

                        {/* Social Icons */}
                        <div className="flex justify-start items-center gap-[18px]">
                            {(FOOTER_DATA as any).socials?.map((social: any) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-100 hover:text-red-400 transition-colors flex items-center justify-center p-2"
                                >
                                    <i className={`${social.icon} text-[24px]`} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Info Grid */}
                    <div className="flex flex-col items-start gap-[24px]">
                        <div className="flex items-start gap-[48px]">
                            <div className="flex flex-col gap-[12px]">
                                <h4 className="opacity-70 text-orange-100 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                                    服務區域
                                </h4>
                                <p className="text-red-400 text-[18px] font-medium font-['Roboto_Slab'] leading-[27px] tracking-wide">
                                    {FOOTER_DATA.contact.region}
                                </p>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <h4 className="opacity-70 text-orange-100 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                                    行動電話
                                </h4>
                                <p className="text-red-400 text-[18px] font-medium font-['Roboto_Slab'] leading-[27px] tracking-wide">
                                    {FOOTER_DATA.contact.phone}
                                </p>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <h4 className="opacity-70 text-orange-100 text-[18px] font-medium font-['Roboto_Slab'] leading-[27px] tracking-wide">
                                    Email
                                </h4>
                                <p className="text-red-400 text-[18px] font-medium font-['Roboto_Slab'] leading-[27px] tracking-wide">
                                    {FOOTER_DATA.contact.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[12px]">
                            <h4 className="opacity-70 text-orange-100 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                                地址
                            </h4>
                            <p className="text-red-400 text-[18px] font-medium font-['Roboto_Slab'] leading-[27px] tracking-wide">
                                {FOOTER_DATA.contact.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Circular FAB or Badge at bottom right? 
                HTML: w-28 h-28 left-[1703px] top-[891px] ...
                It's likely the "Guide" or Chat button.
                I'll leave it to be handled by the existing guide button logic or add it here if it's static.
                The user's HTML shows it outside the footer card.
            */}
        </section>
    );
};
