export type SaveResult = 'saved' | 'cancelled' | 'failed'

const WORD_MIME = 'application/msword'
const WORD_EXTENSION = '.doc'

export function getDefaultReportFilename(title: string): string {
  const safeTitle = title.trim() || 'Information-Report'
  return `${safeTitle.replace(/\s+/g, '-')}${WORD_EXTENSION}`
}

function downloadFallback(filename: string, blob: Blob): SaveResult {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
  return 'saved'
}

export async function saveReportToDevice(
  filename: string,
  contents: string
): Promise<SaveResult> {
  const blob = new Blob([contents], { type: WORD_MIME })
  const savePicker = window.showSaveFilePicker

  if (savePicker) {
    try {
      const handle = await savePicker({
        suggestedName: filename,
        types: [
          {
            description: 'Word document',
            accept: { [WORD_MIME]: [WORD_EXTENSION] },
          },
        ],
      })
      const writable = await handle.createWritable()
      await writable.write(blob)
      await writable.close()
      return 'saved'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'cancelled'
      }
      return downloadFallback(filename, blob)
    }
  }

  return downloadFallback(filename, blob)
}
