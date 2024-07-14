import { check,validationResult } from 'express-validator'
import User from '../models/User.js'

const loginForm = (req, res) => {
  res.render('auth/login', {
    page: 'Sign in',
  });
}

//Signup methods
const signupForm = (req, res) => {
  res.render('auth/singup', {
    page: 'Sign up',
  });
}

const signup = async (req, res) => {
  //Validate user 

  await check('name').notEmpty().withMessage('name is required').run(req)
  await check('email').isEmail().withMessage('Real email is required').run(req)
  await check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters').run(req)
  await check('repeat_password').equals('password').withMessage('Passwords do not match').run(req)

  let result = validationResult(req)

  //If there are errors
  if(!result.isEmpty()) {
    res.render('auth/singup', {
      page: 'Sign up',
      errors: result.array()
    })
    return
  }

  const user = await User.create(req.body)
  res.json(user)
}

const recoverPassword = (req, res) => {
  res.render('auth/recoverPassword', {
    page: 'Recover Password',
  });
}
export {
  loginForm,
  signupForm,
  signup,
  recoverPassword
}