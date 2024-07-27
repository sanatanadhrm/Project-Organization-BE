const routes = (router, handler) => {
    router.post('/add', handler.postCategoryHandler);
  };
  
module.exports = routes;