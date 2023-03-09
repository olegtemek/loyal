import express from 'express'

import { index, transaction, exportUsers, getCashback, saveCashback, sender } from '../controllers/adminController.js'
import isAuth from '../middlewares/isAuth.js'
import isModerator from '../middlewares/isModerator.js'
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router()

router.get('/admin/get', isAuth, isModerator, index)
router.post('/admin/transaction', isAuth, isModerator, transaction)
router.get('/admin/export', isAuth, isModerator, exportUsers)
router.get('/admin/get-cashback', isAuth, getCashback)
router.post('/admin/save-cashback', isAuth, isModerator, saveCashback)
router.post('/admin/send-whatsapp', isAuth, isAdmin, sender)

export default router