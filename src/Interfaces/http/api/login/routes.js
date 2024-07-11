const routes = (router, handler) => {
    router.post('/', handler.postLoginHandler);
  };
  
export default routes;