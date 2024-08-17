import bcrypt from 'bcrypt';

const users = [
  {
    name: 'guti',
    email: 'guti@mail.com', 
    password: bcrypt.hashSync('123456', 10),
    confirmed: 1
  },
  {
    name:'jovel',
    email: 'jovel@mail.com',
    password: bcrypt.hashSync('123456', 10),
    confirmed: 1
  }
]

export default users