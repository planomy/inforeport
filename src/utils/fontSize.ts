const STORAGE_KEY = 'inforeport-font-size'

export const FONT_SIZE_LEVELS = [0.9, 1, 1.1, 1.2, 1.3] as const

export const DEFAULT_FONT_SIZE_LEVEL = 1

export function loadFontSizeLevel(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return DEFAULT_FONT_SIZE_LEVEL
    const level = Number(raw)
    if (level >= 0 && level < FONT_SIZE_LEVELS.length) return level
  } catch {
    /* ignore */
  }
  return DEFAULT_FONT_SIZE_LEVEL
}

export function saveFontSizeLevel(level: number): void {
  localStorage.setItem(STORAGE_KEY, String(level))
}

export function getFontScale(level: number): number {
  return FONT_SIZE_LEVELS[Math.min(Math.max(level, 0), FONT_SIZE_LEVELS.length - 1)]
}
