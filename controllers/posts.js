const Post = require('../models/post');

module.exports = (app) => {
    app.get('/posts/new', (req, res) => {
        res.render('posts-new')
    })

    app.post('/posts/new', (req, res) => {
        if(req.user){
            const post = new Post(req.body);
            post.save((err, s) => {
                return res.redirect(`/`);
            })
        }else{
            res.sendStatus(401); // Unauthorized!
        }
    });

    app.get('/', (req, res) => {
        var currentUser = req.user;

        Post.find({}).lean()
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
    })

    app.get("/posts/:id", function(req, res) {
        var currentUser = req.user;

        Post.findById(req.params.id).populate('comments').lean()
        .then(post => {
            res.render("posts-show", { post, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
    });


    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        var currentUser = req.user;

        Post.find({ subreddit: req.params.subreddit }).lean()
          .then(posts => {
            res.render("posts-index", { posts, currentUser });
          })
          .catch(err => {
            console.log(err);
          });
    });

};
