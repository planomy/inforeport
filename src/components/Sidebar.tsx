import { SECTIONS, type SectionId } from '../data/sections'

interface SidebarProps {
  activeSection: SectionId
  onSectionSelect: (id: SectionId) => void
  sectionWordCounts: Record<SectionId, number>
  progress: number
  onSave: () => void
  onCopy: () => void
  onDownload: () => void
  onPrint: () => void
  onClear: () => void
  copyStatus: 'idle' | 'copied' | 'error'
  saveStatus: 'idle' | 'saved' | 'cancelled'
}

export function Sidebar({
  activeSection,
  onSectionSelect,
  sectionWordCounts,
  progress,
  onSave,
  onCopy,
  onDownload,
  onPrint,
  onClear,
  copyStatus,
  saveStatus,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden="true">
            <rect x="6" y="4" width="28" height="32" rx="6" fill="white" opacity="0.2" />
            <rect x="11" y="10" width="18" height="3" rx="1.5" fill="white" />
            <rect x="11" y="16" width="18" height="2" rx="1" fill="white" opacity="0.7" />
            <rect x="11" y="20" width="14" height="2" rx="1" fill="white" opacity="0.7" />
            <rect x="11" y="24" width="16" height="2" rx="1" fill="white" opacity="0.7" />
            <rect x="11" y="28" width="10" height="2" rx="1" fill="white" opacity="0.7" />
          </svg>
        </div>
        <span className="logo-text">InfoReport</span>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-label">Sections</p>
        {SECTIONS.map((s) => {
          const words = sectionWordCounts[s.id]
          const done = s.id === 'heading' ? words >= 2 : words >= s.minWords
          return (
            <button
              key={s.id}
              className={`sidebar-nav-item ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => onSectionSelect(s.id)}
            >
              <span className="sidebar-nav-icon">{s.icon}</span>
              <span className="sidebar-nav-label">
                <strong>{s.label}</strong>
                <small>{s.structureLabel}</small>
              </span>
              {done && <span className="sidebar-check">✓</span>}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-progress">
        <div className="sidebar-progress-ring">
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeDasharray={`${(progress / 100) * 97.4} 97.4`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <span>{progress}%</span>
        </div>
        <p>Report progress</p>
      </div>

      <div className="sidebar-actions">
        <p className="sidebar-label">Actions</p>
        <button className="sidebar-action primary" onClick={onSave}>
          {saveStatus === 'saved'
            ? '✓ Saved'
            : saveStatus === 'cancelled'
              ? 'Cancelled'
              : 'Save'}
        </button>
        <button className="sidebar-action" onClick={onCopy}>
          {copyStatus === 'copied' ? '✓ Copied' : copyStatus === 'error' ? 'Failed' : 'Copy'}
        </button>
        <button className="sidebar-action" onClick={onDownload}>Download</button>
        <button className="sidebar-action" onClick={onPrint}>Print</button>
        <button className="sidebar-action danger" onClick={onClear}>Clear</button>
      </div>
    </aside>
  )
}
