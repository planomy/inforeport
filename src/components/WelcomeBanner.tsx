import { useEffect, useRef, useState } from 'react'
import { TARGET_WORD_COUNT } from '../data/sections'
import { clampWordTarget } from '../utils/wordTarget'
import { EXEMPLAR_TOPIC } from '../data/exemplarTopic'

interface WelcomeBannerProps {
  totalWords: number
  progress: number
  topic: string
  wordTarget: number
  onWordTargetChange: (target: number) => void
}

export function WelcomeBanner({
  totalWords,
  progress,
  topic,
  wordTarget,
  onWordTargetChange,
}: WelcomeBannerProps) {
  const [editingTarget, setEditingTarget] = useState(false)
  const [draftTarget, setDraftTarget] = useState(String(wordTarget))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editingTarget) setDraftTarget(String(wordTarget))
  }, [wordTarget, editingTarget])

  useEffect(() => {
    if (editingTarget) inputRef.current?.select()
  }, [editingTarget])

  const commitTarget = () => {
    const parsed = Number(draftTarget)
    const next = Number.isFinite(parsed) ? clampWordTarget(parsed) : wordTarget
    onWordTargetChange(next)
    setDraftTarget(String(next))
    setEditingTarget(false)
  }

  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <span className="welcome-badge">Year 5 · Information Reports</span>
        <h2>Ready to write your report?</h2>
        <p>
          Learn from the <strong>{EXEMPLAR_TOPIC}</strong> exemplar and write about your own
          renewable resource.
        </p>
      </div>
      <div className="welcome-stats">
        <div className="stat-pill stat-pill--words">
          <span className="stat-value">
            {totalWords}
            <span className="stat-target"> / </span>
            {editingTarget ? (
              <input
                ref={inputRef}
                type="number"
                className="stat-target-input"
                value={draftTarget}
                min={50}
                max={2000}
                aria-label="Word count target"
                onChange={(e) => setDraftTarget(e.target.value)}
                onBlur={commitTarget}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitTarget()
                  if (e.key === 'Escape') {
                    setDraftTarget(String(wordTarget))
                    setEditingTarget(false)
                  }
                }}
              />
            ) : (
              <button
                type="button"
                className="stat-target-btn"
                onClick={() => setEditingTarget(true)}
                title={`Word target (guide: ${TARGET_WORD_COUNT}). Click to change.`}
              >
                {wordTarget}
              </button>
            )}
          </span>
          <span className="stat-label">words</span>
        </div>
        <div className="stat-pill">
          <span className="stat-value">{progress}%</span>
          <span className="stat-label">done</span>
        </div>
        {topic && (
          <div className="stat-pill topic">
            <span className="stat-value">{topic}</span>
            <span className="stat-label">topic</span>
          </div>
        )}
      </div>
    </div>
  )
}
