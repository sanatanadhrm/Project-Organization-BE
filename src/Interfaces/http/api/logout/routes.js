const routes = (router, handler) => {
    router.post('/', handler.postLogoutHandler);
  };
  
module.exports = routes;