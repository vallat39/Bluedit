const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/userSchema.js')

exports.newUser = function(req, res) {
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const confpass = req.body.confpass

  if(email === '' || username === '' || password === '' || confpass === '') {
    res.send('<h1> Please fill out the form </h1>')
    console.log('Usrnm:'+ username)
    console.log('Pass:'+ password)
    console.log('ConfPass:' + confpass)
    return
  }

  if (password !== confpass) {
    console.log('Pass:'+ password)
    console.log('ConfPass:' + confpass)
    res.send('<h1> Passwords do not match </h1>')
    return
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
    var user = new User({email: email, username: username, password: hash})
    user.save(function(err, savedUser) {
      if (err) {
        res.send('<h1> Sorry, something went wrong </h1>')
        return
      }
      console.log('User created')
      console.log(savedUser)
    res.send('<h1> Thank you for creating an account </h1>')
    })
  })
}
