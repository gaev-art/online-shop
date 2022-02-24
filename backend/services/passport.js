require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/api/account/google',
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ userId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          new User({
            email: profile.emails[0].value,
            lastName: profile.name.familyName,
            firstName: profile.name.givenName,
            roles: ['User'],
            userId: profile.id,
            password: 'null',
            username: profile.displayName,
            photo: profile._json.picture,
          })
            .save()
            .then((user) => {
              done(null, user)
            })
        }
      })
    }
  )
)
