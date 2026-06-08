import { useEffect, useRef } from 'react'
import { SECTIONS, type SectionId } from '../data/sections'
import { scrollToSection } from '../utils/scrollToSection'

interface EditorPanelProps {
  content: Record<SectionId, string>
  activeSection: SectionId
  onSectionSelect: (id: SectionId) => void
  onChange: (id: SectionId, value: string) => void
  totalWords: number
  lastSaved: Date | null
}

export function EditorPanel({
  content,
  activeSection,
  onSectionSelect,
  onChange,
  totalWords,
  lastSaved,
}: EditorPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToSection(scrollRef.current, activeSection)
  }, [activeSection])

  return (
    <section className="panel editor-panel card-panel">
      <header className="panel-header">
        <span className="panel-badge accent">Your Report</span>
        <h2>Write Here</h2>
        <p className="panel-subtitle panel-subtitle-row">
          <span>Write each section below — your work saves automatically.</span>
          <span className="editor-stats">
            <span className="word-count">
              <strong>{totalWords}</strong> words
            </span>
            {lastSaved && (
              <span className="save-indicator">
                Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </span>
        </p>
      </header>

      <div className="panel-body">
        <div className="panel-scroll editor-sections" ref={scrollRef}>
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              data-section-id={section.id}
              className={`editor-section ${activeSection === section.id ? 'active' : ''}`}
              style={{ '--section-color': section.color } as React.CSSProperties}
            >
              <label htmlFor={`editor-${section.id}`}>
                <span className="editor-label-icon">{section.icon}</span>
                <span>
                  <strong>{section.label}</strong>
                  <small>{section.structureLabel}</small>
                </span>
                <button
                  type="button"
                  className="focus-btn"
                  onClick={() => onSectionSelect(section.id)}
                >
                  Guide me
                </button>
              </label>
              {section.id === 'heading' ? (
                <input
                  id={`editor-${section.id}`}
                  type="text"
                  className="heading-input"
                  placeholder={section.placeholder}
                  value={content[section.id]}
                  onChange={(e) => onChange(section.id, e.target.value)}
                  onFocus={() => onSectionSelect(section.id)}
                />
              ) : (
                <textarea
                  id={`editor-${section.id}`}
                  rows={section.id === 'conclusion' ? 4 : 6}
                  placeholder={section.placeholder}
                  value={content[section.id]}
                  onChange={(e) => onChange(section.id, e.target.value)}
                  onFocus={() => onSectionSelect(section.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
