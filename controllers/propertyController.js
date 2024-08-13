import { validationResult } from 'express-validator'
import Category from "../models/Category.js"
import Price from "../models/Price.js"
import Property from "../models/Property.js"

const admin = (req, res) => {
  res.render('properties/admin',{
    page: 'My Properties',
    header: true
  })
}

//Form to create property
const create = async (req, res) => {

  const [ categories, prices ] = await Promise.all([
    Category.findAll(),
    Price.findAll()
  ])

  res.render('properties/create',{
    page: 'Create Property',
    header: true,
    csrfToken: req.csrfToken(),
    categories,
    prices,
    data: {}
  })
}

const save = async (req, res) => {
  //Validate data
  let result = validationResult(req)

  if (!result.isEmpty()) {
    const [ categories, prices ] = await Promise.all([
      Category.findAll(),
      Price.findAll()
    ])
    res.render('properties/create',{
      page: 'Create Property',
      header: true,
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: result.array(),
      data: req.body
    })
    return
  }

  //Save property
  const { title, description, category: categoryId, price: priceId, bedrooms, parking, bathrooms, street, lat, lng } = req.body
  const { id: userId } = req.user
  try{
    const propertyCreated = await Property.create({
      title,
      description,
      categoryId,
      priceId,
      bedrooms,
      parking,
      bathrooms,
      street,
      lat,
      lng,
      userId,
      image:''
    })
    const { id } = propertyCreated
    res.redirect(`/properties/add-image/${id}`)
  }catch(error){
    console.error(error)
    
  }
}

const addImage = (req, res) => {
  res.render('properties/addImage',{
    page: 'Add Image',
    header: true,
    csrfToken: req.csrfToken()
  })
}

export {
  admin,
  create,
  save,
  addImage
}