import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ExemplarPanel } from './components/ExemplarPanel'
import { GuidancePanel } from './components/GuidancePanel'
import { EditorPanel } from './components/EditorPanel'
import { FontSizeControl } from './components/FontSizeControl'
import { Sidebar } from './components/Sidebar'
import { ThemeToggle } from './components/ThemeToggle'
import { WelcomeBanner } from './components/WelcomeBanner'
import { SystemMessage } from './components/SystemMessage'
import { useSystemMessage } from './hooks/useSystemMessage'
import { getInitialTheme, saveTheme, type Theme } from './utils/theme'
import {
  getFontScale,
  loadFontSizeLevel,
  saveFontSizeLevel,
  FONT_SIZE_LEVELS,
} from './utils/fontSize'
import { loadWordTarget, saveWordTarget } from './utils/wordTarget'
import { SECTIONS, type SectionId } from './data/sections'
import { countSectionWords, countTotalWords } from './utils/wordCount'
import { formatReportAsWordDoc } from './utils/formatWordDoc'
import { getDefaultReportFilename, saveReportToDevice } from './utils/saveReport'
import {
  clearDraft,
  formatReport,
  loadDraft,
  saveDraft,
  type DraftContent,
} from './utils/storage'
import './App.css'

const EMPTY_CONTENT: DraftContent = {
  heading: '',
  introduction: '',
  paragraph1: '',
  paragraph2: '',
  paragraph3: '',
  conclusion: '',
}

const SECTION_LABELS = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s.label])
) as Record<SectionId, string>

