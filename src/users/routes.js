const express= require('express');
const route= express();
const controller = require('./controller');

route.post('/',controller.createUser);

route.delete('/', controller.deleteUser);

route.put('/', controller.updateUser);

route.get('/', controller.login);


module.exports= route;