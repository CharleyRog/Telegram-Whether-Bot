// IMPORT MODULES
import fs from 'fs'
import getUsers from './getUsers.js'
import { IUser } from '../models/interfaces/IUser.js'

// HELPER FUNCTION
async function addUser(chatId: number, city: string): Promise<boolean> {
  try {
    const users: IUser[] = await getUsers()
    users.push({ chat_id: chatId, city: city })
    fs.writeFileSync('users.json', JSON.stringify(users))
    return true
  } catch (error: unknown) {
    console.error(error)
    return false
  }
}

export default addUser
