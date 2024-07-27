const routes = (router, handler) => {
    router.post('/add', handler.postUserHandler);
  };
  
module.exports = routes;