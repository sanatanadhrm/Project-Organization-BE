const LogoutUserUseCase = require("../../../../Applications/usecase/LogoutUserUseCase");
const AuthenticationRepositoryMysql = require("../../../../Infrastructures/repository/AuthenticationRepositoryMysql");
const prisma = require("../../../../Infrastructures/database/mysql/mysql");

class LogoutHandler {
    constructor(){
        this.postLogoutHandler = this.postLogoutHandler.bind(this);
    }

    async postLogoutHandler(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const authenticationRepository = new AuthenticationRepositoryMysql(prisma);
            const logoutUserUseCase = new LogoutUserUseCase({
                authenticationRepository
            });
            await logoutUserUseCase.execute({ refreshToken });
            res.status(200).json({
                status: 'success',
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = LogoutHandler;