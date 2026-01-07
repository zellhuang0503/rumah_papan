export type I18nString = {
    zh: string;
    en: string;
};

export type StoryCategory = 'History' | 'Food' | 'Culture';

export interface StoryPost {
    title: I18nString;
    category: StoryCategory;
    cover_image: string; // URL
    body_text: I18nString; // Markdown content
    tags: string[]; // references Figma Variables
}

export interface ServiceItem {
    service_name: I18nString;
    summary: I18nString;
    booking_link: string;
    thumbnail: string;
}

// Placeholder for Supabase Database types
// TODO: Generate this using Supabase CLI
export type Database = any;
