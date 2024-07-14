const loginForm = (req, res) => {
  res.render('auth/login', {
    page: 'Sign in',
  });
}

const signupForm = (req, res) => {
  res.render('auth/singup', {
    page: 'Sign up',
  });
}

const recoverPassword = (req, res) => {
  res.render('auth/recoverPassword', {
    page: 'Recover Password',
  });
}
export {
  loginForm,
  signupForm,
  recoverPassword
}