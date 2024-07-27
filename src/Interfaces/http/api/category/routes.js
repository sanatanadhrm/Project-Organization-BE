const routes = (router, handler) => {
    router.post('/add', handler.postCategoryHandler);
    router.get('/', handler.getCategoryHandler);
  };
  
module.exports = routes;