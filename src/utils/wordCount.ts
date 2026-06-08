function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export function countTotalWords(sections: Record<string, string>): number {
  return Object.values(sections).reduce((sum, text) => sum + countWords(text), 0)
}

export function countSectionWords(text: string): number {
  return countWords(text)
}

export type WordRangeStatus = 'empty' | 'short' | 'ok' | 'long'

export function getWordRangeStatus(
  count: number,
  min: number,
  max: number
): WordRangeStatus {
  if (count === 0) return 'empty'
  if (count > max) return 'long'
  if (count < min) return 'short'
  return 'ok'
}
