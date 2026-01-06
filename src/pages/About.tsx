import React from 'react';
import { MainLayout } from '../layouts/MainLayout';

export const About: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto p-8 pt-32">
                <h1 className="text-4xl font-serif text-primary mb-4">關於班厝 (About)</h1>
                <p className="text-secondary">Origin, Founder Story, Village Intro coming soon.</p>
            </div>
        </MainLayout>
    );
};
