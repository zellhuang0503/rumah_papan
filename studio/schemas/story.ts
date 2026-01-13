import { defineType } from 'sanity'

export default defineType({
    name: 'story',
    title: '故事',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: '故事標題',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'URL 路徑',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'author',
            title: '作者',
            type: 'string',
        },
        {
            name: 'publishedAt',
            title: '發布日期',
            type: 'datetime',
        },
        {
            name: 'coverImage',
            title: '封面圖片',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'excerpt',
            title: '摘要',
            type: 'text',
            rows: 3,
        },
        {
            name: 'content',
            title: '內容',
            type: 'array',
            of: [{ type: 'block' }],
        },
    ],
})
