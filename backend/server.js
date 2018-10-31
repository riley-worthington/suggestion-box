const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const posts = require('./controllers/posts');
const comments = require('./controllers/comments');
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
app.post('/posts/:postId/comments', comments.addComment(db));

// GET requests
app.get('/teams/:teamId/posts', posts.getPostsByTeam(db));
app.get('/teams/:teamId/members', teams.getTeamMembers(db));
app.get('/users/:userId/teams', users.getUserTeams(db));
app.get('/posts/:postId/comments', comments.getCommentsByPost(db));
app.get('/posts/:postId', posts.getPostById(db));
app.get('/users/:userId/postVotes', users.getUserPostVotes(db));
app.get('/users/:userId/commentVotes', users.getUserCommentVotes(db));
app.get('/teams', teams.getAllTeams(db));
// app.get('')

// PUT requests
app.put('/posts/:postId/vote', votes.vote(db));
app.put('/comments/:commentId/vote', votes.vote(db));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log('app is running on port 3000');
});
