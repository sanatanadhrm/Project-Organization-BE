const express = require('express');
const { json, urlencoded } = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const users = require('../../Interfaces/http/api/users');
const category = require('../../Interfaces/http/api/category');
const roles = require('../../Interfaces/http/api/role');
const login = require('../../Interfaces/http/api/login');

const ClientError = require('../../Commons/ClientError');
const DomainErrorTranslator = require('../../Commons/DomainErrorTranslator');

const createServer = () => {
    const app = express();

    // Middleware untuk JWT
    app.use(json());
    app.use(cors());
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
module.exports = createServer;