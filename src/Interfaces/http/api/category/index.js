const { Router } = require('express');
const CategoryHandler = require('./handler');
const routes = require('./routes');


const router = Router();

const categoryHandler = new CategoryHandler();

routes(router, categoryHandler);

module.exports = router;
