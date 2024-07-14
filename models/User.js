import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const User = db.define('users',{
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: DataTypes.STRING,
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

export default User