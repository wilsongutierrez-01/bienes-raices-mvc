import Property from './Property.js'
import Price from './Price.js'
import Category from './Category.js'
import User from './User.js'

Price.hasOne(Property)
Category.hasOne(Property)
User.hasOne(Property)

export {
  Property,
  Price,
  Category,
  User
}