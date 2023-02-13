
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import prisma from '../../prisma/client.js'
import sendClient from '../utils/sendClient.js';

export default async (req, res, next) => {
  try {
    if (req.user.role != 0) {
      next()
    } else {
      sendClient(res, 401, { message: 'Недостаточно прав' })
    }
  } catch (e) {
    sendClient(res)
  }
}
