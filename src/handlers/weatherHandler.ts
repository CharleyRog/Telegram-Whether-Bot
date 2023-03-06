// IMPORT MODULES
import { Message } from 'node-telegram-bot-api'
import getUser from '../helpers/getUser.js'
import formatWeather from '../helpers/formatWeather.js'
import bot from '../bot.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import weather from 'openweather-apis'
import { IUser } from '../models/interfaces/IUser.js'

// HANDLER FUNCTION
async function weatherHandler(msg: Message): Promise<void> {
  try {
    const chatId: number = msg.chat.id
    const user: IUser | undefined = await getUser(chatId)
    if (user) {
      weather.setLang('ru')
      weather.setUnits('metric')
      weather.setAPPID(process.env.API_WEATHER)
      weather.setCity(user.city)
      weather.getAllWeather(async (err: never, res: never) => {
        if (err) {
          console.log('Произошла ошибка при получении погоды')
        } else {
          const message: string | undefined = await formatWeather(res)
          if (message != undefined) {
            await bot.sendMessage(chatId, message)
          }
        }
      })
    } else {
      await bot.sendMessage(chatId, 'Вы не авторизированы. Введите /start для регистрации.')
    }
  } catch (error: any) {
    console.error(error)
  }
}

export default weatherHandler
