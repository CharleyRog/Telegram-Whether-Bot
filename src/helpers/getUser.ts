// IMPORT MODULES
import getUsers from './getUsers.js'
import { IUser } from '../models/interfaces/IUser.js'

// HELPER FUNCTION
async function getUser(chatId: number): Promise<IUser | undefined> {
  try {
    const users: IUser[] = await getUsers()
    return users.find((user: IUser) => user.chat_id === chatId)
  } catch (error: any) {
    console.error(error)
  }
}

export default getUser
