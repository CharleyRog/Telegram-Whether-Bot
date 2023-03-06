// IMPORT MODULES
import fs from 'fs'
import getUsers from './getUsers.js'
import { IUser } from '../models/interfaces/IUser.js'

// HELPER FUNCTION
async function removeUser(chatId: number): Promise<boolean> {
  try {
    const users: IUser[] = await getUsers()
    const index: number = users.findIndex((user: IUser) => user.chat_id === chatId)
    if (index !== -1) {
      users.splice(index, 1)
      fs.writeFileSync('users.json', JSON.stringify(users))
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}

export default removeUser
