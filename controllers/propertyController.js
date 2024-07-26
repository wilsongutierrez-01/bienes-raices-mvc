const admin = (req, res) => {
  res.render('properties/admin',{
    page: 'My Properties',
    header: true
  })
}

//Form to create property
const create = (req, res) => {
  res.render('properties/create',{
    page: 'Create Property',
    header: true
  })
}
export {
  admin,
  create
}