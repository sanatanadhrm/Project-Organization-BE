const AuthenticationRepository = require("../../../Domains/authentication/AuthenticationRepository");
const LogoutUserUseCase = require("../LogoutUserUseCase");

describe('LogoutUserUseCase', () => {
    it('should orchestrating the logout action correctly', async () => {
        // Arrange
        const payload = {
            refreshToken : 'refresh_token'
        }

        const mockAuthenticationRepository = new AuthenticationRepository()

        mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
            .mockImplementation(() => Promise.resolve())
        mockAuthenticationRepository.deleteToken = jest.fn()
            .mockImplementation(() => Promise.resolve())
        
        const logoutUserUseCase = new LogoutUserUseCase({
            authenticationRepository: mockAuthenticationRepository
        })

        // Action
        await logoutUserUseCase.execute(payload)

        // Assert
        expect(mockAuthenticationRepository.checkAvailabilityToken)
            .toHaveBeenCalledWith(payload.refreshToken)
        expect(mockAuthenticationRepository.deleteToken)
            .toHaveBeenCalledWith(payload.refreshToken)
    });

    it("should throw error if use case payload not contain refreshToken", async () => {
        // Arrange
        const payload = {
            refreshToken: ""
        };
        const logoutUserUseCase = new LogoutUserUseCase({
            authenticationRepository: {}
        });

        // Action & Assert
        await expect(logoutUserUseCase.execute(payload))
            .rejects
            .toThrowError("DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN");
    });

    it("should throw error if use case payload not meet data type specification", async () => {
        // Arrange
        const payload = {
            refreshToken: 123
        };
        const logoutUserUseCase = new LogoutUserUseCase({
            authenticationRepository: {}
        });

        // Action & Assert
        await expect(logoutUserUseCase.execute(payload))
            .rejects
            .toThrowError("DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION");
    });
});