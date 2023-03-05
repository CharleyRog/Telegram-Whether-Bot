// IMPORT MODULES
import fs from 'fs'
import { IUser } from '../models/interfaces/IUser.js'

export default async function getUsers(): Promise<IUser[]> {
  try {
    const data = fs.readFileSync('users.json', 'utf8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}
