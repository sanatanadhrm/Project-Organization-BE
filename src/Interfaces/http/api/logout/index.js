const { Router } = require('express');
const LogoutHandler = require('./handler');
const routes = require('./routes');


const router = Router();

const logoutHandler = new LogoutHandler();

routes(router, logoutHandler);

module.exports = router;