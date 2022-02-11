require('dotenv').config();
const {Router} = require('express')
const passport = require("passport");

let clientUrl = process.env.CLIENT_URL

if (process.env.NODE_ENV  === 'production') {
  clientUrl = process.env.CLIENT_PROD_URL
}

const router = Router()

router.get('/', (req, res) => {
  try {
  req.user
    ?
  res.status(200).json({user: req.user})
    :
    res.status(200).json({user: null})
  } catch (e) {
    res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'})
  }
})

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({user: req.user});
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({user: null});
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(clientUrl);
});

router.get(
  "/login",
  passport.authenticate("google", {scope: ['profile', 'email']}),
  (req, res) => {
  if (req.user) {
    res.status(200).json({user: req.user});
  }
});

router.get(
  "/api/account/google",
  passport.authenticate("google", {
    successRedirect: clientUrl,
    failureRedirect: "/login/failed",
  })
);


module['exports'] = router
