const express= require('express');
const route= express();
const controller= require('./controller');

route.get('/', controller.getPostComments);
route.post('/', controller.createComment);
route.put('/', controller.updateComment);
route.delete('/', controller.deleteComment);

module.exports= route;