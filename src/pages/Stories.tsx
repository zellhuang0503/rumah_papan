import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Polaroid } from '../components/Polaroid';
import { mockStories } from '../data/mockStories';
import { client, urlFor } from '../utils/sanity';

export const Stories: React.FC = () => {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await client.fetch(`*[_type == "story"] | order(publishedAt desc)`);
                if (data && data.length > 0) {
                    setStories(data);
                } else {
                    // Fallback to mock data if Sanity is empty
                    setStories(mockStories.map(s => ({
                        ...s,
                        titleText: s.title.zh,
                        imageUrl: s.cover_image
                    })));
                }
            } catch (error) {
                console.error('Error fetching stories from Sanity:', error);
                setStories(mockStories.map(s => ({
                    ...s,
                    titleText: s.title.zh,
                    imageUrl: s.cover_image
                })));
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    return (
        <MainLayout>
            <div className="container mx-auto p-8 pt-32">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif text-primary mb-4">故事誌 (Stories)</h1>
                    <p className="text-secondary max-w-2xl mx-auto">
                        探索班厝的點點滴滴，從老屋的歷史到在地的美食文化，每一個角落都有屬於它的故事。
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
                        {stories.map((story, index) => (
                            <div key={story._id || index} className="flex justify-center">
                                <Polaroid
                                    src={story.coverImage ? urlFor(story.coverImage).url() : story.imageUrl}
                                    caption={story.titleText || story.title}
                                    className={`transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-all duration-300`}
                                    style={{ maxWidth: '300px' }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};
