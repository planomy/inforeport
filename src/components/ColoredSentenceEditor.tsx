import { useLayoutEffect, useMemo, useRef } from 'react'
import { HIGHLIGHT_LABELS, type SectionId } from '../data/sections'
import { classifySentences } from '../utils/classifySentences'
import { HIGHLIGHT_COLORS } from '../utils/highlightColors'

interface ColoredSentenceEditorProps {
  id: string
  sectionId: SectionId
  value: string
  placeholder?: string
  rows?: number
  onChange: (value: string) => void
  onFocus?: () => void
  variant?: 'textarea' | 'title'
}

export function ColoredSentenceEditor({
  id,
  sectionId,
  value,
  placeholder,
  rows = 6,
  onChange,
  onFocus,
  variant = 'textarea',
}: ColoredSentenceEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mirrorRef = useRef<HTMLDivElement>(null)

  const sentences = useMemo(() => classifySentences(sectionId, value), [sectionId, value])

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    const mirror = mirrorRef.current
    if (!textarea || variant !== 'textarea') return

    const resize = () => {
      textarea.style.height = 'auto'
      const contentHeight = Math.max(textarea.scrollHeight, mirror?.scrollHeight ?? 0)
      textarea.style.height = `${contentHeight}px`
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(textarea)
    if (mirror) observer.observe(mirror)

    return () => observer.disconnect()
  }, [value, variant, rows, sentences])

  const syncScroll = () => {
    const field = textareaRef.current
    const mirror = mirrorRef.current
    if (field && mirror) mirror.scrollTop = field.scrollTop
  }

  const mirrorContent =
    sentences.length > 0 ? (
      sentences.map((sentence, index) => {
        const needsSpace =
          index < sentences.length - 1 &&
          !sentence.text.endsWith(' ') &&
          !sentences[index + 1]?.text.startsWith(' ')

        return (
          <mark
            key={`${index}-${sentence.text.slice(0, 12)}`}
            className="editor-sentence-highlight"
            style={{ '--hl-color': HIGHLIGHT_COLORS[sentence.type] } as React.CSSProperties}
            title={HIGHLIGHT_LABELS[sentence.type]}
          >
            {sentence.text}
            {needsSpace ? ' ' : ''}
          </mark>
        )
      })
    ) : (
      <span className="colored-editor-placeholder">{placeholder}</span>
    )

  const inputClass =
    variant === 'title' ? 'colored-editor-input heading-input' : 'colored-editor-input'

  return (
    <div
      className={`colored-editor ${variant === 'title' ? 'colored-editor--title' : ''}`}
      style={
        variant === 'textarea'
          ? ({ '--editor-min-rows': rows } as React.CSSProperties)
          : undefined
      }
    >
      <div ref={mirrorRef} className="colored-editor-mirror" aria-hidden="true">
        {mirrorContent}
      </div>
      {variant === 'title' ? (
        <input
          id={id}
          type="text"
          className={inputClass}
          value={value}
          aria-label={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          spellCheck
        />
      ) : (
        <textarea
          ref={textareaRef}
          id={id}
          className={inputClass}
          value={value}
          aria-label={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onScroll={syncScroll}
          spellCheck
        />
      )}
    </div>
  )
}
