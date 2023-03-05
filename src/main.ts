// IMPORT MODULES
import startHandler from './handlers/startHandler.js'
import endHandler from './handlers/endHandler.js'
import weatherHandler from './handlers/weatherHandler.js'
import bot from './bot.js'

// HANDLERS
bot.onText(/\/start/, async (msg) => await startHandler(msg))

bot.onText(/\/weather/, async (msg) => await weatherHandler(msg))

bot.onText(/\/end/, async (msg) => await endHandler(msg))

// BOT INITIALIZED
console.log('Bot working')
