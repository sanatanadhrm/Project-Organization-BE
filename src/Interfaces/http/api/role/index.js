const { Router } = require('express');
const RoleHandler = require('./handler');
const routes = require('./routes');


const router = Router();

const roleHandler = new RoleHandler();

routes(router, roleHandler);

module.exports = router;
