// IMPORT MODULES
import getWeather from './getWeather.js'

// HELPER FUNCTION
async function isValidCity(city: string): Promise<boolean> {
  try {
    const data: any = await getWeather(city)
    return data.name === city
  } catch (error: any) {
    console.error(error)
    return false
  }
}

export default isValidCity
