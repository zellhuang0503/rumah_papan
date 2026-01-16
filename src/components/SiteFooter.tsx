import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { FOOTER_DATA } from '../data/homeData';
import { client } from '../utils/sanity';

export const SiteFooter: React.FC = () => {
    const [footerData, setFooterData] = useState(FOOTER_DATA);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await client.fetch('*[_type == "siteSettings"][0]');
                if (data) {
                    setFooterData({
                        title: data.title || FOOTER_DATA.title,
                        subtitle: data.subtitle || FOOTER_DATA.subtitle,
                        description: data.description || FOOTER_DATA.description,
                        contact: {
                            region: data.serviceRegion || FOOTER_DATA.contact.region,
                            phone: data.phone || FOOTER_DATA.contact.phone,
                            email: data.contactEmail || FOOTER_DATA.contact.email,
                            address: data.address || FOOTER_DATA.contact.address
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch footer data", error);
            }
        };
        fetchSettings();
    }, []);
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
                                    {footerData.title}
                                </span>
                                <span className="text-orange-100 text-[15px] font-normal font-['Roboto_Slab'] leading-[21px]">
                                    {footerData.subtitle}
                                </span>
                            </div>
                        </div>

                        <p className="text-orange-100 text-[18px] font-bold font-['Noto_Sans_TC'] leading-[24px]">
                            {footerData.description}
                        </p>

                        {/* Social Circles */}
                        <div className="w-[132px] flex justify-between items-center">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-[36px] h-[36px] bg-red-400 rounded-full" />
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
                                    {footerData.contact.region}
                                </p>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <h4 className="opacity-70 text-orange-100 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                                    行動電話
                                </h4>
                                <p className="text-red-400 text-[18px] font-medium font-['Roboto_Slab'] leading-[27px] tracking-wide">
                                    {footerData.contact.phone}
                                </p>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <h4 className="opacity-70 text-orange-100 text-[18px] font-medium font-['Roboto_Slab'] leading-[27px] tracking-wide">
                                    Email
                                </h4>
                                <p className="text-red-400 text-[18px] font-medium font-['Roboto_Slab'] leading-[27px] tracking-wide">
                                    {footerData.contact.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[12px]">
                            <h4 className="opacity-70 text-orange-100 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                                地址
                            </h4>
                            <p className="text-red-400 text-[18px] font-medium font-['Roboto_Slab'] leading-[27px] tracking-wide">
                                {footerData.contact.address}
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
