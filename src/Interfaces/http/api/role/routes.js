const routes = (router, handler) => {
    router.post('/add', handler.postRoleHandler);
  };
  
module.exports = routes;