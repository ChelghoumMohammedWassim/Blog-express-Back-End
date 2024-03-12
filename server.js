const express= require("express");
const app= express();
app.use(express.json());

const usersRoot= require('./src/users/routes');
app.use('/User', usersRoot);

const followsRoot= require('./src/follows/routes');
app.use('/Follow', followsRoot);

const postsRoot= require('./src/Posts/routes');
app.use('/Post', postsRoot);

const commentsRoot = require('./src/comments/routes');
app.use('/comments', commentsRoot);

const likesRoot = require('./src/likes/routes');
app.use('/likes', likesRoot);

app.get('/', (req, res)=> res.send('Hello world connected to server.'));
app.listen(3000,()=>console.log('http://localhost:3000/'));
