const { Router } = require('express');
const LoginHandler = require('./handler');
const routes = require('./routes');


const router = Router();

const loginHandler = new LoginHandler();

routes(router, loginHandler);

module.exports = router;
