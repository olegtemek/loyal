import express from 'express'

import { index, transaction } from '../controllers/adminController.js'
import isAuth from '../middlewares/isAuth.js'
import isModerator from '../middlewares/isModerator.js'
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router()

router.get('/admin/get', isAuth, isModerator, index)
router.post('/admin/transaction', isAuth, isModerator, transaction)

export default router