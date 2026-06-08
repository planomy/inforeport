function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export function countTotalWords(sections: Record<string, string>): number {
  return Object.values(sections).reduce((sum, text) => sum + countWords(text), 0)
}

export function countSectionWords(text: string): number {
  return countWords(text)
}
