import express from 'express';
import userRoutes from './routes/userRoutes.js'
import db from './config/db.js'

//create express app
const app = express();
//connect to database

try{
  await db.authenticate();
  console.log('Connection has been established successfully.');
}catch(error){
  console.error('Unable to connect to the database:', error);
}

// enable pug
app.set('view engine', 'pug')
app.set('views', './views')

//public folder
app.use(express.static('public'))
// Routting 
app.use('/auth', userRoutes)


//define port and start server
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})