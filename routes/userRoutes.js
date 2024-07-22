import express from 'express'
import { 
  loginForm, 
  signin,
  signupForm, 
  signup,
  confirmAccount,
  recoverPassword, 
  resetPassword,
  verifyToken,
  newPassword
} from '../controllers/userController.js'

const router = express.Router()

router.get('/login', loginForm)
router.post('/login', signin)

router.get('/singup', signupForm)
router.post('/singup', signup)

router.get('/confirmAccount/:token', confirmAccount)

router.get('/recover-password', recoverPassword)
router.post('/recover-password', resetPassword)

//Reset password
router.get('/recover-password/:token', verifyToken)
router.post('/recover-password/:token', newPassword)



export default router