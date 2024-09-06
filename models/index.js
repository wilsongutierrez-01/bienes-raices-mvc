import Property from './Property.js'
import Price from './Price.js'
import Category from './Category.js'
import User from './User.js'
import Message from './Message.js'

Property.belongsTo(Category)
Property.belongsTo(Price)
Property.belongsTo(User)
Property.hasMany(Message)

Message.belongsTo(User)
Message.belongsTo(Property)

export {
  Property,
  Price,
  Category,
  User,
  Message
}