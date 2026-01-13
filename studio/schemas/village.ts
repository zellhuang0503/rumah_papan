import { defineType } from 'sanity'

export default defineType({
    name: 'village',
    title: '村落',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: '村落名稱',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'URL 路徑',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: '村落圖片',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: '描述',
            type: 'text',
            rows: 3,
        },
        {
            name: 'content',
            title: '詳細內容',
            type: 'array',
            of: [{ type: 'block' }],
        },
    ],
})
