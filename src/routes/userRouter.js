import express from 'express'

import { update } from '../controllers/userController.js'
import isAuth from '../middlewares/isAuth.js'
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router()

router.post('/user-update', isAuth, update)

export default router