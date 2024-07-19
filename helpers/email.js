import nodemailer from 'nodemailer';

const emailRegister = async(data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  const { name, email, token } = data

  await transport.sendMail({
    from: 'realStale@gmail.com',
    to: email,
    subject: 'Activate your account',
    text: 'Activate your account into realStale',
    html: `
      <h1>Activate your account</h1>
      <p>Click in the following link to activate your account</p>
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmAccount/${token}">Activate</a>
    `
  })
}

export {
  emailRegister
}