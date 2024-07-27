const AuthenticationRepository = require("../../Domains/authentication/AuthenticationRepository");
const InvariantError = require("../../Commons/InvariantError");

class AuthenticationRepositoryMysql extends AuthenticationRepository {
  constructor(prisma) {
    super();
    this._prisma = prisma;
  }

  async addToken(token) {
    await this._prisma.authentication.create({
      data: {token},
    });
  }

  async checkAvailabilityToken(token) {
    const responsetoken = await this._prisma.authentication.findFirst({
      where: {
        token,
      },
    });
    if (!responsetoken) {
      throw new InvariantError("TOKEN_NOT_FOUND");
    }
  }

  async deleteToken(token) {
    await this._prisma.authentication.delete({
      where: {
        token: token,
      },
    });
  }
}
module.exports = AuthenticationRepositoryMysql;