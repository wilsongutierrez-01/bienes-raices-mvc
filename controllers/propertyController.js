import { validationResult } from 'express-validator'
import Category from "../models/Category.js"
import Price from "../models/Price.js"
import Property from "../models/Property.js"

const admin = async (req, res) => {
  const { id } = req.user

  const properties = await Property.findAll({
    where: {
      userId: id
    }
  })

  res.render('properties/admin',{
    page: 'My Properties',
    properties
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

const addImage = async (req, res) => {
  const { id } = req.params
  const { id: userId } = req.user

  //Check if property exists
  const property = await Property.findByPk(id)
  if(!property){
    res.redirect('/my-properties')
    return
  }

  //Check if property is published
  if(property.published){
    res.redirect('/my-properties')
    return
  }

  //Check if user is the owner
  if( property.userId.toString() !== userId.toString()){
    res.redirect('/my-properties')
    return
  }

  res.render('properties/addImage',{
    page: `Add Image: ${property.title}`,
    header: true,
    csrfToken: req.csrfToken(),
    property
  })
}

const saveImage = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const { filename: image} = req.file

  const property = await Property.findByPk(id)
  if(!property){
    res.redirect('/my-properties')
    return
  }

  if(property.published){
    res.redirect('/my-properties')
    return
  }

  if( property.userId.toString() !== userId.toString()){
    res.redirect('/my-properties')
    return
  }

  try{ 
    //Save image and publish property

    property.image = image
    property.published = 1

    await property.save()

    next()

  }catch{
    console.error(error)
  }

}

export {
  admin,
  create,
  save,
  addImage,
  saveImage
}