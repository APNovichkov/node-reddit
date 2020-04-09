// Require Libraries
const express = require('express');

// App Setup
const app = express();

// Middleware
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());


// Add controllers
require('./controllers/posts.js')(app);
require('./data/reddit-db');

// GET Routes

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
})





// Start Server
app.listen(3000, () => {
    console.log('Reddit listening on port localhost:3000!');
});
