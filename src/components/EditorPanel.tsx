import { useEffect, useRef } from 'react'
import { SECTIONS, type SectionId } from '../data/sections'
import { getWordRangeStatus } from '../utils/wordCount'
import { scrollToSection } from '../utils/scrollToSection'
import { ColoredSentenceEditor } from './ColoredSentenceEditor'

interface EditorPanelProps {
  content: Record<SectionId, string>
  activeSection: SectionId
  onSectionSelect: (id: SectionId) => void
  onChange: (id: SectionId, value: string) => void
  totalWords: number
  sectionWordCounts: Record<SectionId, number>
}

export function EditorPanel({
  content,
  activeSection,
  onSectionSelect,
  onChange,
  totalWords,
  sectionWordCounts,
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
          <span>
            Sentence colours match the exemplar — hover a sentence to see its type.
          </span>
          <span className="editor-stats">
            <span className="word-count">
              <strong>{totalWords}</strong> words
            </span>
          </span>
        </p>
      </header>

      <div className="panel-body">
        <div className="panel-scroll editor-sections" ref={scrollRef}>
          {SECTIONS.map((section) => {
            const words = sectionWordCounts[section.id]
            const rangeStatus = getWordRangeStatus(words, section.minWords, section.maxWords)

            return (
              <div
                key={section.id}
                data-section-id={section.id}
                className={`editor-section ${activeSection === section.id ? 'active' : ''} ${rangeStatus === 'long' ? 'editor-section--long' : ''} ${rangeStatus === 'ok' ? 'editor-section--ok' : ''}`}
                style={{ '--section-color': section.color } as React.CSSProperties}
              >
                <label htmlFor={`editor-${section.id}`}>
                  <span className="editor-label-icon">{section.icon}</span>
                  <span>
                    <strong>{section.label}</strong>
                    <small>{section.structureLabel}</small>
                  </span>
                  <span className={`section-word-range section-word-range--${rangeStatus}`}>
                    {words} / {section.minWords}–{section.maxWords} words
                  </span>
                  <button
                    type="button"
                    className="focus-btn"
                    onClick={() => onSectionSelect(section.id)}
                  >
                    Guide me
                  </button>
                </label>
                {rangeStatus === 'long' && (
                  <p className="section-word-warning" role="status">
                    Too long — try to keep this section under {section.maxWords} words
                  </p>
                )}
                <ColoredSentenceEditor
                  id={`editor-${section.id}`}
                  sectionId={section.id}
                  variant={section.id === 'heading' ? 'title' : 'textarea'}
                  rows={section.id === 'conclusion' ? 4 : 6}
                  placeholder={section.placeholder}
                  value={content[section.id]}
                  onChange={(value) => onChange(section.id, value)}
                  onFocus={() => onSectionSelect(section.id)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
