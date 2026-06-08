import type { SectionId } from '../data/sections'

const SPACER_CLASS = 'scroll-end-spacer'

function getOrCreateSpacer(container: HTMLElement): HTMLElement {
  let spacer = container.querySelector(`.${SPACER_CLASS}`) as HTMLElement | null
  if (!spacer) {
    spacer = document.createElement('div')
    spacer.className = SPACER_CLASS
    spacer.setAttribute('aria-hidden', 'true')
    container.appendChild(spacer)
  }
  return spacer
}

function scrollOffsetTop(container: HTMLElement, el: HTMLElement): number {
  return el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
}

function ensureScrollRoom(container: HTMLElement, el: HTMLElement): void {
  const spacer = getOrCreateSpacer(container)
  spacer.style.height = '0px'

  const targetTop = scrollOffsetTop(container, el)
  const maxScrollTop = container.scrollHeight - container.clientHeight
  const extra = targetTop - maxScrollTop

  if (extra > 0) {
    spacer.style.height = `${extra + 8}px`
  }
}

export function scrollToSection(
  container: HTMLElement | null,
  sectionId: SectionId,
  mode: 'section' | 'top' = 'section'
) {
  if (!container) return

  if (mode === 'top') {
    container.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const el = container.querySelector(`[data-section-id="${sectionId}"]`) as HTMLElement | null
  if (!el) return

  ensureScrollRoom(container, el)

  requestAnimationFrame(() => {
    const top = scrollOffsetTop(container, el)
    container.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  })
}
