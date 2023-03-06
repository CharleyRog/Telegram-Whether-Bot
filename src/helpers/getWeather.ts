// IMPORT MODULES
import axios from 'axios'

// HELPER FUNCTION
async function getWeather(city: string): Promise<any> {
  try {
    const lang = 'ru'
    const API_WEATHER: string = process.env.API_WEATHER
    if (!API_WEATHER) {
      console.error('OpenWeatherMap API key is missing!')
      return false
    }
    const response: any = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${API_WEATHER}`,
    )
    const { data } = response
    return data
  } catch (error: unknown) {
    console.error(error)
    return false
  }
}

export default getWeather
