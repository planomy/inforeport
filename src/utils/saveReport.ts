export type SaveResult = 'saved' | 'cancelled' | 'failed'

function downloadFallback(filename: string, contents: string): SaveResult {
  const blob = new Blob([contents], { type: 'text/plain;charset=utf-8' })
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
  const savePicker = window.showSaveFilePicker
  if (savePicker) {
    try {
      const handle = await savePicker({
        suggestedName: filename,
        types: [
          {
            description: 'Text file',
            accept: { 'text/plain': ['.txt'] },
          },
        ],
      })
      const writable = await handle.createWritable()
      await writable.write(contents)
      await writable.close()
      return 'saved'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'cancelled'
      }
      return downloadFallback(filename, contents)
    }
  }

  return downloadFallback(filename, contents)
}
