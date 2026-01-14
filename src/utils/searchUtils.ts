import { NEWS_DATA, getFeaturesData } from '../data/homeData';
import { stories, STORY_CATEGORIES } from '../data/storyData';
import { getStayData, getActivitiesData, getWorkSwapData } from '../data/villageData';
import { ABOUT_SUBMENU_ITEMS } from '../data/mockNavigation';

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    category: string;
    path: string;
    isHot?: boolean;
    image?: string;
}

export const searchContent = (query: string, language: 'zh' | 'en' = 'zh'): SearchResult[] => {
    if (!query || query.trim() === '') return [];

    const normalizedQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Helper to check match
    const isMatch = (text?: string) => text?.toLowerCase().includes(normalizedQuery);

    // 0. Home Features (High level pages)
    const features = getFeaturesData(language);
    features.forEach((feature, idx) => {
        if (isMatch(feature.title) || isMatch(feature.subtitle)) {
            results.push({
                id: `feature-${idx}`,
                title: feature.title,
                description: feature.subtitle,
                category: language === 'zh' ? '精選' : 'Featured',
                path: feature.path,
                isHot: true
            });
        }
    });

    // 1. Stories
    stories.forEach(story => {
        if (isMatch(story.title) || isMatch(story.description)) {
            // Fallback label if category not found?
            const catLabel = STORY_CATEGORIES.find(c => c.id === story.category)?.label || (language === 'zh' ? '故事' : 'Story');
            results.push({
                id: `story-${story.id}`,
                title: story.title,
                description: story.description,
                category: catLabel,
                path: `/stories#${story.id}`,
                image: story.imageUrl,
                isHot: story.tags.includes('推薦') || story.variant === 'banner'
            });
        }
    });

    // 2. Village - Stay
    const stayData = getStayData(language);
    // Index Hero/General Stay Info
    if (isMatch(stayData.hero.title) || isMatch(stayData.quote.title) || isMatch(stayData.quote.desc)) {
        results.push({
            id: 'stay-main',
            title: stayData.hero.title,
            description: stayData.quote.desc,
            category: language === 'zh' ? '住宿體驗' : 'Stay',
            path: '/services/stay',
            isHot: true
        });
    }
    // Index Rooms
    stayData.rooms.forEach((room, idx) => {
        if (isMatch(room.title) || isMatch(room.desc)) {
            results.push({
                id: `stay-${idx}`,
                title: room.title,
                description: room.desc,
                category: language === 'zh' ? '住宿體驗' : 'Stay',
                path: '/services/stay',
                image: room.image
            });
        }
    });

    // 3. Village - Activities
    const activityData = getActivitiesData(language);
    // Index Hero
    if (isMatch(activityData.hero.title) || isMatch(activityData.quote.title) || isMatch(activityData.quote.desc)) {
        results.push({
            id: 'activity-main',
            title: activityData.hero.title,
            description: activityData.quote.desc,
            category: language === 'zh' ? '活動體驗' : 'Activities',
            path: '/village/map',
            isHot: true
        });
    }
    // Index Items
    activityData.items.forEach((item, idx) => {
        if (isMatch(item.title) || isMatch(item.desc)) {
            results.push({
                id: `activity-${idx}`,
                title: item.title,
                description: item.desc,
                category: language === 'zh' ? '活動體驗' : 'Activities',
                path: '/village/map',
                image: item.image,
                isHot: true
            });
        }
    });

    // 4. Village - Work Swap
    const workSwapData = getWorkSwapData(language);
    // Index Hero
    if (isMatch(workSwapData.hero.title) || isMatch(workSwapData.quote.title) || isMatch(workSwapData.quote.desc)) {
        results.push({
            id: 'workswap-main',
            title: workSwapData.hero.title,
            description: workSwapData.quote.desc,
            category: language === 'zh' ? '技能換宿' : 'Work Swap',
            path: '/services/work-swap',
            isHot: true
        });
    }
    // Index Items
    workSwapData.items.forEach((item, idx) => {
        if (isMatch(item.title) || isMatch(item.desc)) {
            results.push({
                id: `workswap-${idx}`,
                title: item.title,
                description: item.desc,
                category: language === 'zh' ? '技能換宿' : 'Work Swap',
                path: '/services/work-swap',
                image: item.image
            });
        }
    });

    // 5. Home News
    NEWS_DATA.forEach((news, idx) => {
        if (isMatch(news.title)) {
            results.push({
                id: `news-${idx}`,
                title: news.title,
                description: news.date,
                category: language === 'zh' ? '最新消息' : 'News',
                path: news.path,
                isHot: news.isNew
            });
        }
    });

    // 6. Navigation Items (About, etc.)
    const isAboutQuery = normalizedQuery.includes('關於') || normalizedQuery.includes('about');

    ABOUT_SUBMENU_ITEMS.forEach((item, idx) => {
        if (isAboutQuery || isMatch(item.title)) {
            results.push({
                id: `nav-about-${idx}`,
                title: item.title,
                description: language === 'zh' ? '關於班厝' : 'About Rumah Papan',
                category: language === 'zh' ? '關於班厝' : 'About',
                path: item.path,
                isHot: isAboutQuery
            });
        }
    });

    return results;
};

// Start with some default "Hot" or "Recommended" items if query is empty
export const getRecommendedContent = (language: 'zh' | 'en' = 'zh'): SearchResult[] => {
    // Return a curated list of "Hot" items as per the design mockup
    return [
        {
            id: 'rec-1',
            title: language === 'zh' ? '班達馬蘭歷史' : 'History of Pandamaran',
            description: language === 'zh'
                ? 'Pandamaran 這個名字，來自一棵「樹脂樹」 Pokok Damar。早年，樹脂被用來造船黏合、上色...'
                : 'Pandamaran comes from the "Resin Tree" Pokok Damar...',
            category: language === 'zh' ? '關於班厝' : 'About',
            path: '/about',
            isHot: true
        },
        {
            id: 'rec-2',
            title: language === 'zh' ? '班厝故事館' : 'Rumah Papan Story House',
            description: language === 'zh'
                ? '班厝坐落在巴生班達馬蘭新村，是村裡第一家故事館。以一棟板屋為基地...'
                : 'Located in Pandamaran New Village, Rumah Papan is the first story house in the village...',
            category: language === 'zh' ? '關於班厝' : 'About',
            path: '/about',
            isHot: true
        },
        {
            id: 'rec-3',
            title: language === 'zh' ? '肉骨茶發源' : 'Origin of Bak Kut Teh',
            description: language === 'zh'
                ? '走進班達馬蘭，大街小巷最熱鬧的風景之一，就是一早就坐滿人的肉骨茶店...'
                : 'One of the liveliest scenes in Pandamaran is the Bak Kut Teh shops full of people in the morning...',
            category: language === 'zh' ? '肉骨茶' : 'Bak Kut Teh',
            path: '/food',
            isHot: true
        },
        {
            id: 'rec-4',
            title: language === 'zh' ? '找到更多可能' : 'Find Possibilities',
            description: language === 'zh'
                ? '白天陪訪客聽班村故事，晚上輪到你把自己的城市、國家或人生說給大家聽...'
                : 'Daytime involves listening to village stories with visitors; at night, it’s your turn to share...',
            category: language === 'zh' ? '技能換宿' : 'Work Swap',
            path: '/services/work-swap',
            isHot: true
        }
    ];
};
