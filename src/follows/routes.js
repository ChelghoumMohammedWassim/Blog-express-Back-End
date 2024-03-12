const express = require('express');
const controller= require('./controller');
const route = express();

route.post("/", controller.createFollowRelation);
route.delete("/", controller.deleteFollowRelation);
route.get('/Followers', controller.getFollowersByUserID);
route.get('/Followings', controller.getFollowingsByUserID);

module.exports = route;