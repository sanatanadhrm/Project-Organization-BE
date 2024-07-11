import AddedCategory from "../AddedCategory"
describe('a AddedCategory entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
        id: 1
    }

    // Action and Assert
    expect(() => new AddedCategory(payload)).toThrowError('ADDED_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 123,
        id: '1'
    }

    // Action and Assert
    expect(() => new AddedCategory(payload)).toThrowError('ADDED_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create added category object correctly', () => {
    // Arrange
    const payload = {
        id: 1,
      name: 'sports'
    }

    // Action
    const { name, id } = new AddedCategory(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(name).toEqual(payload.name)

  })
})
