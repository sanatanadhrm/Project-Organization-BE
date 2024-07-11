import RegisterUser from '../RegisterUser'

describe('a RegisterUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'abc',
      password: 'abc'
    }

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      email: 123,
      name: true,
      password: 'abc',
      role_id: 'user',
      category: 1
    }

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should throw error when username contains more than 50 character', () => {
    // Arrange
    const payload = {
      email: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      name: 'Dicoding Indonesia',
      password: 'abc',
      role_id: 1,
      category: 1
    }

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_LIMIT_CHAR')
  })

  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload = {
      email: 'dico ding',
      name: 'dicoding',
      password: 'abc',
      role_id: 1,
      category: 1
    }

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
  })

  it('should create registerUser object correctly', () => {
    // Arrange
    const payload = {
      email: 'dicoding@gmail.com',
      name: 'Dicoding Indonesia',
      password: 'abc',
      role_id: 1,
      category: 1
    }

    // Action
    const { email, name, password, role_id, category } = new RegisterUser(payload)

    // Assert
    expect(email).toEqual(payload.email)
    expect(name).toEqual(payload.name)
    expect(password).toEqual(payload.password)
    expect(role_id).toEqual(payload.role_id)
    expect(category).toEqual(payload.category)
  })
})
