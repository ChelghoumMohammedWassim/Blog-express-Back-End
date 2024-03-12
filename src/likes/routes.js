const express= require('express');
const route= express();
const controller= require('./controller');

route.get('/', controller.getPostLikes);
route.post('/', controller.createLike);
route.delete('/', controller.deleteLike);

module.exports= route;