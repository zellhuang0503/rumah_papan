
export interface NavItem {
    title: string;
    path: string;
}

export const ABOUT_SUBMENU_ITEMS: NavItem[] = [
    { title: '故事誌', path: '/stories' },
    { title: '環境介紹', path: '/about/environment' },
    { title: '農作產品', path: '/products' },
    { title: '場地租借', path: '/about/rental' }
];

export const VILLAGE_SUBMENU_ITEMS: NavItem[] = [
    { title: '觀光地圖', path: '/village/map' },
    { title: '活動體驗', path: '/village/activities' },
    { title: '住宿體驗', path: '/village/stay' },
    { title: '技能換宿', path: '/village/work-swap' }
];
