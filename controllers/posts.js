const Post = require('../models/post');

module.exports = (app) => {
    app.post('/posts/new', (req, res) => {
        const post = new Post(req.body);
        post.save((err, s) => {
            return res.redirect(`/`);
        })
    });
    app.get('/', (req, res) => {
        Post.find({}).lean()
            .then(posts => {
                res.render("posts-index", { posts });
            })
            .catch(err => {
                console.log(err.message);
            });
    })

};
