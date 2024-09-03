
import { unlink } from 'node:fs/promises'
import { validationResult } from 'express-validator'
import { Category, Price, Property } from '../models/index.js'
import { isSeller } from '../helpers/index.js'

const admin = async (req, res) => {

  const { page: currentPage } = req.query

  const regex = /^[1-9]$/
  
  if(!regex.test(currentPage)){
    res.redirect('/my-properties?page=1')
    return
  }
  
  try{

    //Limits and offset
    const limit = 5
    const offset = ((currentPage * limit) - limit)

    const { id } = req.user

    const [properties, total] = await Promise.all([
      Property.findAll({
          limit,
          offset,
          where: {
            userId: id
          },
          include: [
            {
              model: Category, 
            },
            {
              model: Price
            }
          ],
        }),
        Property.count({
          where: {
            userId: id
          }
        })
    ])

    res.render('properties/admin',{
      page: 'My Properties',
      properties,
      csrfToken: req.csrfToken(),
      pages: Math.ceil(total / limit),
      currentPage: Number(currentPage),
      total,
      limit,
      offset
    })
  }catch(error){
    console.error(error)
  }
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

const edit = async (req, res) => {
  const [ categories, prices ] = await Promise.all([
    Category.findAll(),
    Price.findAll()
  ])

  const { id } = req.params
  const { id: userId } = req.user

  const property = await Property.findByPk(id)

  if(!property){
    res.redirect('/my-properties')
    return
  }

  if( property.userId.toString() !== userId.toString()){
    res.redirect('/my-properties')
    return
  }


  res.render('properties/edit',{
    page: 'Edit Property',
    csrfToken: req.csrfToken(),
    categories,
    prices,
    data: property  
  })
}

const saveChanges = async (req, res) => {

  //Validate data
  let result = validationResult(req)

  if (!result.isEmpty()) {
    const [ categories, prices ] = await Promise.all([
      Category.findAll(),
      Price.findAll()
    ])
    res.render('properties/edit',{
      page: `Edit Property`,
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: result.array(),
      data: req.body
    })
    return
  }
  const { id } = req.params
  const { id: userId } = req.user

  const property = await Property.findByPk(id)

  if(!property){
    res.redirect('/my-properties')
    return
  }

  if( property.userId.toString() !== userId.toString()){
    res.redirect('/my-properties')
    return
  }

  //Save property
  const { title, description, category: categoryId, price: priceId, bedrooms, parking, bathrooms, street, lat, lng } = req.body
  
  try{
    property.set({
      title,
      description,
      categoryId,
      priceId,
      bedrooms,
      parking,
      bathrooms,
      street,
      lat,
      lng
    })
    await property.save()
    res.redirect('/my-properties')
  }catch(error){
    console.error(error)
    
  }
}

const deleteProperty = async (req, res) => {
  const { id } = req.params
  const { id: userId } = req.user

  const property = await Property.findByPk(id)

  if(!property){
    res.redirect('/my-properties')
    return
  }

  if( property.userId.toString() !== userId.toString()){
    res.redirect('/my-properties')
    return
  }

  await unlink(`public/uploads/${property.image}`)

  try{
    await property.destroy()
    res.redirect('/my-properties')
  }catch(error){
    console.error(error)
  }
}

//Show one property
const showProperty = async (req, res) => {

  const { id } = req.params

  const property = await Property.findByPk(id, {
    include: [
      {
        model: Category
      },
      {
        model: Price
      }
    ]
  })

  if(!property){
    res.redirect('/404')
    return
  }

  res.render('properties/show',{
    page: 'Property',
    property,
    csrfToken: req.csrfToken(),
    user: req.user,
    isSeller: isSeller(req.user?.id, property.userId)
  })

}

export {
  admin,
  create,
  save,
  addImage,
  saveImage,
  edit,
  saveChanges,
  deleteProperty,
  showProperty
}