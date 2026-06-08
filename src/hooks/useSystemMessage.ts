import { useCallback, useRef, useState } from 'react'

export type MessageType = 'info' | 'success' | 'error' | 'loading' | 'confirm'

export interface SystemMessageData {
  title: string
  detail?: string
  type: MessageType
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export function useSystemMessage() {
  const [message, setMessage] = useState<SystemMessageData | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setMessage(null)
  }, [])

  const showMessage = useCallback(
    (
      title: string,
      type: Exclude<MessageType, 'confirm'> = 'info',
      options?: { detail?: string; duration?: number }
    ) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      setMessage({ title, detail: options?.detail, type })
      const duration = options?.duration ?? 2800
      if (duration > 0) {
        timerRef.current = setTimeout(() => setMessage(null), duration)
      }
    },
    []
  )

  const showConfirm = useCallback(
    (
      title: string,
      options: {
        detail?: string
        confirmLabel?: string
        cancelLabel?: string
        onConfirm: () => void
      }
    ) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      setMessage({
        title,
        detail: options.detail,
        type: 'confirm',
        confirmLabel: options.confirmLabel ?? 'Confirm',
        cancelLabel: options.cancelLabel ?? 'Cancel',
        onConfirm: options.onConfirm,
        onCancel: dismiss,
      })
    },
    [dismiss]
  )

  return { message, showMessage, showConfirm, dismiss }
}
