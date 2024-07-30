const routes = (router, handler) => {
    router.get('/', handler.getOrganizationHandler);
  };
  
module.exports = routes;