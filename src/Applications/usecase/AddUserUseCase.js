import RegisterUser from '../../Domains/users/entities/RegisterUser'
import AddOrganization from '../../Domains/organization/entities/AddOrganization'

class AddUserUseCase {
  constructor ({ userRepository, passwordHash, categoryRepository, organizationRepository, roleRepository}) {
    
    this._userRepository = userRepository
    this._passwordHash = passwordHash
    this._categoryRepository = categoryRepository
    this._organizationRepository = organizationRepository
    this._roleRepository = roleRepository
  }

  async execute (useCasePayload) {
    
    const registerUser = new RegisterUser(useCasePayload)
    await this._userRepository.verifyAvailableEmail(registerUser.email)
    
    await this._categoryRepository.findCategoryById(registerUser.category)
    await this._roleRepository.findRoleById(registerUser.role_id)
    
    registerUser.password = await this._passwordHash.hash(registerUser.password)
    const registered = await this._userRepository.addUser(registerUser)
    return this._organizationRepository.createOrganization(
      new AddOrganization({
        name: registerUser.name,
        user_id: registered.id,
        category_id: registerUser.category
      })
    )
  }
}

export default AddUserUseCase