$( document ).ready(function() {
  console.log('ready!');

  $( "#postsB" ).click(function() {
    window.location = '/posts';
  });

  $( "#loginB" ).click(function() {
    window.location = '/login';
  });

  $( "#signupB" ).click(function() {
    window.location = '/signup';
  });

  $( "#homeB" ).click(function() {
    window.location = '/';
  });

  $('.upvote').on('click', function(e) {
    console.log('upvote');

    console.log($(e.target)[0])
    const postId = $(e.target)[0].dataset.id
    console.log(postId)
    $.ajax({
      method: 'GET',
      url:`/upvote-post/${postId}`,
    })
    .done(function(response) {
      console.log(response)
      $(`p#${postId} > span.upvotes-count`)[0].innerText = ' ' + response.upvotes
    })
  })

  $('.downvote').on('click', function(e) {
    console.log('downvote');

    console.log($(e.target)[0])
    const postId = $(e.target)[0].dataset.id
    console.log(postId)
    $.ajax({
      method: 'GET',
      url:`/downvote-post/${postId}`,
    })
    .done(function(response) {
      console.log(response)
      $(`p#${postId} > span.downvotes-count`)[0].innerText = ' ' + response.downvotes
    })
  })

  $('.comment').on('click', function(e) {
    console.log($(e.target)[0])
    const postId = $(e.target)[0].dataset.id
    console.log(postId)
    $.ajax({
      method: 'POST',
      url:`/comment-post/${postId}`,
      data: {comment: }
    })
    .done(function(response) {
      console.log(response)

    })

  })

})
