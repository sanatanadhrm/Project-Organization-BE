import AddedOrganization from "../AddedOrganization"

describe('a Added Organization entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'abc',
    }

    // Action and Assert
    expect(() => new AddedOrganization(payload)).toThrow('ADDED_ORGANIZATION.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
        id: 'abc',
      name: true,
    }

    // Action and Assert
    expect(() => new AddedOrganization(payload)).toThrow('ADDED_ORGANIZATION.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })


  it('should create add organization object correctly', () => {
    // Arrange
    const payload = {
      name: 'Dicoding Indonesia',
      id: 1,
    }

    // Action
    const { id, name } = new AddedOrganization(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(name).toEqual(payload.name)
  })
})
