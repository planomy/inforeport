import type { SectionId } from '../data/sections'

const STORAGE_KEY = 'inforeport-draft'

export type DraftContent = Record<SectionId, string>

export function loadDraft(): DraftContent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as DraftContent
  } catch {
    return null
  }
}

export function saveDraft(content: DraftContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}

export function clearDraft(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function formatReport(
  content: DraftContent,
  labels: Record<SectionId, string>
): string {
  const order: SectionId[] = [
    'heading',
    'introduction',
    'paragraph1',
    'paragraph2',
    'paragraph3',
    'conclusion',
  ]

  return order
    .map((id) => {
      const text = content[id]?.trim()
      if (!text) return ''
      if (id === 'heading') return `${text}\n\n`
      return `${labels[id]}\n${text}\n\n`
    })
    .filter(Boolean)
    .join('')
    .trim()
}
