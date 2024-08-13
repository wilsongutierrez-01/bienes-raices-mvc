import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

const protectedRoutes = async (req, res, next) => {
  // Check if user is logged in and has a token
  const { _token } = req.cookies

  if (!_token) {
    return res.redirect('/auth/login')
  }

  try{

    const decoded = jwt.verify(_token, process.env.JWT_SECRET)
    const user = await User.scope('withToken').findByPk(decoded.id)

    if(user){
      req.user = user
    }else{
      return res.clearCookie('_token').redirect('/auth/login')
    }
    return next()
  }catch(err){
    return res.clearCookie('_token').redirect('/auth/login')
  }

}

export default protectedRoutes