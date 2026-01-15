
export interface NavItem {
    title: string;
    path: string;
}

const ABOUT_SUBMENU_ZH: NavItem[] = [
    { title: '故事誌', path: '/stories' },
    { title: '環境介紹', path: '/about/environment' },
    { title: '農作產品', path: '/products' },
    { title: '場地租借', path: '/about/rental' }
];

const ABOUT_SUBMENU_EN: NavItem[] = [
    { title: 'Stories', path: '/stories' },
    { title: 'Environment', path: '/about/environment' },
    { title: 'Farm Products', path: '/products' },
    { title: 'Venue Rental', path: '/about/rental' }
];

const VILLAGE_SUBMENU_ZH: NavItem[] = [
    { title: '觀光地圖', path: '/village/map' },
    { title: '活動體驗', path: '/village/activities' },
    { title: '住宿體驗', path: '/village/stay' },
    { title: '技能換宿', path: '/village/work-swap' }
];

const VILLAGE_SUBMENU_EN: NavItem[] = [
    { title: 'Tourist Map', path: '/village/map' },
    { title: 'Activities', path: '/village/activities' },
    { title: 'Homestay', path: '/village/stay' },
    { title: 'Work Swap', path: '/village/work-swap' }
];

export const getAboutSubmenu = (lang: 'zh' | 'en') => lang === 'zh' ? ABOUT_SUBMENU_ZH : ABOUT_SUBMENU_EN;
export const getVillageSubmenu = (lang: 'zh' | 'en') => lang === 'zh' ? VILLAGE_SUBMENU_ZH : VILLAGE_SUBMENU_EN;

// Backward compatibility
export const ABOUT_SUBMENU_ITEMS = ABOUT_SUBMENU_ZH;
export const VILLAGE_SUBMENU_ITEMS = VILLAGE_SUBMENU_ZH;
