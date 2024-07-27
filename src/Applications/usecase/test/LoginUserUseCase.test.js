const AuthenticationRepository  = require("../../../Domains/authentication/AuthenticationRepository");
const NewAuthentication  = require("../../../Domains/authentication/entities/NewAuthentication");
const UserRepository = require("../../../Domains/users/UserRepository");
const AuthenticationTokenManager = require("../../security/AuthenticationTokenManager");
const PasswordHash = require("../../security/PasswordHash");
const LoginUserUseCase = require("../LoginUserUseCase");
describe('GetAuthenticationUseCase', () => {
    it('should orchestrating the get authentication action correctly', async () => {
      // Arrange
      const useCasePayload = {
        email: 'dicoding@gmail.com',
        password: 'secret'
      }
      const mockedAuthentication = new NewAuthentication({
        accessToken: 'access_token',
        refreshToken: 'refresh_token'
      })
      const mockUserRepository = new UserRepository()
      const mockAuthenticationRepository = new AuthenticationRepository()
      const mockAuthenticationTokenManager = new AuthenticationTokenManager()
      const mockPasswordHash = new PasswordHash()
  
      // Mocking
      mockUserRepository.getPasswordByEmail = jest.fn()
        .mockImplementation(() => Promise.resolve('encrypted_password'))
      mockPasswordHash.comparePassword = jest.fn()
        .mockImplementation(() => Promise.resolve())
      mockAuthenticationTokenManager.createAccessToken = jest.fn()
        .mockImplementation(() => Promise.resolve(mockedAuthentication.accessToken))
      mockAuthenticationTokenManager.createRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve(mockedAuthentication.refreshToken))
      mockUserRepository.getIdByEmail = jest.fn()
        .mockImplementation(() => Promise.resolve(1))
      mockAuthenticationRepository.addToken = jest.fn()
        .mockImplementation(() => Promise.resolve())
  
      // create use case instance
      const loginUserUseCase = new LoginUserUseCase({
        userRepository: mockUserRepository,
        authenticationRepository: mockAuthenticationRepository,
        authenticationTokenManager: mockAuthenticationTokenManager,
        passwordHash: mockPasswordHash
      })
  
      // Action
      const actualAuthentication = await loginUserUseCase.execute(useCasePayload)
  
      // Assert
      expect(actualAuthentication).toEqual(new NewAuthentication({
        accessToken: 'access_token',
        refreshToken: 'refresh_token'
      }))
      expect(mockUserRepository.getPasswordByEmail)
        .toHaveBeenCalledWith(useCasePayload.email)
      expect(mockPasswordHash.comparePassword)
        .toHaveBeenCalledWith('secret', 'encrypted_password')
      expect(mockUserRepository.getIdByEmail)
        .toHaveBeenCalledWith(useCasePayload.email)
      expect(mockAuthenticationTokenManager.createAccessToken)
        .toHaveBeenCalledWith({ email: useCasePayload.email, id: 1 })
      expect(mockAuthenticationTokenManager.createRefreshToken)
        .toHaveBeenCalledWith({ email: useCasePayload.email, id: 1 })
      expect(mockAuthenticationRepository.addToken)
        .toHaveBeenCalledWith(mockedAuthentication.refreshToken)
    })
  })