const AddOrganization = require('../AddOrganization')

describe('a Add Organization entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'abc',
      user_id: 1
    }

    // Action and Assert
    expect(() => new AddOrganization(payload)).toThrow('ADD_ORGANIZATION.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      name: true,
      user_id: 'abc',
      category_id: 1
    }

    // Action and Assert
    expect(() => new AddOrganization(payload)).toThrow('ADD_ORGANIZATION.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })


  it('should create add organization object correctly', () => {
    // Arrange
    const payload = {
      name: 'Dicoding Indonesia',
      category_id: 1,
      user_id: 1
    }

    // Action
    const { name, user_id,  category_id } = new AddOrganization(payload)

    // Assert
    expect(name).toEqual(payload.name)
    expect(user_id).toEqual(payload.user_id)
    expect(category_id).toEqual(payload.category_id)
  })
})
