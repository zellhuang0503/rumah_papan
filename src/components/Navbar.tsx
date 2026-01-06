import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
            <div className="pointer-events-auto">
                {/* Logo or Brand can go here */}
                <Link to="/" className="text-primary font-bold text-xl font-serif">Rumah Papan</Link>
            </div>

            <div className="flex gap-6 pointer-events-auto bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
                <Link to="/" className="text-secondary hover:text-primary transition-colors font-medium">首頁</Link>
                <Link to="/about" className="text-secondary hover:text-primary transition-colors font-medium">關於班厝</Link>
                <Link to="/stories" className="text-secondary hover:text-primary transition-colors font-medium">故事誌</Link>
                <Link to="/services" className="text-secondary hover:text-primary transition-colors font-medium">服務體驗</Link>
                <Link to="/contact" className="text-secondary hover:text-primary transition-colors font-medium">聯絡我們</Link>
            </div>
        </nav>
    );
};
