import express from 'express'

import { login, registration, registrationAdmin, confirm, retry, reset, resetCode } from '../controllers/authController.js'
import isAuth from '../middlewares/isAuth.js'
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router()

router.post('/registration', registration)
router.post('/registration-admin', isAuth, isAdmin, registrationAdmin)
// router.post('/registration-user', isAuth, isAdmin, registrationAdmin)
router.post('/login', login)
router.post('/check-token', isAuth, async (req, res) => {
  res.json({ user: req.user })
})
router.post('/user-confirm', confirm);
router.post('/retry-code', retry)
router.post('/reset', reset)
router.post('/reset-code', resetCode)

export default router