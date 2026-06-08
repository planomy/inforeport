import { SECTIONS } from '../data/sections'
import type { DraftContent } from './storage'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function formatReportAsWordDoc(content: DraftContent): string {
  const title = content.heading.trim() || 'Information Report'

  const sections = SECTIONS.filter((s) => s.id !== 'heading')
    .map((s) => {
      const text = content[s.id]?.trim()
      if (!text) return ''
      const body = escapeHtml(text).replace(/\n/g, '<br>')
      return `<h2>${escapeHtml(s.structureLabel)}</h2><p>${body}</p>`
    })
    .filter(Boolean)
    .join('')

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<!--[if gte mso 9]><xml>
<w:WordDocument><w:View>Print</w:View></w:WordDocument>
</xml><![endif]-->
<style>
  body { font-family: Georgia, serif; line-height: 1.7; color: #1a1a1a; }
  h1 { text-align: center; margin-bottom: 2rem; }
  h2 { font-size: 11pt; text-transform: uppercase; letter-spacing: 0.05em; color: #666; margin-top: 1.5rem; }
  p { margin: 0 0 1rem; }
</style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  ${sections}
</body>
</html>`
}
