import React from 'react';
import { MainLayout } from '../layouts/MainLayout';

export const Stories: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto p-8 pt-32">
                <h1 className="text-4xl font-serif text-primary mb-4">故事誌 (Stories)</h1>
                <p className="text-secondary">CMS Collection content.</p>
            </div>
        </MainLayout>
    );
};
