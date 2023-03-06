// IMPORT MODULES
import fs from 'fs'
import { IUser } from '../models/interfaces/IUser.js'

// HELPER FUNCTION
async function getUsers(): Promise<IUser[] | never[]> {
  try {
    const data = fs.readFileSync('users.json', 'utf8')
    return JSON.parse(data)
  } catch (error: any) {
    return []
  }
}

export default getUsers
