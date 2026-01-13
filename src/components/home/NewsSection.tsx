import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getNewsData } from '../../data/homeData';
import { useLanguage } from '../../contexts/LanguageContext';

export const NewsSection: React.FC = () => {
    const { language } = useLanguage();
    const newsData = getNewsData(language);

    return (
        <section className="w-full h-[600px] relative bg-orange-100 flex justify-center items-start">
            <div className="w-[1275px] flex flex-col justify-center items-center">
                {newsData.map((news, index) => (
                    <Link
                        key={index}
                        to={news.path}
                        className="self-stretch h-[144px] relative border-b border-neutral-900 group hover:bg-white/30 transition-colors"
                    >
                        <div className="absolute left-[30px] top-[50%] -translate-y-1/2 inline-flex justify-start items-center gap-[48px]">
                            <div className="justify-start text-neutral-900 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                                {news.date}
                            </div>

                            {news.isNew && (
                                <div className="px-[9px] py-[3px] rounded-full outline outline-[0.75px] outline-offset-[-0.75px] outline-neutral-900 flex justify-center items-center bg-white">
                                    <div className="justify-center text-neutral-900 text-[15px] font-medium font-['Noto_Sans_TC'] leading-[21px]">
                                        最新
                                    </div>
                                </div>
                            )}

                            <div className="justify-start text-neutral-900 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                                {news.title}
                            </div>
                        </div>

                        <div className="absolute right-[30px] top-[50%] -translate-y-1/2 w-[48px] h-[48px] overflow-hidden rounded-full border-[1.8px] border-transparent group-hover:border-neutral-900 flex items-center justify-center transition-all">
                            <ArrowUpRight className="w-[30px] h-[30px] text-neutral-900" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
