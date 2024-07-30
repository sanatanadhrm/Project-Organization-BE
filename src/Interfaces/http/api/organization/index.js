const { Router } = require('express');
const OrganizationHandler = require('./handler');
const routes = require('./routes');


const router = Router();

const organizationHandler = new OrganizationHandler();

routes(router, organizationHandler);

module.exports = router;