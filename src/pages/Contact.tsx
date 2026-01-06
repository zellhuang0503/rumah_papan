import React from 'react';
import { MainLayout } from '../layouts/MainLayout';

export const Contact: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto p-8 pt-32">
                <h1 className="text-4xl font-serif text-primary mb-4">聯絡我們 (Contact)</h1>
                <p className="text-secondary">Map & Social links here.</p>
            </div>
        </MainLayout>
    );
};
