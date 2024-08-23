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
    houses
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