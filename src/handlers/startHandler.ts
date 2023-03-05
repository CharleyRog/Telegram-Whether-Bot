// IMPORT MODULES
import { Message } from 'node-telegram-bot-api'
import getUser from '../helpers/getUser.js'
import isValidCity from '../helpers/isValidCity.js'
import addUser from '../helpers/addUser.js'
import bot from '../bot.js'

// HANDLER FUNCTION
export default async function startHandler(msg: Message) {
  const chatId = msg.chat.id
  const user = await getUser(chatId)
  if (!user) {
    await bot.sendMessage(chatId, 'Введите название города на русском языке, в котором вы проживаете.')
    bot.once('message', async (msg) => {
      const city = msg.text
      if (city) {
        if (await isValidCity(city)) {
          await addUser(chatId, city)
          await bot.sendMessage(
            chatId,
            `Город ${city} успешно сохранен в базе данных!\n Теперь вы будете получать информацию по нему.\n Если хотите удалить информацию из базы данных - нажмите /end.`,
          )
        } else {
          await bot.sendMessage(
            chatId,
            'Неудалось подтвердить существование данного города. Попробуйте еще раз, прописав /start.',
          )
        }
      }
    })
  } else {
    await bot.sendMessage(chatId, 'Город уже добавлен в базу данных. Используйте другую команду.')
  }
}
