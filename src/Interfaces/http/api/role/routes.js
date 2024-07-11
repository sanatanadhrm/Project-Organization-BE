const routes = (router, handler) => {
    router.post('/add', handler.postRoleHandler);
  };
  
  export default routes;