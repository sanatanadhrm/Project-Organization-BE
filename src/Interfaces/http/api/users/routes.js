const routes = (router, handler) => {
    router.post('/add', handler.postUserHandler);
  };
  
  export default routes;