const express = require('express');
const controller= require('./controller');
const route = express();

route.post('/', controller.createPost);

route.put('/', controller.updatePost);

route.delete('/', controller.deletePost);

route.get('/',controller.getPosts);
route.get('/:id',controller.getPostsByUserID);

module.exports= route;