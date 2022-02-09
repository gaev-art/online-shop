const {Router} = require('express')
const {check} = require('express-validator')
const auth = require('../auth')

const router = Router()

router.post(
  '/registration',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'минимальная длинна пороля 6 символов').isLength({min: 4, max: 10})
  ],
  auth.registration
)

router.post(
  '/login',
  [
    check('email', 'введите корректный email').normalizeEmail().isEmail(),
    check('password', 'введите пороль').exists()
  ],
  auth.login
)

router.get('/me', auth.me)

// router.get('/users', auth.getUsers)


module['exports'] = router
