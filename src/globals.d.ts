declare global {
  interface Console {
    superLog: () => void
  }
  declare var test: number
}

export {}