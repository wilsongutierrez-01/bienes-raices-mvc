import express from 'express';
import userRoutes from './routes/userRoutes.js'

//create express app
const app = express();

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