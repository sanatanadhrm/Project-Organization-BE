
import NewAuthentication from '../../Domains/authentication/entities/NewAuthentication'
import UserLogin from '../../Domains/users/entities/UserLogin'

class LoginUserUseCase {
  constructor ({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash
  }) {
    this._userRepository = userRepository
    this._authenticationRepository = authenticationRepository
    this._authenticationTokenManager = authenticationTokenManager
    this._passwordHash = passwordHash
  }

  async execute (useCasePayload) {
    const { email, password } = new UserLogin(useCasePayload)
    console.log(email, password)
    const encryptedPassword = await this._userRepository.getPasswordByEmail(email)
    
    await this._passwordHash.comparePassword(password, encryptedPassword)

    const id = await this._userRepository.getIdByEmail(email)

    const accessToken = await this._authenticationTokenManager
      .createAccessToken({ email, id })
    const refreshToken = await this._authenticationTokenManager
      .createRefreshToken({ email, id })

    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken
    })

    await this._authenticationRepository.addToken(newAuthentication.refreshToken)

    return newAuthentication
  }
}
export default LoginUserUseCase

module.exports = LoginUserUseCase
