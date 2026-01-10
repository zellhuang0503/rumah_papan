import React from 'react';
import { Link } from 'react-router-dom';
import type { NavItem } from '../data/mockNavigation';

interface NavbarSubmenuProps {
    items: NavItem[];
}

export const NavbarSubmenu: React.FC<NavbarSubmenuProps> = ({ items }) => {
    return (
        <div className="w-[132px] bg-white rounded-[15px] inline-flex flex-col justify-start items-start overflow-hidden shadow-lg">
            {items.map((item, index) => (
                <Link
                    key={index}
                    to={item.path}
                    className="self-stretch px-[15px] py-[9px] bg-white inline-flex justify-center items-center gap-[7.5px] hover:bg-neutral-50 transition-colors"
                >
                    <div className="text-center justify-start text-zinc-800 text-base font-bold font-['Noto_Sans_TC'] leading-6">
                        {item.title}
                    </div>
                </Link>
            ))}
        </div>
    );
};
