import express from 'express'
import { loginForm, signupForm, recoverPassword } from '../controllers/userController.js'

const router = express.Router()

router.get('/login', loginForm)

router.get('/singup', signupForm)

router.get('/recover-password', recoverPassword)

router.post('/',(req, res) => {
  res.json({msg: 'Post request to the homepage'})
})

export default router