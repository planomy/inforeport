import { TARGET_WORD_COUNT } from '../data/sections'

const STORAGE_KEY = 'inforeport-word-target'
const MIN_TARGET = 50
const MAX_TARGET = 2000

export function clampWordTarget(target: number): number {
  return Math.min(MAX_TARGET, Math.max(MIN_TARGET, Math.round(target)))
}

export function loadWordTarget(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return TARGET_WORD_COUNT
    const value = Number(raw)
    if (Number.isFinite(value)) return clampWordTarget(value)
  } catch {
    /* ignore */
  }
  return TARGET_WORD_COUNT
}

export function saveWordTarget(target: number): void {
  localStorage.setItem(STORAGE_KEY, String(clampWordTarget(target)))
}
