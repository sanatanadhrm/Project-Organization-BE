const GetOrganization = require('../GetOrganization')

describe('a GetOrganization entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
        name: 'organization',
        createdAt: '2021-09-28T07:50:40.017Z',
        updatedAt: '2021-09-28T07:50:40.017Z'
        }

        // Action and Assert
        expect(() => new GetOrganization(payload)).toThrowError('GET_ORGANIZATION.NOT_CONTAIN_NEEDED_PROPERTY')

    })

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
        id: 'organization-123',
        name: 'organization',
        user_id: 1,
        category_id: 1,
        createdAt: '2021-09-28T07:50:40.017Z',
        updatedAt: '2021-09-28T07:50:40.017Z'
        }

        // Action and Assert
        expect(() => new GetOrganization(payload)).toThrowError('GET_ORGANIZATION.NOT_MEET_DATA_TYPE_SPECIFICATION')

    })

    it('should create GetOrganization object correctly', () => {
        // Arrange
        const payload = {
        id: 1,
        name: 'organization',
        user_id: 1,
        category_id: 1,
        createdAt: '2021-09-28T07:50:40.017Z',
        updatedAt: '2021-09-28T07:50:40.017Z'
        }

        // Action
        const { id, name, user_id, category_id, createdAt, updatedAt } = new GetOrganization(payload)

        // Assert
        expect(id).toEqual(payload.id)
        expect(name).toEqual(payload.name)
        expect(user_id).toEqual(payload.user_id)
        expect(category_id).toEqual(payload.category_id)
        expect(createdAt).toEqual(new Date(payload.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }))
        expect(updatedAt).toEqual(new Date(payload.updatedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }))
    })
    
})