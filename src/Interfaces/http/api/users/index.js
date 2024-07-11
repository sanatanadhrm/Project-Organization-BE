import { Router } from 'express';
import UsersHandler from './handler';
import routes from './routes';


const router = Router();

const usersHandler = new UsersHandler();

routes(router, usersHandler);

export default router;
