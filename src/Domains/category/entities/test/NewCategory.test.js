import NewCategory from "../NewCategory";

describe('a Category entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {

    }

    // Action and Assert
    expect(() => new NewCategory(payload)).toThrowError('NEW_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 123,
    }

    // Action and Assert
    expect(() => new NewCategory(payload)).toThrowError('NEW_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create new category object correctly', () => {
    // Arrange
    const payload = {
      name: 'sports'
    }

    // Action
    const { name} = new NewCategory(payload)

    // Assert
    expect(name).toEqual(payload.name)

  })
})
