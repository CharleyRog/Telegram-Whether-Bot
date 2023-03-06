// IMPORT MODULES

// HELPER FUNCTION
function formatWeather(data: any): string | undefined {
  try {
    const weather = data.weather[0].description
    const temp = data.main.temp
    const feelsLike = data.main.feels_like
    const humidity = data.main.humidity
    const wind = data.wind.speed
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()
    const city = data.name
    const country = data.sys.country

    let message = `Текущая погода дял ${city}, ${country}:\n\n`
    message += `🌤️ ${weather}\n`
    message += `🌡️ Температура: ${temp.toFixed(0)}°C\n`
    message += `👤 Чувствуется: ${feelsLike.toFixed(0)}°C\n`
    message += `💦 Влажность: ${humidity}%\n`
    message += `💨 Скорость ветра: ${wind} m/s\n`
    message += `🌅 Рассвет: ${sunrise}\n`
    message += `🌇 Закат: ${sunset}\n\n`

    return message
  } catch (error: any) {
    console.error(error)
  }
}

export default formatWeather
