// IMPORT MODULES
import getUsers from './getUsers.js'
import { IUser } from '../models/interfaces/IUser.js'

export default async function getUser(chatId: number): Promise<IUser | undefined> {
  const users = await getUsers()
  return users.find((user: IUser) => user.chat_id === chatId)
}
