// IMPORT MODULES
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'

// CONFIGURE DOTENV
dotenv.config()

// CONFIGURE TELEGRAM BOT
const TOKEN_BOT: string = process.env.TOKEN_BOT

if (!TOKEN_BOT) {
  console.error('Telegram bot token not found in environment variables')
  process.exit(1)
}

const bot: TelegramBot = new TelegramBot(TOKEN_BOT, { polling: true })
export default bot
