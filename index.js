// IMPORT MODULES

require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const weather = require('openweather-apis')
const axios = require('axios')
const cron = require('node-cron')

// CODE

const TOKEN_BOT = process.env.TOKEN_BOT
const API_WEATHER = process.env.API_WEATHER

const bot = new TelegramBot(TOKEN_BOT, { polling: true })

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id
  if (!(await getUser(chatId))) {
    bot.once('message', async (msg) => {
      const city = msg.text
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
        return
      }
    })
  } else {
    await bot.sendMessage(chatId, 'Город уже добавлен в базу данных. Используйте другую команду.')
  }
})

bot.onText(/\/weather/, async (msg) => {
  const chatId = msg.chat.id
  const user = await getUser(chatId)
  if (user) {
    weather.setCity(user.city)
    weather.setLang('ru')
    weather.setUnits('metric')
    weather.setAPPID(API_WEATHER)
    weather.getAllWeather(async function (err, res) {
      if (err) {
        console.log('Произошла ошибка при получении погоды')
      } else {
        const message = formatWeather(res)
        await bot.sendMessage(chatId, message)
      }
    })
  } else {
    await bot.sendMessage(chatId, 'Вы не авторизированы. Введите /start для регистрации.')
  }
})

bot.onText(/\/end/, async (msg) => {
  const chatId = msg.chat.id
  if (await getUser(chatId)) {
    await removeUser(chatId)
    await bot.sendMessage(chatId, 'Ваша информация удалена из базы данных')
  } else {
    await bot.sendMessage(chatId, 'Вы не авторизированы. Введите /start для регистрации.')
  }
})

async function isValidCity(city) {
  try {
    const lang = 'ru'
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${API_WEATHER}`,
    )
    const { data } = response
    console.log(data)
    if (data.cod === 200 && data.name === city) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

async function addUser(chatId, city) {
  const users = await getUsers()
  users.push({ chat_id: chatId, city: city })
  fs.writeFileSync('users.json', JSON.stringify(users))
}

async function getUser(chatId) {
  const users = await getUsers()
  return users.find((user) => user.chat_id === chatId)
}

async function removeUser(chatId) {
  const users = await getUsers()
  const index = users.findIndex((user) => user.chat_id === chatId)
  if (index !== -1) {
    users.splice(index, 1)
    fs.writeFileSync('users.json', JSON.stringify(users))
  }
}

async function getUsers() {
  try {
    const data = fs.readFileSync('users.json', 'utf8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

function formatWeather(data) {
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
