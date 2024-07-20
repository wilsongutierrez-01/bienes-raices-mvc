import { check,validationResult } from 'express-validator'
import User from '../models/User.js'
import {generateId } from '../helpers/tokens.js'
import { emailRegister, emailRecoverPassword } from '../helpers/email.js'
const loginForm = (req, res) => {
  res.render('auth/login', {
    page: 'Sign in',
  });
}

//Signup methods
const signupForm = (req, res) => {

  res.render('auth/singup', {
    page: 'Sign up',
    csrfToken: req.csrfToken()
  });
}

const signup = async (req, res) => {
  //Validate user 

  await check('name')
    .notEmpty()
    .withMessage('name is required')
    .run(req)
  await check('email')
    .isEmail()
    .withMessage('Real email is required')
    .run(req)
  await check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters')
    .run(req)
  await check('repeat_password')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .run(req)
  await check('repeat_password')
    .custom((value, {req}) => {
      if(value !== req.body.password) {
        throw new Error('Passwords do not match')
      }
      return true
    })
    .run(req)

  let result = validationResult(req)

  //If there are errors
  if(!result.isEmpty()) {
    res.render('auth/singup', {
      page: 'Sign up',
    csrfToken: req.csrfToken(),
      errors: result.array(),
      user: {
        name: req.body.name,
        email: req.body.email
      }
    })
    return
  }
  //Exract email and password
  const { name, email, password } = req.body
  // chech if the user already exists
  const userExists = await User.findOne({where: {email}})
  if(userExists) {
    res.render('auth/singup', {
      page: 'Sign up',
      errors: [{msg: 'The email is already registered'}],
      csrfToken: req.csrfToken(),
      user: {
        name: req.body.name,
        email: req.body.email
      }
    })
    return
  }

  const user = await User.create({
    name,
    email,
    password,
    token: generateId()
  })

  //Send email to activate account
  emailRegister({
    name: user.name,
    email: user.email,
    token: user.token
  })

  res.render('template/message', {
    page: 'Account created',
    message: 'Check your email to activate your account'
  })
}

const confirmAccount = async (req, res, next) => {
  const { token } = req.params

  //Check if the token exists
  const user = await User.findOne({where: {token}})
  if(!user){
    res.render('auth/confirmAccount', {
      page: 'Error to confirm account',
      message: 'We can not confirm you account, please try again',
      error: true
    })
    return
  }
  user.token = null
  user.confirmed = true
  await user.save()

  res.render('auth/confirmAccount', {
    page: 'Account confirmed',
    message: 'Your account has been confirmed, now you can sign in',
  })
}

const recoverPassword = (req, res) => {
  res.render('auth/recoverPassword', {
    page: 'Recover Password',
    csrfToken: req.csrfToken(),
  });
}

const resetPassword = async (req, res) => {
  //Validate email
  await check('email')
    .isEmail()
    .withMessage('Real email is required')
    .run(req)

  let result = validationResult(req)

  //If there are errors
  if(!result.isEmpty()) {
    res.render('auth/recoverPassword', {
      page: 'Recover Password',
      csrfToken: req.csrfToken(),
      errors: result.array(),
    })
    return
  }
  //Extract user email
  const { email } = req.body
  const user = await User.findOne({where: {email}})
  if(!user) {
    res.render('auth/recoverPassword', {
      page: 'Recover Password',
      csrfToken: req.csrfToken(),
      errors: [{msg: 'The email does not exist'}],
    })
    return
  }
  //Send email to reset password
  user.token = generateId()
  await user.save()

  //send an email to reset password
  emailRecoverPassword({
    name: user.name,
    email: user.email,
    token: user.token
  })

  res.render('template/message', {
    page: 'Email sent',
    message: 'Check your email to reset your password'
  })

}

const verifyToken = async (req, res, next) => {
  const { token } = req.params

  const user = await User.findOne({where: {token}})
  if(!user){
    res.render('auth/confirmAccount', {
      page: 'Reset password',
      message: 'We can not reset your password, please try again',
      error: true
    })
    return
  }
  //Render the reset password form
  res.render('auth/resetPassword', {
    page: 'Reset your Password',
    csrfToken: req.csrfToken(),
  });
}

const newPassword = async (req, res) => {
  //Validate password
  await check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters')
    .run(req)
  await check('repeat_password')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .run(req)
  await check('repeat_password')
    .custom((value, {req}) => {
      if(value !== req.body.password) {
        throw new Error('Passwords do not match')
      }
      return true
    })
    .run(req)

  let result = validationResult(req)

  
  if(!result.isEmpty()){
    res.render(`auth/resetPassword`, {
      page: 'Reset your Password',
      csrfToken: req.csrfToken(),
      errors: result.array(),
    })
    return
  }

  const { token } = req.params
  const { password } = req.body
  const user = await User.findOne({where: {token}})

  user.token = null
  user.password = password

  try {
    await user.update({
      token: null,
      password
    })

    res.render('auth/confirmAccount', {
      page: 'Reset password',
      message: 'Your password has been reset, now you can sign in',
    })
    return

  }catch(error){
    res.render('auth/confirmAccount', {
      page: 'Reset password',
      message: 'We can not reset your password, please try again',
      error: true
    })
    return
  }
  
}
export {
  loginForm,
  signupForm,
  signup,
  confirmAccount,  
  recoverPassword,
  resetPassword,
  verifyToken,
  newPassword
}