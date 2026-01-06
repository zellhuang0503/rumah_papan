import React from 'react';
import { MainLayout } from '../layouts/MainLayout';

export const Services: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto p-8 pt-32">
                <h1 className="text-4xl font-serif text-primary mb-4">服務體驗 (Experiences)</h1>
                <ul className="text-secondary list-disc pl-5">
                    <li>Guided Tour</li>
                    <li>Stay Experience</li>
                    <li>Work Swap</li>
                </ul>
            </div>
        </MainLayout>
    );
};
