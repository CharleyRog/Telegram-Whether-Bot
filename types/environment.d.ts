// GLOBAL TYPE DECLARING
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_BOT: string
      API_WEATHER: string
    }
  }
}

export {}
