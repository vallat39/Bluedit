exports.home = function (req, res) {
  res.render('index')
}

exports.login = function(req, res) {
  res.render('login')
}

exports.signup = function(req, res) {
  res.render('signup')
}
