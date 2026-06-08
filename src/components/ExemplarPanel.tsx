import { useEffect, useRef, useState } from 'react'
import { SECTIONS, HIGHLIGHT_LABELS, type SectionId, type HighlightType } from '../data/sections'
import { EXEMPLAR_TOPIC } from '../data/exemplarTopic'
import { scrollToSection } from '../utils/scrollToSection'

interface ExemplarPanelProps {
  activeSection: SectionId
  onSectionSelect: (id: SectionId) => void
}

interface PopupState {
  title: string
  body: string
  type: HighlightType
  color: string
  x: number
  y: number
}

const HIGHLIGHT_COLORS: Record<HighlightType, string> = {
  title: '#7C3AED',
  'topic-sentence': '#2563EB',
  definition: '#2563EB',
  technical: '#059669',
  connective: '#D97706',
  fact: '#0891B2',
  comparison: '#9333EA',
  example: '#0891B2',
  summary: '#DB2777',
}

export function ExemplarPanel({ activeSection, onSectionSelect }: ExemplarPanelProps) {
  const [popup, setPopup] = useState<PopupState | null>(null)
  const [pinned, setPinned] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    scrollToSection(scrollRef.current, activeSection)
    setPopup(null)
    setPinned(false)
  }, [activeSection])

  const openPopup = (
    target: HTMLElement,
    title: string,
    body: string,
    type: HighlightType
  ) => {
    const rect = target.getBoundingClientRect()
    const x = Math.min(
      Math.max(rect.left + rect.width / 2, 150),
      window.innerWidth - 150
    )
    const y = rect.bottom + 10

    setPopup({
      title,
      body,
      type,
      color: HIGHLIGHT_COLORS[type],
      x,
      y,
    })
  }

  const handleHighlightEnter = (
    e: React.MouseEvent<HTMLElement>,
    title: string,
    body: string,
    type: HighlightType
  ) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    if (!pinned) openPopup(e.currentTarget, title, body, type)
  }

  const handleHighlightLeave = () => {
    if (pinned) return
    hideTimer.current = setTimeout(() => setPopup(null), 150)
  }

  const handleHighlightClick = (
    e: React.MouseEvent<HTMLElement>,
    title: string,
    body: string,
    type: HighlightType
  ) => {
    e.stopPropagation()
    if (hideTimer.current) clearTimeout(hideTimer.current)
    openPopup(e.currentTarget, title, body, type)
    setPinned(true)
  }

  const dismissPopup = () => {
    setPopup(null)
    setPinned(false)
  }

  return (
    <section className="panel exemplar-panel card-panel">
      <header className="panel-header">
        <span className="panel-badge">Exemplar</span>
        <h2>{EXEMPLAR_TOPIC}</h2>
        <p className="panel-subtitle">
          Hover or click any coloured text to see what that part does.
        </p>
      </header>

      <div className="panel-body">
        <div className="panel-scroll exemplar-body" ref={scrollRef}>
          {SECTIONS.map((section) => (
            <article
              key={section.id}
              data-section-id={section.id}
              className={`exemplar-section ${activeSection === section.id ? 'active' : ''}`}
              style={{ '--section-color': section.color } as React.CSSProperties}
              onClick={() => onSectionSelect(section.id)}
            >
              <div className="exemplar-section-label">
                <span className="section-icon">{section.icon}</span>
                <div>
                  <strong>{section.label}</strong>
                  <span>{section.structureLabel}</span>
                </div>
              </div>

              <div className="exemplar-text">
                {section.exemplar.map((segment, i) =>
                  segment.highlight && segment.popup ? (
                    <mark
                      key={i}
                      className="highlight"
                      style={{ '--hl-color': HIGHLIGHT_COLORS[segment.highlight] } as React.CSSProperties}
                      onMouseEnter={(e) =>
                        handleHighlightEnter(
                          e,
                          segment.popup!.title,
                          segment.popup!.body,
                          segment.highlight!
                        )
                      }
                      onMouseLeave={handleHighlightLeave}
                      onClick={(e) =>
                        handleHighlightClick(
                          e,
                          segment.popup!.title,
                          segment.popup!.body,
                          segment.highlight!
                        )
                      }
                    >
                      {segment.text}
                    </mark>
                  ) : (
                    <span key={i}>{segment.text}</span>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {popup && (
        <>
          {pinned && <div className="popup-backdrop" onClick={dismissPopup} />}
          <div
            className={`highlight-popup ${pinned ? 'pinned' : ''}`}
            style={{ left: popup.x, top: popup.y, '--hl-color': popup.color } as React.CSSProperties}
            onMouseEnter={() => {
              if (hideTimer.current) clearTimeout(hideTimer.current)
            }}
            onMouseLeave={handleHighlightLeave}
          >
            <span className="popup-type-badge">{HIGHLIGHT_LABELS[popup.type]}</span>
            <div className="popup-body">
              <h4>{popup.title}</h4>
              <p>{popup.body}</p>
            </div>
            {pinned && (
              <button className="popup-close" onClick={dismissPopup} aria-label="Close">
                ×
              </button>
            )}
          </div>
        </>
      )}
    </section>
  )
}
