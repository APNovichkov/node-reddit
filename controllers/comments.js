const Comment = require('../models/comment')
const Post = require('../models/post');

module.exports = (app) => {
    app.post('/posts/:postId/comments', (req, res) => {
        console.log("Hello from post!")
        const comment = new Comment(req.body);
        comment
            .save()
            .then(comment => {
                return Post.findById(req.params.postId)
            })
            .then(post => {
                post.comments.unshift(comment);
                return post.save();
            })
            .then(post => {
                return res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            })
    })
};
