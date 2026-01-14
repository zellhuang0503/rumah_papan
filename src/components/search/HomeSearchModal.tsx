import React, { useState, useEffect } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { searchContent, getRecommendedContent, type SearchResult } from '../../utils/searchUtils';
import { Link } from 'react-router-dom';

interface HomeSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HomeSearchModal: React.FC<HomeSearchModalProps> = ({ isOpen, onClose }) => {
    const { language } = useLanguage();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Load recommendations on open
    useEffect(() => {
        if (isOpen && !query) {
            setResults(getRecommendedContent(language));
        }
    }, [isOpen, query, language]);

    // Handle search
    useEffect(() => {
        if (query.trim()) {
            const hits = searchContent(query, language);
            setResults(hits);
        } else if (isOpen) {
            setResults(getRecommendedContent(language));
        }
    }, [query, language, isOpen]);

    if (!isOpen) return null;

    // Filter categories for the "Chips"
    const categories = ['all', ...Array.from(new Set(results.map(r => r.category)))];

    const filteredResults = activeCategory === 'all'
        ? results
        : results.filter(r => r.category === activeCategory);

    // Group results by category for "Section" view (similar to design)
    // The design shows specific headers like "關於班厝", "技能換宿", "肉骨茶"
    // We can simulate this grouping.
    const groupedResults = filteredResults.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, SearchResult[]>);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 desktop:p-0">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            {/* Modal Window - Scaled 1196px * 0.75 = 897px */}
            <div className="relative w-full desktop:w-[897px] min-h-[600px] max-h-[90vh] bg-white rounded-[18px] desktop:rounded-[24px] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                {/* Header / Search Input */}
                <div className="w-full bg-white px-6 py-6 desktop:px-[24px] desktop:py-[24px] border-b border-neutral-100 flex items-center justify-between gap-4 sticky top-0 z-10">
                    <div className="flex-1 flex items-center gap-3 bg-neutral-50 px-4 py-3 rounded-full">
                        <Search className="w-6 h-6 text-neutral-400" />
                        <input
                            type="text"
                            placeholder={language === 'zh' ? "搜尋班達馬蘭的故事..." : "Search stories..."}
                            className="flex-1 bg-transparent border-none outline-none text-neutral-800 text-lg placeholder:text-neutral-400 font-bold"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        {query && (
                            <button onClick={() => setQuery('')} className="p-1 hover:bg-neutral-200 rounded-full text-neutral-400">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500">
                        <span className="sr-only">Close</span>
                        <X className="w-8 h-8" />
                    </button>
                </div>

                {/* Main Content: Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-6 desktop:px-[48px] desktop:py-[36px]">

                    {/* Category Chips */}
                    {categories.length > 1 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${activeCategory === 'all'
                                    ? 'bg-neutral-900 text-white border-neutral-900'
                                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-900'
                                    }`}
                            >
                                {language === 'zh' ? '全部' : 'All'}
                            </button>
                            {categories.filter(c => c !== 'all').map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${activeCategory === cat
                                        ? 'bg-neutral-900 text-white border-neutral-900'
                                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-900'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Results Content */}
                    <div className="flex flex-col gap-10">
                        {Object.entries(groupedResults).map(([category, items]) => (
                            <div key={category} className="flex flex-col gap-6">
                                {/* Section Header */}
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-zinc-500 text-base desktop:text-lg font-medium font-['Noto_Sans_TC']">
                                        {category}
                                    </h3>
                                    <div className="h-[1px] flex-1 bg-neutral-100" />
                                </div>

                                {/* Items List */}
                                <div className="flex flex-col gap-4">
                                    {items.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={item.path}
                                            onClick={onClose}
                                            className="group w-full px-6 py-4 desktop:px-[48px] desktop:py-[18px] bg-neutral-50 rounded-[18px] desktop:rounded-[24px] flex justify-between items-center hover:bg-orange-50 transition-colors duration-300 ring-1 ring-transparent hover:ring-orange-200 cursor-pointer"
                                        >
                                            <div className="flex-1 pr-6 flex flex-col items-start gap-2 desktop:gap-3">
                                                {/* Header Line: Title + Tag */}
                                                <div className="flex flex-col items-start gap-1 w-full text-left">
                                                    <div className="flex items-center gap-3 flex-wrap">
                                                        <h4 className="text-black text-xl desktop:text-[27px] font-bold font-['Noto_Sans_TC'] leading-tight group-hover:text-orange-600 transition-colors">
                                                            {item.title}
                                                        </h4>
                                                        {item.isHot && (
                                                            <span className="px-3 py-0.5 rounded-full border border-neutral-800 text-neutral-800 text-xs font-medium font-['Noto_Sans_TC'] whitespace-nowrap">
                                                                {language === 'zh' ? '熱門' : 'HOT'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="w-full text-stone-900 text-base desktop:text-lg font-medium font-['Noto_Sans_TC'] leading-relaxed line-clamp-2 desktop:line-clamp-2 text-left">
                                                    {item.description}
                                                </p>
                                            </div>

                                            {/* Arrow Icon Box */}
                                            <div className="w-[36px] h-[36px] desktop:w-[48px] desktop:h-[48px] relative flex-shrink-0">
                                                <div className="absolute inset-0 border-[2.5px] border-black group-hover:border-orange-600 transition-colors" />
                                                <ArrowUpRight className="absolute top-[6px] left-[6px] desktop:top-[8px] desktop:left-[8px] w-5 h-5 desktop:w-6 desktop:h-6 text-black group-hover:text-orange-600 transition-colors" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {filteredResults.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-neutral-400 text-lg">
                                    {language === 'zh' ? '找不到相關結果' : 'No results found'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
