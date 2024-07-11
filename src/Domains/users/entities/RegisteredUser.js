class RegisteredUser {
    constructor (payload) {
      this._verifyPayload(payload)
  
      const { id, email, name } = payload
  
      this.id = id
      this.email = email
      this.name = name
    }
  
    _verifyPayload ({ id, email, name }) {
      if (!id || !email || !name) {
        throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY')
      }
  
      if (typeof id !== 'number' || typeof email !== 'string' || typeof name !== 'string') {
        throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }
    }
  }
  
  module.exports = RegisteredUser
  