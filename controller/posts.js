var Post = require('../models/Schema.js')

exports.post = function(req, res) {
  console.log('Received new post')
  res.send('<center><h1>Thank You</h1></center>')
  console.log(req.body)

  var bluePost = new Post({ name: req.body.name, message: req.body.message });
  bluePost.save(function (err) {
    if (err) return handleError(err);
  });
}

exports.posts = function(req, res) {
  Post.find({}, function(err, data) {
    console.log('Posts Received')
    console.log(data)
    res.render('posts', {posts: data, header: 'Tests', user: req.user ? req.user : null})
  })
}

exports.upvote = function(req, res) {
  console.log("Someone upvoted the post with id = ", req.params.id)

  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log(err)
    }

    if (post === null) {
      console.log("Coudn't find the post")
      return
    }

    post.upvotes += 1
    post.save(function(error, postAfterSave) {
      if (error) {
        console.log(error)
        res.json({error: "Can't save the upvote"})
        return
      }
      res.json({success: 'Post upvoted successfully', upvotes: postAfterSave.upvotes})
    })
  })
}

exports.downvote = function(req, res) {
  console.log("Someone downvoted the post with id = ", req.params.id)

  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log(err)
    }

    if (post === null) {
      console.log("Can't find the post")
      return
    }

    post.downvotes += 1
    post.save(function(error, postAfterSave) {
      if (error) {
        console.log(error)
        res.json({error: "We couldn't save the downvote"})
        return
      }
      res.json({success: 'Post downvoted successfully', downvotes: postAfterSave.downvotes})
    })
  })
}

exports.comment = function(req, res) {
  console.log('Someone commented on the post with id = ', req.params.id)

  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log(err)
    }

    if (post === null) {
      console.log("Can't find the post")
      return
    }

    post. comment = req.body.comment
    post.save(function(error, postAfterSave) {
      if (error) {
        console.log(error)
        res.json({error: 'Error commenting'})
        return
      }
      res.json({success: 'Comment posted successfully', comments: postAfterSave})
    })
  })
}
