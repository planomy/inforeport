import { useEffect, useRef } from 'react'
import { SECTIONS, type SectionId } from '../data/sections'
import { scrollToSection } from '../utils/scrollToSection'

interface GuidancePanelProps {
  activeSection: SectionId
  onInsertStarter: (starter: string) => void
  sectionWordCounts: Record<SectionId, number>
}

export function GuidancePanel({
  activeSection,
  onInsertStarter,
  sectionWordCounts,
}: GuidancePanelProps) {
  const section = SECTIONS.find((s) => s.id === activeSection)!
  const words = sectionWordCounts[activeSection]
  const metMin = section.id === 'heading' ? words >= 2 : words >= section.minWords
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToSection(scrollRef.current, activeSection, 'top')
  }, [activeSection])

  return (
    <section className="panel guidance-panel card-panel">
      <header className="panel-header">
        <span className="panel-badge">Your Guide</span>
        <h2>How to Write This Part</h2>
        <p className="panel-subtitle">
          Tips, sentence starters, and a checklist for this section.
        </p>
      </header>

      <div className="panel-body">
        <div
          ref={scrollRef}
          className="panel-scroll guidance-content"
          data-section-id={activeSection}
          style={{ '--section-color': section.color } as React.CSSProperties}
        >
        <div className="guidance-header">
          <span className="guidance-icon">{section.icon}</span>
          <div>
            <h3>{section.label}</h3>
            <p className="structure-tag">{section.structureLabel}</p>
          </div>
          {section.id !== 'heading' && (
            <span className={`word-target ${metMin ? 'done' : ''}`}>
              {words} / {section.minWords} words
            </span>
          )}
        </div>

        <div className="guidance-block">
          <h4>Purpose</h4>
          <p>{section.guidance.purpose}</p>
        </div>

        <div className="guidance-block">
          <h4>What to Include</h4>
          <ul>
            {section.guidance.whatToInclude.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="guidance-block tips">
          <h4>Writing Tips</h4>
          <ul>
            {section.guidance.writingTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        {section.guidance.sentenceStarters.length > 0 && (
          <div className="guidance-block starters">
            <h4>Sentence Starters</h4>
            <ul>
              {section.guidance.sentenceStarters.map((starter, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className="starter-btn"
                    onClick={() => onInsertStarter(starter)}
                    title="Click to add to your writing"
                  >
                    <code>{starter}</code>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="guidance-block checklist">
          <h4>Checklist</h4>
          <ul>
            {section.guidance.checklist.map((item, i) => (
              <li key={i}>
                <span className="check-box" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </section>
  )
}
