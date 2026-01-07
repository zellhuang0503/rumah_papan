import React from 'react';
import { Navbar } from '../components/Navbar';

type LayoutProps = {
    children: React.ReactNode;
    showNavbar?: boolean;
};

export const MainLayout: React.FC<LayoutProps> = ({ children, showNavbar = true }) => {
    return (
        <div className="min-h-screen w-full bg-bg relative overflow-hidden font-sans text-secondary">
            {showNavbar && <Navbar />}
            {/* Background texture or pattern can be added here */}
            <main className="relative z-10 w-full h-full">
                {children}
            </main>
        </div>
    );
};
