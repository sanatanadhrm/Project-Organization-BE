class GetOrganization {
    constructor (payload) {
        this._verifyPayload(payload)
    
        const { id, name, user_id, category_id, createdAt, updatedAt } = payload
        
        this.id = id
        this.name = name
        this.user_id = user_id
        this.category_id = category_id
        this.createdAt = new Date(createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
        this.updatedAt = new Date(updatedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    
        }

    _verifyPayload ({ id, name, user_id, category_id, createdAt, updatedAt }) {
        if (!id || !name || !user_id || !category_id || !createdAt || !updatedAt) {
            throw new Error('GET_ORGANIZATION.NOT_CONTAIN_NEEDED_PROPERTY')
        }
    
        if (typeof id !== 'number' || typeof name !== 'string' || typeof user_id !== 'number' || typeof category_id !== 'number' || typeof createdAt !== 'string' || typeof updatedAt !== 'string') {
            throw new Error('GET_ORGANIZATION.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}
module.exports = GetOrganization