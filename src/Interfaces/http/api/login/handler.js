const UserRepositoryMysql = require("../../../../Infrastructures/repository/UserRepositoryMysql");
const prisma = require("../../../../Infrastructures/database/mysql/mysql");
const AuthenticationRepositoryMysql = require("../../../../Infrastructures/repository/AuthenticationRepositoryMysql");
const bcrypt = require('bcrypt');
const JwtTokenManager = require("../../../../Infrastructures/security/JwtTokenManager");
const jwt = require('jsonwebtoken');
const BcryptPasswordHash = require("../../../../Infrastructures/security/BcryptPasswordHash");
const LoginUserUseCase = require("../../../../Applications/usecase/LoginUserUseCase");

class LoginHandler {
    constructor(){
        this.postLoginHandler = this.postLoginHandler.bind(this);
    }
    async postLoginHandler(req, res, next) {
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
module.exports = LoginHandler;