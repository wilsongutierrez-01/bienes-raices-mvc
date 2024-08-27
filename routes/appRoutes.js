import express from 'express'
import { home, category, notFound, search } from '../controllers/appController.js'

const router = express.Router()

//Home page
router.get('/', home)

//Category page
router.get('/category/:id', category)

//404 page
router.use('/404',notFound)

//Search
router.post('/search', search)

export default router