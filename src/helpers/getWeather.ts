// IMPORT MODULES
import axios from 'axios'

// HELPER FUNCTION
export default async function getWeather(city: string): Promise<any> {
  const lang: string = 'ru'
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${process.env.API_WEATHER}`,
  )
  const { data } = response
  return data
}
