import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { PolaroidHero } from '../components/PolaroidHero';

export const Home: React.FC = () => {
    return (
        <MainLayout showNavbar={false}>
            <div className="w-full">
                <PolaroidHero />
            </div>
        </MainLayout>
    );
};
