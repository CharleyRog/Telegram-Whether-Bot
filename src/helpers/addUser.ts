// IMPORT MODULES
import fs from 'fs'
import getUsers from './getUsers.js'

// HELPER FUNCTION
export default async function addUser(chatId: number, city: string): Promise<void> {
  const users = await getUsers()
  users.push({ chat_id: chatId, city: city })
  fs.writeFileSync('users.json', JSON.stringify(users))
}
