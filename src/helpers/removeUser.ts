// IMPORT MODULES
import fs from 'fs'
import getUsers from './getUsers.js'
import { IUser } from '../models/interfaces/IUser.js'

export default async function removeUser(chatId: number): Promise<void> {
  const users = await getUsers()
  const index = users.findIndex((user: IUser) => user.chat_id === chatId)
  if (index !== -1) {
    users.splice(index, 1)
    fs.writeFileSync('users.json', JSON.stringify(users))
  }
}
