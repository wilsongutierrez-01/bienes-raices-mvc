import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const userIdentificator = async (req, res, next) => {
  // Check if user is logged in and has a token
  const  { _token }  = req.cookies

  if (!_token) {
    req.user = null
    return next()
  }

  try{
    const decoded = jwt.verify(_token, process.env.JWT_SECRET)
    const user = await User.scope('withToken').findByPk(decoded.id)

    if(user){
      req.user = user
    }
    
    return next()

  }catch(error){
    console.log(error)
    res.clearCookie('_token').redirect('/auth/login')
    return
  }
  
}

export default userIdentificator