function App() {
  const [content, setContent] = useState<DraftContent>(() => loadDraft() ?? EMPTY_CONTENT)
  const [activeSection, setActiveSection] = useState<SectionId>('introduction')
  const isFirstContentRender = useRef(true)
  const { message, showMessage, showConfirm, dismiss } = useSystemMessage()
  const [fontSizeLevel, setFontSizeLevel] = useState(() => loadFontSizeLevel())
  const [wordTarget, setWordTarget] = useState(() => loadWordTarget())
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  const fontScale = getFontScale(fontSizeLevel)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    saveTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  const increaseFontSize = () => {
    setFontSizeLevel((level) => Math.min(level + 1, FONT_SIZE_LEVELS.length - 1))
  }

  const decreaseFontSize = () => {
    setFontSizeLevel((level) => Math.max(level - 1, 0))
  }

  useEffect(() => {
    saveFontSizeLevel(fontSizeLevel)
  }, [fontSizeLevel])

  useEffect(() => {
    saveWordTarget(wordTarget)
  }, [wordTarget])

  const totalWords = useMemo(() => countTotalWords(content), [content])

  const sectionWordCounts = useMemo(
    () =>
      Object.fromEntries(
        SECTIONS.map((s) => [s.id, countSectionWords(content[s.id])])
      ) as Record<SectionId, number>,
    [content]
  )

  const progress = useMemo(() => {
    if (wordTarget <= 0) return 0
    return Math.min(100, Math.round((totalWords / wordTarget) * 100))
  }, [totalWords, wordTarget])

  const handleChange = useCallback((id: SectionId, value: string) => {
    setContent((prev) => ({ ...prev, [id]: value }))
  }, [])

  const handleInsertStarter = useCallback(
    (starter: string) => {
      setContent((prev) => {
        const current = prev[activeSection]
        const addition = current.trim() ? `\n${starter}` : starter
        return { ...prev, [activeSection]: current + addition }
      })
    },
    [activeSection]
  )

  useEffect(() => {
    if (isFirstContentRender.current) {
      isFirstContentRender.current = false
      return
    }

    const timer = setTimeout(() => {
      saveDraft(content)
    }, 1500)

    return () => clearTimeout(timer)
  }, [content])

  useEffect(() => {
    const saveOnExit = () => saveDraft(content)
    window.addEventListener('beforeunload', saveOnExit)
    return () => window.removeEventListener('beforeunload', saveOnExit)
  }, [content])

  const handleSave = async () => {
    const report = formatReportAsWordDoc(content)
    const filename = getDefaultReportFilename(content.heading)

    const result = await saveReportToDevice(filename, report)

    if (result === 'cancelled') {
      showMessage('Save cancelled', 'info')
      return
    }

    saveDraft(content)
    showMessage('Report saved', 'success', {
      detail: 'Your Word document was saved to your device.',
    })
  }

  const handleCopy = async () => {
    const report = formatReport(content, SECTION_LABELS)
    try {
      await navigator.clipboard.writeText(report)
      showMessage('Copied to clipboard', 'success', {
        detail: 'You can paste your report into another app.',
      })
    } catch {
      showMessage('Could not copy', 'error', {
        detail: 'Try selecting the text and copying manually.',
      })
    }
  }

  const handleDownload = async () => {
    const report = formatReportAsWordDoc(content)
    const result = await saveReportToDevice(getDefaultReportFilename(content.heading), report)

    if (result === 'cancelled') {
      showMessage('Download cancelled', 'info')
      return
    }

    showMessage('Report downloaded', 'success', {
      detail: 'Your Word document was saved to your device.',
    })
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${content.heading || 'Information Report'}</title>
          <style>
            body { font-family: Georgia, serif; max-width: 700px; margin: 2rem auto; line-height: 1.7; color: #1a1a1a; }
            h1 { text-align: center; margin-bottom: 2rem; }
            h2 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: #666; margin-top: 1.5rem; }
            p { margin: 0 0 1rem; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>${content.heading || 'Information Report'}</h1>
          ${SECTIONS.filter((s) => s.id !== 'heading')
            .map((s) => {
              const text = content[s.id].trim()
              if (!text) return ''
              return `<h2>${s.structureLabel}</h2><p>${text}</p>`
            })
            .join('')}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleClear = () => {
    showConfirm('Clear your whole report?', {
      detail: 'This cannot be undone, but you can always start again.',
      confirmLabel: 'Clear report',
      cancelLabel: 'Keep writing',
      onConfirm: () => {
        setContent(EMPTY_CONTENT)
        clearDraft()
        showMessage('Report cleared', 'info', {
          detail: 'Start fresh whenever you are ready.',
        })
      },
    })
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onSectionSelect={setActiveSection}
        sectionWordCounts={sectionWordCounts}
        progress={progress}
        onSave={handleSave}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onPrint={handlePrint}
        onClear={handleClear}
      />

      <div className="main-area">
        <header className="top-header">
          <div className="header-search">
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Renewable Resources · Information Report</span>
          </div>
          <FontSizeControl
            level={fontSizeLevel}
            onIncrease={increaseFontSize}
            onDecrease={decreaseFontSize}
          />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <div className="header-profile">
            <div className="profile-avatar">Y5</div>
            <div>
              <strong>Student Writer</strong>
              <span>Year 5 English</span>
            </div>
          </div>
        </header>

        <WelcomeBanner
          totalWords={totalWords}
          progress={progress}
          topic={content.heading.trim()}
          wordTarget={wordTarget}
          onWordTargetChange={setWordTarget}
        />

        <main
          className="workspace"
          style={{ '--font-scale': fontScale } as React.CSSProperties}
        >
          <ExemplarPanel
            activeSection={activeSection}
            onSectionSelect={setActiveSection}
          />
          <GuidancePanel
            activeSection={activeSection}
            onInsertStarter={handleInsertStarter}
            sectionWordCounts={sectionWordCounts}
          />
          <EditorPanel
            content={content}
            activeSection={activeSection}
            onSectionSelect={setActiveSection}
            onChange={handleChange}
            totalWords={totalWords}
            sectionWordCounts={sectionWordCounts}
          />
        </main>

        <footer className="app-footer">
          <p>Created by Mr C 2026</p>
        </footer>
      </div>

      {message && <SystemMessage message={message} onDismiss={dismiss} />}
    </div>
  )
}

export default App
