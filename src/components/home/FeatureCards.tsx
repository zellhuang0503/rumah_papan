import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturesData } from '../../data/homeData';
import { useLanguage } from '../../contexts/LanguageContext';

export const FeatureCards: React.FC = () => {
    const { language } = useLanguage();
    const features = getFeaturesData(language);

    // Scale factor 0.75
    // Card w-408px h-108px
    return (
        <section className="w-full flex justify-center bg-orange-100">
            <div className="flex justify-start items-center gap-[18px]">
                {features.map((feature, index) => (
                    <Link
                        key={index}
                        to={feature.path}
                        className="relative w-[408px] h-[108px] bg-white rounded-[18px] overflow-hidden group hover:shadow-xl hover:bg-[#F1592C] active:scale-95 active:bg-[#F1592C] transition-all duration-300"
                    >
                        <div className="absolute w-[120px] h-[120px] left-[-109.5px] top-[87px] bg-red-500 rounded-full" />

                        <div className="absolute left-[352.5px] top-[31.5px] p-[6px] rounded-full inline-flex justify-start items-center gap-[7.5px]">
                            <div className="relative w-[30px] h-[30px]">
                                <div className="absolute left-[6.5px] top-[5.25px] w-[18px] h-[21px] flex items-center justify-center border-[1.125px] border-neutral-900 group-hover:border-white group-active:border-white rounded-full transition-colors duration-300">
                                    <i className="fi fi-br-arrow-up-right text-[12px] text-neutral-900 group-hover:text-white group-active:text-white transition-colors duration-300" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute left-[18px] top-[27px] w-[150px] inline-flex flex-col justify-start items-start">
                            <div className="self-stretch justify-start text-neutral-900 group-hover:text-white group-active:text-white text-[10.5px] font-medium font-['Roboto_Slab'] leading-[15px] transition-colors duration-300">
                                {feature.subtitle}
                            </div>
                            <div className="self-stretch justify-start text-neutral-900 group-hover:text-white group-active:text-white text-[27px] font-bold font-['Noto_Sans_TC'] leading-[36.75px] transition-colors duration-300">
                                {feature.title}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
