import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { client } from '../../utils/sanity';
import { useLanguage } from '../../contexts/LanguageContext';
import { sanitizeUrl } from '../../utils/security';

interface Announcement {
    title: string;
    date: string;
    category: 'latest' | 'event' | 'announcement';
    link: string;
    isNewBadge: boolean;
}

export const NewsSection: React.FC = () => {
    const { language } = useLanguage();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await client.fetch(`*[_type == "announcement"] | order(date desc) [0...10]`);
                setAnnouncements(data);
            } catch (error) {
                console.error("Failed to fetch announcements", error);
            }
        };
        fetchAnnouncements();
    }, []);

    const getCategoryLabel = (category: string) => {
        const labels: Record<string, { zh: string; en: string }> = {
            latest: { zh: '最新', en: 'Latest' },
            event: { zh: '活動', en: 'Event' },
            announcement: { zh: '公告', en: 'Notice' }
        };
        return labels[category]?.[language] || (language === 'zh' ? '最新' : 'Latest');
    };

    if (announcements.length === 0) return null;

    return (
        <section className="w-full h-auto desktop:min-h-[500px] relative bg-orange-100 flex justify-center items-start py-12 desktop:py-24">
            <div className="w-full max-w-[1275px] px-6 desktop:px-0 flex flex-col justify-center items-center">
                {announcements.map((news, index) => (
                    <a
                        key={index}
                        href={sanitizeUrl(news.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-8 border-b border-neutral-900 group hover:bg-white/30 transition-colors flex flex-row justify-between items-center px-4 lg:px-8 gap-4 lg:gap-12"
                    >
                        {/* Content Wrapper */}
                        <div className="flex flex-row items-center gap-4 w-full overflow-hidden">
                            {/* Meta Row: Date + Badge */}
                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-neutral-900 text-lg font-medium font-['Noto_Sans_TC'] leading-6 whitespace-nowrap">
                                    {news.date.replace(/-/g, '.')}
                                </span>

                                <div className="px-[9px] py-[3px] rounded-full border border-neutral-900 flex justify-center items-center bg-white shrink-0">
                                    <span className="text-neutral-900 text-[15px] font-medium font-['Noto_Sans_TC'] leading-normal whitespace-nowrap">
                                        {getCategoryLabel(news.category)}
                                    </span>
                                </div>
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
                    </a>
                ))}
            </div>
        </section>
    );
};
