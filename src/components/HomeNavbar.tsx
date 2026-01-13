import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NavbarSubmenu } from './NavbarSubmenu';
import { ABOUT_SUBMENU_ITEMS, VILLAGE_SUBMENU_ITEMS } from '../data/mockNavigation';

import { useLanguage } from '../contexts/LanguageContext';

export const HomeNavbar: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    return (
        <nav className="fixed top-0 left-0 w-full px-[120px] py-[52px] flex justify-between items-center z-50 bg-orange-100/90 backdrop-blur-sm transition-all duration-300">
            {/* Logo Section - Left */}
            <Link to="/home" className="pointer-events-auto flex items-center gap-2 z-50">
                <BrandLogo className="w-10 h-10 text-[#181818]" />
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg text-[#181818] tracking-wide">班厝故事館</h1>
                    <span className="font-serif text-xs text-[#181818] tracking-widest">RUMAH PAPAN</span>
                </div>
            </Link>

            {/* Centered Group: Search, Nav Links, Lang */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-6 pointer-events-auto">
                <button className="p-2 hover:bg-neutral-100/50 rounded-full transition-colors">
                    <Search className="w-5 h-5 text-[#181818]" />
                </button>

                <div className="flex items-center gap-6">
                    <div className="relative group h-full flex items-center">
                        <Link to="/about" className="flex items-center gap-1 cursor-pointer">
                            <span className="font-bold text-[#181818] text-base">關於班厝</span>
                            <ChevronDown className="w-3.5 h-3.5 text-[#181818] group-hover:translate-y-0.5 transition-transform" />
                        </Link>
                        {/* Submenu with padding bridge */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-[18px] hidden group-hover:block">
                            <NavbarSubmenu items={ABOUT_SUBMENU_ITEMS} />
                        </div>
                    </div>

                    <div className="relative group h-full flex items-center">
                        <div className="flex items-center gap-1 cursor-pointer">
                            <span className="font-bold text-[#181818] text-base">走進新村</span>
                            <ChevronDown className="w-3.5 h-3.5 text-[#181818] group-hover:translate-y-0.5 transition-transform" />
                        </div>
                        {/* Submenu with padding bridge */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-[18px] hidden group-hover:block">
                            <NavbarSubmenu items={VILLAGE_SUBMENU_ITEMS} />
                        </div>
                    </div>

                    <Link to="/village/traffic" className="font-bold text-[#181818] text-base hover:text-[#F1592C] transition-colors">
                        交通方式
                    </Link>

                    <Link to="/contact" className="font-bold text-[#181818] text-base hover:text-[#F1592C] transition-colors">
                        聯絡我們
                    </Link>
                </div>

                {/* Language Switch */}
                <div className="flex items-center gap-2 border-[#181818] pl-6 pointer-events-auto">
                    <button
                        onClick={() => setLanguage('zh')}
                        className={`font-bold text-sm cursor-pointer transition-colors ${language === 'zh' ? 'text-[#181818]' : 'text-[#181818]/40 hover:text-[#181818]'}`}
                    >
                        CH
                    </button>
                    <span className="text-[#181818]/40 text-sm">|</span>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`font-serif text-sm cursor-pointer transition-colors ${language === 'en' ? 'text-[#181818]' : 'text-[#181818]/60 hover:text-[#181818]'}`}
                    >
                        EN
                    </button>
                </div>
            </div>

            {/* Right Section: Contact Button */}
            <Link to="/contact" className="pointer-events-auto bg-transparent border-[2px] border-[#181818] rounded-full px-5 py-2 flex items-center gap-2 hover:bg-[#F1592C] transition-all duration-300 z-50 group">
                <i className="fi fi-br-envelope text-[16px] text-[#181818] transition-colors" />
                <span className="font-bold text-base text-[#181818]">聯絡我們</span>
            </Link>
        </nav>
    );
};
