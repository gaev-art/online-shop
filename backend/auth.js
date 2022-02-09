require('dotenv').config();
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Role = require('./models/Role')


const generateAccessToken = (id, roles) => {
  const payload = {id, roles}
  return jwt.sign(payload, process.env.SECRET, {expiresIn: '24h'})
}

let mainToken

class auth {
  async registration(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'некоректные данные при регистрации'
        })
      }

      const {email, password, lastName, firstName} = req.body

      const candidate = await User.findOne({email})
      if (candidate) return res.status(400).json({message: 'пользователь с таким email существует'})


      const hashedPassword = await bcrypt.hash(password, 12)
      const userRole = await Role.findOne({value: 'ADMIN'})
      const user = new User({email, password: hashedPassword, lastName, firstName, roles: [userRole.value]})

      await user.save()

      res.status(201).json({message: 'пользователь создан'})
    } catch (e) {
      res.status(500).json({message: 'что-то пошло не так при регистрации, попробуйте снова!'})
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'некоректные данные при логинизации'
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({email})
      if (!user) return res.status(400).json({message: `пользователь c email:${email} не найден`})

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({message: 'некоректные данные при логинизации'})


      const token = generateAccessToken(user._id, user.roles)
      mainToken = token


      res.json({token, userId: user.id})
    } catch (e) {
      res.status(500).json({message: 'что-то пошло не так при логинизации, попробуйте снова!'})
    }
  }
  async me(req, res) {
    try {
      const token = req.headers.token

      if (mainToken === token) {
        res.json({token})
      } else {
        res.json({token: false})
      }
    } catch (e) {
      res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'})
    }
  }

//   async getUsers(req, res) {
//     try {
//       res.send('work')
//
//     } catch (e) {
//       res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'})
//     }
//   }
}

module['exports'] = new auth()