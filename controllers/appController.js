const home = (req, res) => {
  res.render('home', { 
    page: 'Home' 
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