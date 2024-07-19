import express from 'express'
import { 
  loginForm, 
  signupForm, 
  signup,
  confirmAccount,
  recoverPassword, 
} from '../controllers/userController.js'

const router = express.Router()

router.get('/login', loginForm)

router.get('/singup', signupForm)
router.post('/singup', signup)

router.get('/confirmAccount/:token', confirmAccount)

router.get('/recover-password', recoverPassword)



export default router