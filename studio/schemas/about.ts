import { defineType } from 'sanity'

export default defineType({
    name: 'about',
    title: '關於我們',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: '標題',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'content',
            title: '內容',
            type: 'array',
            of: [{ type: 'block' }],
        },
    ],
})
