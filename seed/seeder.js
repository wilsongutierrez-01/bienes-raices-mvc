import categories from "./categories.js"
import prices from "./prices.js"
import users from "./users.js"
import db from "../config/db.js"
import { Category, Price, User } from '../models/index.js'

const importData = async () => {
  try {
    await db.authenticate()
    await db.sync()

    await Promise.all([
      Category.bulkCreate(categories),
      Price.bulkCreate(prices),
      User.bulkCreate(users)
    ])
    console.log("Data imported successfully")
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {

    await db.sync({ force: true })
    console.log('Data destroyed successfully')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

if (process.argv[2] === "-i") {
  importData()
}

if (process.argv[2] === "-d") {
  destroyData()
}