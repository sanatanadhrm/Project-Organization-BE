const RegisteredUser = require('../RegisteredUser')

describe('a RegisteredUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      email: 'dicoding@gmail.com',
      name: 'Dicoding Indonesia'
    }

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: "123",
      email: 'dicoding@gmail.com',
      name: {}
    }

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create registeredUser object correctly', () => {
    // Arrange
    const payload = {
      id: 1,
      email: 'dicoding@gmail.com',
      name: 'Dicoding Indonesia'
    }

    // Action
    const registeredUser = new RegisteredUser(payload)

    // Assert
    expect(registeredUser.id).toEqual(payload.id)
    expect(registeredUser.email).toEqual(payload.email)
    expect(registeredUser.name).toEqual(payload.name)
  })
})
