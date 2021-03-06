const Post = require('../models/post');
const User = require('../models/user')

module.exports = (app) => {
    app.get('/posts/new', (req, res) => {
        var currentUser = req.user;

        res.render('posts-new', { currentUser })
    })

    app.post('/posts/new', (req, res) => {
        console.log("Submitting post")
        if(req.user){
            const post = new Post(req.body);
            post.author = req.user;
            post.upVotes = [];
            post.downVotes = [];
            post.voteScore = 0;

            console.log("User is not null")

            post.save()
            .then(post => {
                return User.findById(req.user._id)
            })
            .then(user => {
                console.log(`User id: ${req.user._id}`)
                user.posts.unshift(post);
                user.save()
                res.redirect(`/posts/${post._id}`)
            })
            .catch(err => {
                console.log("Error!")
                console.log(err.message);
            })
        }else{
            console.log("User is not authorized")
            res.sendStatus(401); // Unauthorized!
        }
    });

    app.get('/', (req, res) => {
        var currentUser = req.user;

        Post.find().populate('author')
            .lean()
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
    })

    app.get("/posts/:id", function(req, res) {
        var currentUser = req.user;

        Post.findById(req.params.id)
            .lean()
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

        Post.find({ subreddit: req.params.subreddit })
            .lean()
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    });

    // For voting up and down
    app.put("/posts/:id/vote-up", function(req, res) {
        Post.findById(req.params.id).exec(function(err, post) {
            console.log("Found post: " + post.title)
            post.upVotes.push(req.user._id);
            post.voteScore = post.voteScore + 1;
            post.save();
            res.status(200);
        });
      });
      
    app.put("/posts/:id/vote-down", function(req, res) {
        Post.findById(req.params.id).exec(function(err, post) {
            post.downVotes.push(req.user._id);
            post.voteScore = post.voteScore - 1;
            post.save();
            res.status(200);
        });
    });

};
