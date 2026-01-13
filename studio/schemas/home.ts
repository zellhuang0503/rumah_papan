import { defineType } from 'sanity'

export default defineType({
    name: 'home',
    title: '首頁',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: '頁面標題',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'heroImage',
            title: '主視覺圖片',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: '描述',
            type: 'text',
            rows: 4,
        },
        {
            name: 'content',
            title: '內容',
            type: 'array',
            of: [{ type: 'block' }],
        },
    ],
})
