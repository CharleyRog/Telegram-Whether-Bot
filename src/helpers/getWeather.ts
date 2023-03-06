// IMPORT MODULES
import axios from 'axios'

// HELPER FUNCTION
async function getWeather(city: string): Promise<any> {
  try {
    const lang = 'ru'
    const response: any = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${process.env.API_WEATHER}`,
    )
    const { data } = response
    return data
  } catch (error: any) {
    console.error(error)
    return false
  }
}

export default getWeather
