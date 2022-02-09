const {Schema, model} = require('mongoose')

const User = new Schema({
  email: {type: String, required: true, unique: true},
  lastName: {type: String, required: true},
  firstName: {type: String, required: true},
  password: {type: String, required: true},
  roles: [{type: String, ref: 'Role'}]
})

module['exports'] = model('User', User)