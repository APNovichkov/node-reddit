$(document).ready(function() {
    $(".vote-up").submit(function(e) {
      e.preventDefault();
  
      var postId = $(this).data("id");
      console.log('post id: ' + postId)
      url = `${postId}/vote-up`
      console.log('post url: ' + url)
      $.ajax({
        type: "PUT",
        url: url,
        success: function(data) {
          console.log("voted up!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });
  
    $(".vote-down").submit(function(e) {
      e.preventDefault();
  
      var postId = $(this).data("id");
      $.ajax({
        type: "PUT",
        url: "posts/" + postId + "/vote-down",
        success: function(data) {
          console.log("voted down!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });
  });