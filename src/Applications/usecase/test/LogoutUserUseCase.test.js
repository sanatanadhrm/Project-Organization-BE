import { default as AuthenticationRepository } from "../../../Domains/authentication/AuthenticationRepository";
import LogoutUserUseCase from "../LogoutUserUseCase";

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
});