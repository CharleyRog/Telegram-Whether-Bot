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
    if (!user) {
      await bot.sendMessage(chatId, 'Вы не авторизированы. Введите /start для регистрации.')
      return
    }
    const API_WEATHER: string = process.env.API_WEATHER
    if (!API_WEATHER) {
      console.error('API_WEATHER not found')
      return
    }
    weather.setLang('ru')
    weather.setUnits('metric')
    weather.setAPPID(process.env.API_WEATHER)
    weather.setCity(user.city)
    weather.getAllWeather(async (err: never, res: never) => {
      if (err) {
        console.error('Произошла ошибка при получении погоды')
        return
      }
      const message: string | undefined = await formatWeather(res)
      if (message !== undefined) {
        await bot.sendMessage(chatId, message)
      }
    })
  } catch (error: unknown) {
    console.error(error)
  }
}

export default weatherHandler
