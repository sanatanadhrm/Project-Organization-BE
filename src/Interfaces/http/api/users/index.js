const { Router } = require('express');
const UsersHandler = require('./handler');
const routes = require('./routes');



const router = Router();

const usersHandler = new UsersHandler();

routes(router, usersHandler);

module.exports = router;
