import type { StoryPost } from '../types/schema';

export const mockStories: StoryPost[] = [
    {
        title: { zh: '老屋的新生命', en: 'New Life of the Old House' },
        category: 'History',
        cover_image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800', // Placeholder
        body_text: { zh: '這是一段關於老屋翻新的故事...', en: 'This is a story about the renovation of the old house...' },
        tags: ['Renovation', 'History']
    },
    {
        title: { zh: '在地美食探索', en: 'Exploring Local Cuisine' },
        category: 'Food',
        cover_image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', // Placeholder
        body_text: { zh: '班厝附近的美味小吃...', en: 'Delicious snacks near Rumah Papan...' },
        tags: ['Food', 'Local']
    },
    {
        title: { zh: '文化體驗之旅', en: 'Cultural Experience' },
        category: 'Culture',
        cover_image: 'https://images.unsplash.com/photo-1518182170546-0766be6f5a56?auto=format&fit=crop&q=80&w=800', // Placeholder
        body_text: { zh: '深入了解在地文化...', en: 'Deep dive into local culture...' },
        tags: ['Culture', 'Travel']
    },
    {
        title: { zh: '午後的咖啡時光', en: 'Afternoon Coffee Time' },
        category: 'Food',
        cover_image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800', // Placeholder
        body_text: { zh: '享受愜意的午後時光...', en: 'Enjoy a relaxing afternoon...' },
        tags: ['Coffee', 'Relax']
    },
    {
        title: { zh: '夏日的祭典', en: 'Summer Festival' },
        category: 'Culture',
        cover_image: 'https://images.unsplash.com/photo-1533276664082-3d71720d2d34?auto=format&fit=crop&q=80&w=800', // Placeholder
        body_text: { zh: '熱鬧的夏日祭典回憶...', en: 'Memories of the lively summer festival...' },
        tags: ['Festival', 'Summer']
    }
];
