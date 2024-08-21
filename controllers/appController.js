import { Category, Price, Property } from '../models/index.js'

const home = async (req, res) => {

  const [ categories, prices ] = await Promise.all([
    Category.findAll({raw: true}),
    Price.findAll({raw: true}),
  ])
  res.render('home', { 
    page: 'Home',
    categories,
    prices
  })
}

const category = (req, res) => {
}

const notFound = (req, res) => {
  res.status(404).send('404: Page not found')
}

const search = (req, res) => {
}

export {
  home,
  category,
  notFound,
  search
}