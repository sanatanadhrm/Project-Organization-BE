const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const AddUserUseCase = require('../AddUserUseCase');
const CategoryRepository = require('../../../Domains/category/CategoryRepository');
const OrganizationRepository = require('../../../Domains/organization/OrganizationRepository');
const AddedOrganization = require('../../../Domains/organization/entities/AddedOrganization');
const AddOrganization = require('../../../Domains/organization/entities/AddOrganization');
const RoleRepository = require('../../../Domains/role/RoleRepository');


describe('AddUserUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      email: 'dicoding@gmail.com',
      password: 'secret',
      name: 'Dicoding Indonesia',
      role_id: 1,
      category: 1
    }

    const mockAddedOrganization = new AddedOrganization({
      id: 1,
      name: useCasePayload.name,
    })

    const mockAddedUser = new RegisteredUser({
      id: 1,
      email: useCasePayload.email,
      name: useCasePayload.name,
    })

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository()
    const mockPasswordHash = new PasswordHash()
    const mockCategoryRepository = new CategoryRepository()
    const mockOrganizationRepository = new OrganizationRepository()
    const mockRoleRepository = new RoleRepository()

    /** mocking needed function */
    mockUserRepository.verifyAvailableEmail = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCategoryRepository.findCategoryById = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockRoleRepository.findRoleById = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockPasswordHash.hash = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'))
    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedUser))
    mockOrganizationRepository.createOrganization = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedOrganization))
    
    /** creating use case instance */
    const getUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
      categoryRepository: mockCategoryRepository,
      organizationRepository: mockOrganizationRepository,
      roleRepository: mockRoleRepository
    })

    // Action
    const addedOrganization = await getUserUseCase.execute(useCasePayload)

    // Assert
    expect(addedOrganization).toStrictEqual(new AddedOrganization({
      id: 1,
      name: useCasePayload.name,
    }))
    expect(mockUserRepository.verifyAvailableEmail).toHaveBeenCalledWith(useCasePayload.email)
    expect(mockPasswordHash.hash).toHaveBeenCalledWith(useCasePayload.password)
    expect(mockRoleRepository.findRoleById).toHaveBeenCalledWith(useCasePayload.role_id)
    expect(mockOrganizationRepository.createOrganization).toHaveBeenCalledWith(new AddOrganization({
      name: useCasePayload.name,
      user_id: mockAddedUser.id,
      category_id: useCasePayload.category
    }))
    expect(mockCategoryRepository.findCategoryById).toHaveBeenCalledWith(useCasePayload.category)
    expect(mockUserRepository.addUser).toHaveBeenCalledWith(new RegisterUser({
      email: useCasePayload.email,
      password: "encrypted_password",
      name: useCasePayload.name,
      role_id: useCasePayload.role_id,
      category: useCasePayload.category
    }))
  })
})
