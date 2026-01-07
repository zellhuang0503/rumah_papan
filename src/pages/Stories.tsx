import { MainLayout } from '../layouts/MainLayout';
import { Polaroid } from '../components/Polaroid';
import { mockStories } from '../data/mockStories';

export const Stories: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto p-8 pt-32">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif text-primary mb-4">故事誌 (Stories)</h1>
                    <p className="text-secondary max-w-2xl mx-auto">
                        探索班厝的點點滴滴，從老屋的歷史到在地的美食文化，每一個角落都有屬於它的故事。
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
                    {mockStories.map((story, index) => (
                        <div key={index} className="flex justify-center">
                            <Polaroid
                                src={story.cover_image}
                                caption={story.title.zh}
                                className={`transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-all duration-300`}
                                style={{ maxWidth: '300px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};
