# UI 組件與交互規範 (UI_Components.md)

具體描述前端組件的行為與視覺細節。

## Component Specs

### 1. Polaroid Card (polaroid_card)
| Attribute | Value |
| :--- | :--- |
| **Background Color** | `var(--primary-cream)` |
| **Border Style** | Solid white frame effect |
| **Interaction (Hover)** | Scale 1.05 & Increase z-index |
| **Interaction (Tilt)** | Random rotation between -3deg to 3deg |
| **Caption Style** | Handwriting or Noto Sans TC italic |

### 2. Content Reader (content_reader)
| Attribute | Value |
| :--- | :--- |
| **Max Width** | `800px` |
| **Line Height (ZH)** | `1.8` |
| **Line Height (EN)** | `1.6` |
| **Background Color** | `var(--primary-cream)` |
| **Text Color** | `var(--neutral-black)` |

### 3. Multi-language Switcher (multi_language_switcher)
| Attribute | Value |
| :--- | :--- |
| **Position** | Sticky Navbar |
| **Logic** | State-based toggle without page reload |
