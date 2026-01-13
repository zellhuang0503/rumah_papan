import { defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: '網站設定',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: '網站標題',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: '網站描述',
            type: 'text',
            rows: 3,
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'contactEmail',
            title: '聯絡信箱',
            type: 'string',
        },
        {
            name: 'socialLinks',
            title: '社群連結',
            type: 'object',
            fields: [
                {
                    name: 'facebook',
                    title: 'Facebook',
                    type: 'url',
                },
                {
                    name: 'instagram',
                    title: 'Instagram',
                    type: 'url',
                },
                {
                    name: 'youtube',
                    title: 'YouTube',
                    type: 'url',
                },
            ],
        },
    ],
})
