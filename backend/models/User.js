const { Schema, model } = require('mongoose')

const User = new Schema({
  email: { type: String, unique: true },
  lastName: { type: String },
  firstName: { type: String },
  userId: { type: Number },
  photo: { type: String },
  password: { type: String },
  roles: [{ type: String, ref: 'Role' }],
})

module['exports'] = model('User', User)
