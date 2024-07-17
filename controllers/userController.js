import { check,validationResult } from 'express-validator'
import User from '../models/User.js'
import {generateId } from '../helpers/tokens.js'

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
      user: {
        name: req.body.name,
        email: req.body.email
      }
    })
    return
  }

  await User.create({
    name,
    email,
    password,
    token: generateId()
  })
  
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