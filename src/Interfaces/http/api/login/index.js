import { Router } from 'express';
import LoginHandler from './handler';
import routes from './routes';


const router = Router();

const loginHandler = new LoginHandler();

routes(router, loginHandler);

export default router;
