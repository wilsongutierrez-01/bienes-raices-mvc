import { Sequelize } from 'sequelize'
import { Category, Price, Property } from '../models/index.js'

const home = async (req, res) => {

  const [ categories, prices, apartments, houses ] = await Promise.all([
    Category.findAll({raw: true}),
    Price.findAll({raw: true}),
    Property.findAll({
      limit: 3,
      where: { 
        categoryId: 2 
      },
      include: [
        {
          model: Price
        }
      ],
      order: [['createdAt', 'DESC']],
    }),
    Property.findAll({
      limit: 3,
      where: { 
        categoryId: 5 
      },
      include: [
        {
          model: Price
        }
      ],
      order: [['createdAt', 'DESC']],
    })
  ])
  res.render('home', { 
    page: 'Home',
    categories,
    prices,
    apartments,
    houses,
    csrfToken: req.csrfToken()
  })
}

const category = async (req, res) => {
  const { id } = req.params

  const category = await Category.findByPk(id)

  if(!category) {
    res.redirect('/404')
    return
  }
  
  const properties = await Property.findAll({
    where: { categoryId: id },
    include: [
      {
        model: Price
      }
    ]
  })  
  res.render('category', { 
    page: category.name,
    properties,
    category,
    csrfToken: req.csrfToken()
  })
}

const notFound = (req, res) => {
  res.render('404', { 
    page: 'Not Found' ,
    csrfToken: req.csrfToken()
  })
}

const search = async (req, res) => {
  const { search } = req.body

  if(!search.trim()) {
    res.redirect('/')
    return
  }

  const properties = await Property.findAll({
    where:{
      title: {
        [Sequelize.Op.like]: '%' + search + '%'
      }
    },
    include: [
      {
        model: Price
      }
    ]
  })

  res.render('search', { 
    page: 'Search results',
    properties,
    csrfToken: req.csrfToken()
  })
}


export {
  home,
  category,
  notFound,
  search
}