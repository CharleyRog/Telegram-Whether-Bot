// import test from 'node:test'
// import getUsers from '../helpers/getUsers.js'
// import getUser from '../helpers/getUser.js'

// test('getUsers should return an array', async () => {
//   const users = await getUsers()
//   expect(Array.isArray(users)).toBe(true)
// })
//
// test('saveUser should add a user to the file', async () => {
//   const user = { chat_id: 123456, city: 'Moscow' }
//   const users = await getUsers()
//   expect(users).toContainEqual(user)
// })
//
// test('getUser should return a user if it exists', async () => {
//   const user = { chat_id: 123456, city: 'Moscow' }
//   const result = await getUser(user.chat_id)
//   expect(result).toEqual(user)
// })
//
// test('getUser should return undefined if user does not exist', async () => {
//   const result = await getUser(123456)
//   expect(result).toBeUndefined()
// })
