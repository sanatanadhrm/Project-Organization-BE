import express, { json, urlencoded } from 'express';
import jwt from 'jsonwebtoken';

import users from '../../Interfaces/http/api/users';
import category from '../../Interfaces/http/api/category'
import roles from '../../Interfaces/http/api/role'
import login from '../../Interfaces/http/api/login'

import ClientError from '../../Commons/ClientError';
import DomainErrorTranslator from '../../Commons/DomainErrorTranslator';

const createServer = () => {
    const app = express();

    // Middleware untuk JWT
    app.use(json());
    app.use(urlencoded({ extended: true }));
    const errorHandler = (err, req, res, next) => {
        if (err instanceof Error) {
          const translatedError =  DomainErrorTranslator.translate(err);
          if (translatedError instanceof ClientError) {
            return res.status(translatedError.statusCode).json({
              status: 'fail',
              message: translatedError.message,
            });
          }else{
            return res.status(500).json({
              status: 'fail',
              message: 'Something went wrong',
            });
          }
      };
    };
    const authenticateJWT = (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
      
        if (!token) {
          return res.status(401).json({
            status: 'fail',
            message: 'Missing authentication token',
          });
        }
      
        try {
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
            req.user = verified;
            next();
          } catch (err) {
            res.status(400).send({ message: 'Invalid Token' });
          }
      };
    // const userHandler = new UsersHandler();
    app.use('/users', users);
    app.use('/category', category);
    app.use('/roles', roles);
    app.use('/sign-in', login);
    app.use(authenticateJWT);
   
    
    app.use(errorHandler);
    return app;
};
export default createServer;