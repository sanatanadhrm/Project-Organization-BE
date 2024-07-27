class AddOrganization {
    constructor (payload) {
      this._verifyPayload(payload)
  
      const { name, user_id,  category_id } = payload
  
      this.name = name
      this.user_id = user_id
      this.category_id = category_id

    }
  
    _verifyPayload ({ name, user_id,   category_id }) {
      if (!name || !user_id  || !category_id) {
        throw new Error('ADD_ORGANIZATION.NOT_CONTAIN_NEEDED_PROPERTY')
      }
  
      if (typeof name !== 'string' || typeof user_id !== 'number'   || typeof category_id !== 'number') {
        throw new Error('ADD_ORGANIZATION.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }

    }

  }
  
module.exports = AddOrganization