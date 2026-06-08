import { SECTIONS, type HighlightType, type SectionId } from '../data/sections'

export interface ColoredSentence {
  text: string
  type: HighlightType
}

function splitOnPeriods(text: string): string[] {
  if (!text.trim()) return []

  const parts = text.trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g)
  if (!parts) return [text.trim()]

  return parts.map((part) => part.trim()).filter((part) => part.length > 0)
}

/** One highlight per grammatical sentence in the exemplar (comma parts grouped until a full stop). */
function getExemplarSentenceHighlights(sectionId: SectionId): HighlightType[] {
  const section = SECTIONS.find((s) => s.id === sectionId)
  if (!section) return []

  const highlights: HighlightType[] = []
  let groupHighlight: HighlightType | null = null

  for (const segment of section.exemplar) {
    if (!segment.highlight) continue
    if (!groupHighlight) groupHighlight = segment.highlight

    if (/[.!?]$/.test(segment.text.trim())) {
      highlights.push(groupHighlight)
      groupHighlight = null
    }
  }

  if (groupHighlight) highlights.push(groupHighlight)

  return highlights
}

function classifySentence(
  sectionId: SectionId,
  index: number,
  total: number
): HighlightType {
  const sequence = getExemplarSentenceHighlights(sectionId)

  if (sectionId === 'heading') return 'title'

  if (index < sequence.length) return sequence[index]

  if (index === total - 1 && sequence.length > 0) {
    return sequence[sequence.length - 1]
  }

  return 'fact'
}

export function classifySentences(sectionId: SectionId, text: string): ColoredSentence[] {
  if (sectionId === 'heading') {
    return text.trim() ? [{ text, type: 'title' }] : []
  }

  const sentences = splitOnPeriods(text)
  return sentences.map((sentence, index) => ({
    text: sentence,
    type: classifySentence(sectionId, index, sentences.length),
  }))
}
