class AddedOrganization {
    constructor (payload) {
      this._verifyPayload(payload)
  
      const { id, name,  } = payload
      
      this.id = id
      this.name = name

    }
  
    _verifyPayload ({ id, name, }) {
      if (!name || !id  ) {
        throw new Error('ADDED_ORGANIZATION.NOT_CONTAIN_NEEDED_PROPERTY')
      }
  
      if (typeof name !== 'string' || typeof id !== 'number' ) {
        throw new Error('ADDED_ORGANIZATION.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }

    }

  }
  
module.exports = AddedOrganization