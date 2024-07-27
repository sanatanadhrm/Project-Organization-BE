const routes = (router, handler) => {
    router.post('/', handler.postLoginHandler);
  };
  
module.exports = routes;