// IMPORT MODULES

export default function formatWeather(data: any): string {
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
