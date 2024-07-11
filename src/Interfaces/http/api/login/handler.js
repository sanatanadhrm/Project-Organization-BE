import UserRepositoryMysql from "../../../../Infrastructures/repository/UserRepositoryMysql";
import prisma from "../../../../Infrastructures/database/mysql/mysql";
import AuthenticationRepositoryMysql from "../../../../Infrastructures/repository/AuthenticationRepositoryMysql";
import bcrypt from 'bcrypt'
import JwtTokenManager from "../../../../Infrastructures/security/JwtTokenManager";
import jwt from 'jsonwebtoken';
import BcryptPasswordHash from "../../../../Infrastructures/security/BcryptPasswordHash";
import LoginUserUseCase from "../../../../Applications/usecase/LoginUserUseCase";

class LoginHandler {
    constructor(){
        this.postLoginHandler = this.postLoginHandler.bind(this);
    }
    async postLoginHandler(req, res, next) {
        console.log(req.body);
        try { 
            const userRepository = new UserRepositoryMysql(prisma);
            const authenticationRepository = new AuthenticationRepositoryMysql(prisma);
            const authenticationTokenManager = new JwtTokenManager(jwt);
            const passwordHash = new BcryptPasswordHash(bcrypt, 10);
            const loginUserUseCase = new LoginUserUseCase({
                userRepository,
                authenticationRepository,
                authenticationTokenManager,
                passwordHash
            });
            const login = await loginUserUseCase.execute(req.body);
            res.status(201).json({
                status: 'success',
                data: login
            });
        }catch(error){
            next(error);
        }
    }
}
export default LoginHandler;