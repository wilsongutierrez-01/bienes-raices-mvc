import express from 'express'
import { body } from 'express-validator'
import { 
  admin, 
  create, 
  save, 
  addImage, 
  saveImage, 
  edit, 
  saveChanges,
  deleteProperty,
  changeStatus,
  showProperty, 
  sendMessage,
  seeMessages} from '../controllers/propertyController.js'
import protectedRoute from '../middleware/protectedRoutes.js'
import upload from '../middleware/uploadImage.js'
import userIdentificator from '../middleware/userIdentificator.js'
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
router.post(`/properties/add-image/:id`, protectedRoute, upload.single('image'), saveImage)

router.get('/properties/edit/:id', protectedRoute, edit)
router.post('/properties/edit/:id', 
  protectedRoute,
  body('title').isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
  body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
  body('category').isNumeric().withMessage('Please select a category'),
  body('price').isNumeric().withMessage('Please select a price'),
  body('bedrooms').isNumeric().withMessage('Please select the number of bedrooms'),
  body('parking').isNumeric().withMessage('Please select the number of parking spaces'),
  body('bathrooms').isNumeric().withMessage('Please select the number of bathrooms'),
  body('lat').notEmpty().withMessage('Please select a location on the map'),
  saveChanges
)

router.post('/properties/delete/:id', protectedRoute, deleteProperty)

router.put('/properties/:id', protectedRoute, changeStatus)

//Public routes
router.get('/property/:id', userIdentificator, showProperty)

//save messages
router.post('/property/:id', 
  userIdentificator, 
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters long'),
  sendMessage)

//see messages
router.get('/messages/:id', protectedRoute, seeMessages)

export default router