const routes = (router, handler) => {
    router.post('/add', handler.postRoleHandler);
    router.get('/', handler.getRoleHandler);
  };
  
module.exports = routes;