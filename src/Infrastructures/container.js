import { createContainer } from 'instances-container';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from "./database/mysql/mysql";

import UserRepositoryMysql from './repository/UserRepositoryMysql';
import BcryptPasswordHash from './security/BcryptPasswordHash';

import AddUserUseCase from '../Applications/usecase/AddUserUseCase';
import UserRepository from '../Domains/users/UserRepository';
import PasswordHash from '../Applications/security/PasswordHash';

const container = createContainer();

container.register([
    {
        key: UserRepository.name,
        Class: UserRepositoryMysql,
        parameter:{
            dependencies:[
                {
                    concrete: mysql,
                }
            ]
        }
    },
    {
        key: PasswordHash.name,
        Class: BcryptPasswordHash,
        parameter: {
          dependencies: [
            {
              concrete: bcrypt,
            },
          ],
        },
      },
])

container.register([
    {
        key: AddUserUseCase.name,
        Class: AddUserUseCase,
        parameter:{
            injectType: 'destructuring',
            dependencies:[
                {
                   name: 'userRepository',
                   internal: UserRepository.name
                },
                {
                    name: 'passwordHash',
                   internal: PasswordHash.name
                }
            ]
        }
    }
]);