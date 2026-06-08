import { EXEMPLAR_TOPIC } from '../data/exemplarTopic'

interface WelcomeBannerProps {
  totalWords: number
  progress: number
  topic: string
}

export function WelcomeBanner({ totalWords, progress, topic }: WelcomeBannerProps) {
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
        <div className="stat-pill">
          <span className="stat-value">{totalWords}</span>
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
