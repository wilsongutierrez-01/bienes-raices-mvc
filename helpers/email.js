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
    text: `Hi ${name}!! Activate your account into realStale`,
    html: `
      <h1>Activate your account</h1>
      <p>Click in the following link to activate your account</p>
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmAccount/${token}">Activate</a>
    `
  })
}

const emailRecoverPassword = async(data) => {
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
    subject: 'Reset your password',
    text: 'Reset your password into realStale',
    html: `
      <h1>Hi ${name} you request to change password</h1>
      <p>Click in the following link to reset your password</p>
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/recover-password/${token}">Reset password</a>

      <p>If you did not request this, please ignore this email</p>
    `
  })
}

export {
  emailRegister,
  emailRecoverPassword
}