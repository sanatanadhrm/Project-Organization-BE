const routes = (router, handler) => {
    router.post('/add', handler.postCategoryHandler);
  };
  
export default routes;