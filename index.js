import express from 'express';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import propertiesRoutes from './routes/propertiesRoutes.js'
import appRoutes from './routes/appRoutes.js'

import db from './config/db.js'

//create express app
const app = express()

//Enable req.body
app.use(express.urlencoded({ extended: true }))
//Enable cookies
app.use(cookieParser())
//Enable CSRF protection
app.use(csurf({ cookie: true }))

//connect to database
try{
  await db.authenticate()
  db.sync()
  console.log('Connection has been established successfully.')
}catch(error){
  console.error('Unable to connect to the database:', error)
}

// enable pug
app.set('view engine', 'pug')
app.set('views', './views')

//public folder
app.use(express.static('public'))
// Routting 
app.use('/auth', userRoutes)
app.use('/', propertiesRoutes)
app.use('/', appRoutes)


//define port and start server
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})