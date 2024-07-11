import { Router } from 'express';
import CategoryHandler from './handler';
import routes from './routes';


const router = Router();

const categoryHandler = new CategoryHandler();

routes(router, categoryHandler);

export default router;
