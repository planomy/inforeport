import { FONT_SIZE_LEVELS } from '../utils/fontSize'

interface FontSizeControlProps {
  level: number
  onIncrease: () => void
  onDecrease: () => void
}

export function FontSizeControl({ level, onIncrease, onDecrease }: FontSizeControlProps) {
  const atMin = level <= 0
  const atMax = level >= FONT_SIZE_LEVELS.length - 1

  return (
    <div className="font-size-control" aria-label="Text size">
      <span className="font-size-label">Text size</span>
      <div className="font-size-buttons">
        <button
          type="button"
          className="font-size-btn"
          onClick={onDecrease}
          disabled={atMin}
          aria-label="Make text smaller"
        >
          A−
        </button>
        <button
          type="button"
          className="font-size-btn"
          onClick={onIncrease}
          disabled={atMax}
          aria-label="Make text larger"
        >
          A+
        </button>
      </div>
    </div>
  )
}
