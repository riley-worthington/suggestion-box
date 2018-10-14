const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const posts = require('./controllers/posts');
const teams = require('./controllers/teams');
const users = require('./controllers/users');
const votes = require('./controllers/votes');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'riley',
    password : '',
    database : 'suggestion-box'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("It's working");
})

// POST requests
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.post('/teams', teams.createNewTeam(db));
app.post('/posts', posts.createNewPost(db));
app.post('/teams/:teamId/members', teams.addTeamMember(db));
// app.post('/posts/:postId/comments', comments.addComment(db));

// GET requests
app.get('/teams/:teamId/posts', posts.getPosts(db));
app.get('/teams/:teamId/members', teams.getTeamMembers(db));
app.get('/users/:userId/teams', users.getUserTeams(db));
// app.get('')

// PUT requests
app.put('/posts/:postId/vote', votes.voteOnPost(db));

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
