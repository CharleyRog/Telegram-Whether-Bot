// IMPORT MODULES
import startHandler from './handlers/startHandler.js'
import endHandler from './handlers/endHandler.js'
import weatherHandler from './handlers/weatherHandler.js'
import bot from './bot.js'
import { Message } from 'node-telegram-bot-api'

// HANDLERS
bot.onText(/\/start/, async (msg: Message) => await startHandler(msg))
bot.onText(/\/weather/, async (msg: Message) => await weatherHandler(msg))
bot.onText(/\/end/, async (msg: Message) => await endHandler(msg))

// BOT INITIALIZED
console.log('Bot working')
