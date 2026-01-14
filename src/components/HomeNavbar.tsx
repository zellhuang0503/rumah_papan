import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, Mail, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NavbarSubmenu } from './NavbarSubmenu';
import { ABOUT_SUBMENU_ITEMS, VILLAGE_SUBMENU_ITEMS } from '../data/mockNavigation';

import { useLanguage } from '../contexts/LanguageContext';

export const HomeNavbar: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = React.useState(false);

    // Lock body scroll when menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full px-6 py-4 lg:px-[120px] lg:py-6 flex justify-between items-center z-50 bg-orange-100/90 backdrop-blur-sm transition-all duration-300">
                {/* ================= DESKTOP VIEW (>= 1024px) ================= */}
                <div className="hidden lg:flex w-full justify-between items-center">
                    {/* Logo Section - Left */}
                    <Link to="/home" className="pointer-events-auto flex items-center gap-2 z-50">
                        <BrandLogo className="w-10 h-10 text-[#181818]" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-lg text-[#181818] tracking-wide">班厝故事館</h1>
                            <span className="font-serif text-xs text-[#181818] tracking-widest">RUMAH PAPAN</span>
                        </div>
                    </Link>

                    {/* Centered Group: Search, Nav Links, Lang */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 desktop:gap-6 pointer-events-auto">
                        <button className="p-2 hover:bg-neutral-100/50 rounded-full transition-colors">
                            <Search className="w-5 h-5 text-[#181818]" />
                        </button>

                        <div className="flex items-center gap-4 desktop:gap-6">
                            <div className="relative group h-full flex items-center">
                                <Link to="/about" className="flex items-center gap-1 cursor-pointer whitespace-nowrap">
                                    <span className="font-bold text-[#181818] text-base">關於班厝</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-[#181818] group-hover:translate-y-0.5 transition-transform" />
                                </Link>
                                {/* Submenu with padding bridge */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-[18px] hidden group-hover:block">
                                    <NavbarSubmenu items={ABOUT_SUBMENU_ITEMS} />
                                </div>
                            </div>

                            <div className="relative group h-full flex items-center">
                                <div className="flex items-center gap-1 cursor-pointer whitespace-nowrap">
                                    <span className="font-bold text-[#181818] text-base">走進新村</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-[#181818] group-hover:translate-y-0.5 transition-transform" />
                                </div>
                                {/* Submenu with padding bridge */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-[18px] hidden group-hover:block">
                                    <NavbarSubmenu items={VILLAGE_SUBMENU_ITEMS} />
                                </div>
                            </div>

                            <Link to="/village/traffic" className="font-bold text-[#181818] text-base hover:text-[#F1592C] transition-colors whitespace-nowrap">
                                交通方式
                            </Link>

                            <Link to="/contact" className="font-bold text-[#181818] text-base hover:text-[#F1592C] transition-colors whitespace-nowrap">
                                聯絡我們
                            </Link>
                        </div>

                        {/* Language Switch */}
                        <div className="flex items-center gap-2 border-[#181818] pl-6 pointer-events-auto whitespace-nowrap">
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
                    <Link to="/contact" className="pointer-events-auto bg-transparent border-[2px] border-[#181818] rounded-full px-5 py-2 flex justify-center items-center gap-2 hover:bg-[#F1592C] transition-all duration-300 z-50 group whitespace-nowrap">
                        <Mail className="w-4 h-4 text-[#181818] group-hover:text-white transition-colors" />
                        <span className="font-bold text-base text-[#181818] leading-none group-hover:text-white pt-[2px]">聯絡我們</span>
                    </Link>
                </div>

                {/* ================= MOBILE VIEW (< 1024px) ================= */}
                <div className="flex lg:hidden w-full justify-between items-center">
                    <Link to="/home" className="flex items-center gap-2 z-50" onClick={() => setIsOpen(false)}>
                        <BrandLogo className="w-8 h-8 text-[#181818]" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-base text-[#181818] tracking-wide">班厝故事館</h1>
                            <span className="font-serif text-[10px] text-[#181818] tracking-widest leading-none">RUMAH PAPAN</span>
                        </div>
                    </Link>

                    <button onClick={() => setIsOpen(true)} className="p-2 text-[#181818]">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Fullscreen Menu Overlay */}
            <div className={`fixed inset-0 bg-[#EAE1D4] z-[60] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden flex flex-col`}>
                <div className="flex justify-between items-center px-6 py-4 border-b border-[#181818]/10">
                    <Link to="/home" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                        <BrandLogo className="w-8 h-8 text-[#181818]" />
                        <div className="flex flex-col">
                            <h1 className="font-bold text-base text-[#181818] tracking-wide">班厝故事館</h1>
                            <span className="font-serif text-[10px] text-[#181818] tracking-widest leading-none">RUMAH PAPAN</span>
                        </div>
                    </Link>
                    <button onClick={() => setIsOpen(false)} className="p-2 text-[#181818]">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8">
                    {/* Navigation Links */}
                    <div className="flex flex-col gap-6 text-[#181818]">
                        {/* Search */}
                        <div className="flex items-center gap-3 pb-4 border-b border-[#181818]/10">
                            <Search className="w-5 h-5" />
                            <span className="text-lg font-bold">搜尋</span>
                        </div>

                        {/* About */}
                        <div className="flex flex-col gap-4">
                            <Link to="/about" className="text-2xl font-bold" onClick={() => setIsOpen(false)}>關於班厝</Link>
                            <div className="pl-4 flex flex-col gap-3 border-l-2 border-[#181818]/10">
                                {ABOUT_SUBMENU_ITEMS.map((item) => (
                                    <Link key={item.title} to={item.path} className="text-base text-[#181818]/80" onClick={() => setIsOpen(false)}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Village */}
                        <div className="flex flex-col gap-4">
                            <span className="text-2xl font-bold">走進新村</span>
                            <div className="pl-4 flex flex-col gap-3 border-l-2 border-[#181818]/10">
                                {VILLAGE_SUBMENU_ITEMS.map((item) => (
                                    <Link key={item.title} to={item.path} className="text-base text-[#181818]/80" onClick={() => setIsOpen(false)}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link to="/village/traffic" className="text-2xl font-bold" onClick={() => setIsOpen(false)}>交通方式</Link>
                        <Link to="/contact" className="text-2xl font-bold" onClick={() => setIsOpen(false)}>聯絡我們</Link>
                    </div>

                    {/* Language Switcher Mobile */}
                    <div className="mt-auto flex items-center gap-4 pt-8 border-t border-[#181818]/10">
                        <button
                            onClick={() => { setLanguage('zh'); setIsOpen(false); }}
                            className={`px-4 py-2 rounded-full border border-[#181818] ${language === 'zh' ? 'bg-[#181818] text-white' : 'text-[#181818]'}`}
                        >
                            中文
                        </button>
                        <button
                            onClick={() => { setLanguage('en'); setIsOpen(false); }}
                            className={`px-4 py-2 rounded-full border border-[#181818] ${language === 'en' ? 'bg-[#181818] text-white' : 'text-[#181818]'}`}
                        >
                            English
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
