// IMPORT MODULES
import { Message } from 'node-telegram-bot-api'
import getUser from '../helpers/getUser.js'
import removeUser from '../helpers/removeUser.js'
import bot from '../bot.js'
import { IUser } from '../models/interfaces/IUser.js'

// HANDLER FUNCTION
export default async function endHandler(msg: Message) {
  const chatId: number = msg.chat.id
  const user: IUser | undefined = await getUser(chatId)
  if (user) {
    await removeUser(chatId)
    await bot.sendMessage(chatId, 'Ваша информация удалена из базы данных')
  } else {
    await bot.sendMessage(chatId, 'Вы не авторизированы. Введите /start для регистрации.')
  }
}
