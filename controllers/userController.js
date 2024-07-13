const loginForm = (req, res) => {
  res.render('auth/login', {
    
  });
}

const signupForm = (req, res) => {
  res.render('auth/singup', {
    page: 'Crear cuenta',
  });
}

export {
  loginForm,
  signupForm
}