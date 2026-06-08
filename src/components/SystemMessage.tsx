import type { SystemMessageData } from '../hooks/useSystemMessage'

const TYPE_ICONS: Record<SystemMessageData['type'], string> = {
  info: 'ℹ',
  success: '✓',
  error: '!',
  loading: '…',
  confirm: '?',
}

interface SystemMessageProps {
  message: SystemMessageData
  onDismiss: () => void
}

export function SystemMessage({ message, onDismiss }: SystemMessageProps) {
  const isConfirm = message.type === 'confirm'

  const handleConfirm = () => {
    message.onConfirm?.()
    onDismiss()
  }

  const handleCancel = () => {
    message.onCancel?.()
    onDismiss()
  }

  return (
    <div
      className="system-message-layer"
      role={isConfirm ? 'alertdialog' : 'status'}
      aria-live="polite"
      aria-label={message.title}
    >
      <div className="system-message-backdrop" onClick={isConfirm ? undefined : onDismiss} />
      <div className={`system-message-card system-message-card--${message.type}`}>
        <div className="system-message-icon" aria-hidden="true">
          {TYPE_ICONS[message.type]}
        </div>
        <div className="system-message-body">
          <h3 className="system-message-title">{message.title}</h3>
          {message.detail && <p className="system-message-detail">{message.detail}</p>}
        </div>
        {isConfirm ? (
          <div className="system-message-actions">
            <button type="button" className="system-message-btn" onClick={handleCancel}>
              {message.cancelLabel}
            </button>
            <button
              type="button"
              className="system-message-btn system-message-btn--primary"
              onClick={handleConfirm}
            >
              {message.confirmLabel}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="system-message-close"
            onClick={onDismiss}
            aria-label="Dismiss message"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
