import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { NEWS_DATA } from '../../data/homeData';

export const NewsSection: React.FC = () => {
    return (
        <section className="w-full h-auto desktop:h-[600px] relative bg-orange-100 flex justify-center items-start py-12 desktop:py-0">
            <div className="w-full max-w-[1275px] px-6 desktop:px-0 flex flex-col justify-center items-center">
                {NEWS_DATA.map((news, index) => (
                    <Link
                        key={index}
                        to={news.path}
                        className="w-full py-8 border-b border-neutral-900 group hover:bg-white/30 transition-colors flex flex-row justify-between items-center px-4 lg:px-8 gap-4 lg:gap-12"
                    >
                        {/* Content Wrapper */}
                        <div className="flex flex-row items-center gap-4 w-full overflow-hidden">
                            {/* Meta Row: Date + Badge */}
                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-neutral-900 text-lg font-medium font-['Noto_Sans_TC'] leading-6 whitespace-nowrap">
                                    {news.date}
                                </span>

                                {news.isNew && (
                                    <div className="px-[9px] py-[3px] rounded-full border border-neutral-900 flex justify-center items-center bg-white shrink-0">
                                        <span className="text-neutral-900 text-[15px] font-medium font-['Noto_Sans_TC'] leading-normal whitespace-nowrap">
                                            最新
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Title - Truncated */}
                            <h3 className="text-neutral-900 text-lg lg:text-xl font-medium font-['Noto_Sans_TC'] leading-relaxed truncate">
                                {news.title}
                            </h3>
                        </div>

                        {/* Arrow Icon */}
                        <div className="w-12 h-12 shrink-0 rounded-full border-[1.8px] border-transparent group-hover:border-neutral-900 flex items-center justify-center transition-all">
                            <ArrowUpRight className="w-[30px] h-[30px] text-neutral-900" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
