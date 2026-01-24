# 資料結構定義 (Content_Schema.md)

這是 Headless CMS 的欄位清單，決定了後台如何輸入資料。

## Content Schemas

```yaml
content_schemas:
  story_post:
    fields:
      - title: { type: "I18n_String", required: true }
      - category: { type: "Enum", options: ["History", "Food", "Culture"] }
      - cover_image: { type: "Image", style: "Polaroid_Frame" }
      - body_text: { type: "I18n_Markdown", required: true }
      - tags: { type: "Array", ref: "Figma_Variables" }

  service_item:
    fields:
      - service_name: { type: "I18n_String" }
      - summary: { type: "I18n_Text" }
      - booking_link: { type: "URL", default: "Google_Forms_Link" }
      - thumbnail: { type: "Image" }

  variable_sync:
    source: "Mode 1.tokens.json"
    sync_fields: ["標題1", "副標1", "google_map_tags"]
```
