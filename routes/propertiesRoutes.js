import express from 'express'
import { body } from 'express-validator'
import { admin, create, save, addImage } from '../controllers/propertyController.js'
import protectedRoute from '../middleware/protectedRoutes.js'

const router = express.Router()

router.get('/my-properties', protectedRoute, admin)
router.get('/properties/create', protectedRoute, create)
router.post('/properties/create', 
  protectedRoute,
  body('title').isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
  body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
  body('category').isNumeric().withMessage('Please select a category'),
  body('price').isNumeric().withMessage('Please select a price'),
  body('bedrooms').isNumeric().withMessage('Please select the number of bedrooms'),
  body('parking').isNumeric().withMessage('Please select the number of parking spaces'),
  body('bathrooms').isNumeric().withMessage('Please select the number of bathrooms'),
  body('lat').notEmpty().withMessage('Please select a location on the map'),
  save
)
router.get(`/properties/add-image/:id`, protectedRoute, addImage)


export default router