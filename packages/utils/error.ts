class DewEditorError extends Error {
  constructor(message: string) {
    super(message)
    this.name = message
  }
}

export const throwError = (scope: string, message: string) => {
  throw new DewEditorError(`[${scope}] ${message}`)
}
