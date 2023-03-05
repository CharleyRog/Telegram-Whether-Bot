// IMPORT MODULES
import dotenv from 'dotenv'
import TelegramBot from 'node-telegram-bot-api'
import fs from 'fs'
// @ts-ignore
import weather from 'openweather-apis'
import axios from 'axios'

interface IUser {
  chat_id: number
  city: string
}

// CONFIGURE DOTENV
dotenv.config()

// CONFIGURE WEATHER MODULE
weather.setLang('ru')
weather.setUnits('metric')
weather.setAPPID(process.env.API_WEATHER)

// CONFIGURE TELEGRAM BOT
const TOKEN_BOT = process.env.TOKEN_BOT
if (!TOKEN_BOT) {
  console.error('Telegram bot token not found in environment variables')
  process.exit(1)
}
const bot = new TelegramBot(TOKEN_BOT, { polling: true })

// HANDLERS
bot.onText(/\/start/, async (msg) => {
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
})

bot.onText(/\/weather/, async (msg) => {
  const chatId: number = msg.chat.id
  const user: IUser | undefined = await getUser(chatId)
  if (user) {
    weather.setCity(user.city)
    weather.getAllWeather(async (err: any, res: any) => {
      if (err) {
        console.log('Произошла ошибка при получении погоды')
      } else {
        const message: string = formatWeather(res)
        await bot.sendMessage(chatId, message)
      }
    })
  } else {
    await bot.sendMessage(chatId, 'Вы не авторизированы. Введите /start для регистрации.')
  }
})

bot.onText(/\/end/, async (msg) => {
  const chatId: number = msg.chat.id
  const user: IUser | undefined = await getUser(chatId)
  if (user) {
    await removeUser(chatId)
    await bot.sendMessage(chatId, 'Ваша информация удалена из базы данных')
  } else {
    await bot.sendMessage(chatId, 'Вы не авторизированы. Введите /start для регистрации.')
  }
})

// HELPER FUNCTIONS

async function getWeather(city: string): Promise<any> {
  const lang: string = 'ru'
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${process.env.API_WEATHER}`,
  )
  const { data } = response
  return data
}

async function isValidCity(city: string): Promise<boolean> {
  try {
    const data: any = await getWeather(city)
    return data.name === city
  } catch (error: any) {
    return false
  }
}

async function addUser(chatId: number, city: string): Promise<void> {
  const users = await getUsers()
  users.push({ chat_id: chatId, city: city })
  fs.writeFileSync('users.json', JSON.stringify(users))
}

async function getUser(chatId: number): Promise<IUser | undefined> {
  const users = await getUsers()
  return users.find((user: IUser) => user.chat_id === chatId)
}

async function removeUser(chatId: number): Promise<void> {
  const users = await getUsers()
  const index = users.findIndex((user: IUser) => user.chat_id === chatId)
  if (index !== -1) {
    users.splice(index, 1)
    fs.writeFileSync('users.json', JSON.stringify(users))
  }
}

async function getUsers(): Promise<IUser[]> {
  try {
    const data = fs.readFileSync('users.json', 'utf8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

function formatWeather(data: any): string {
  let weather = data.weather[0].description
  let temp = data.main.temp
  let feelsLike = data.main.feels_like
  let humidity = data.main.humidity
  let wind = data.wind.speed
  let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
  let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()
  let city = data.name
  let country = data.sys.country

  let message = `Текущая погода дял ${city}, ${country}:\n\n`
  message += `🌤️ ${weather}\n`
  message += `🌡️ Температура: ${temp.toFixed(0)}°C\n`
  message += `👤 Чувствуется: ${feelsLike.toFixed(0)}°C\n`
  message += `💦 Влажность: ${humidity}%\n`
  message += `💨 Скорость ветра: ${wind} m/s\n`
  message += `🌅 Рассвет: ${sunrise}\n`
  message += `🌇 Закат: ${sunset}\n\n`

  return message
}

console.log('Bot working')
