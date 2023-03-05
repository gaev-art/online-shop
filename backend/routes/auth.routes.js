require('dotenv').config();
const {Router} = require('express');
const passport = require('passport');

const router = Router();

router.get('/', (req, res) => {
  try {
    req.user
      ? res.status(200).json({
        user: {
          email: req.user.email,
          lastName: req.user.lastName,
          firstName: req.user.firstName,
          userId: req.user.userId,
          photo: req.user.photo,
          role: req.user.roles[0],
        },
      })
      : res.status(200).json({user: null});
  } catch (e) {
    res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'});
  }
});

router.get('/login/success', (req, res) => {
  req.user
    ? res.status(200).json({
      user: {
        email: req.user.email,
        lastName: req.user.lastName,
        firstName: req.user.firstName,
        userId: req.user.userId,
        photo: req.user.photo,
        role: req.user.roles[0],
      },
    })
    : res.status(200).json({user: null});
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({user: null});
});

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.get(
  '/login',
  passport.authenticate('google', {scope: ['profile', 'email']})
);

router.get(
  '/api/account/google',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

module['exports'] = router;
