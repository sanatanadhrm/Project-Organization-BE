import { Router } from 'express';
import RoleHandler from './handler';
import routes from './routes';


const router = Router();

const roleHandler = new RoleHandler();

routes(router, roleHandler);

export default router;
