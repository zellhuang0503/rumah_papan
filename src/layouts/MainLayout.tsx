import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

import { Navbar } from '../components/Navbar';

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-bg relative overflow-hidden font-sans text-secondary">
            <Navbar />
            {/* Background texture or pattern can be added here */}
            <main className="relative z-10 w-full h-full">
                {children}
            </main>
        </div>
    );
};
