import { UserModel } from './user.model'
import crypto from 'crypto'
//generate salt
export function generateSalt() {
  return crypto.randomBytes(64).toString('hex')
}


//create a user
export async function createUser (input: {
  encryptPassword: string
  email: string
}){
  return await UserModel.create(input)
}