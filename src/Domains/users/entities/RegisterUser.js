class RegisterUser {
    constructor (payload) {
      this._verifyPayload(payload)
  
      const { name, password,  email, role_id, category } = payload
  
      this.name = name
      this.email = email
      this.password = password
      this.role_id = role_id
      this.category = category

    }
  
    _verifyPayload ({ name, password,  email, role_id, category }) {
      if (!name || !password  || !email|| !role_id || !category) {
        throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')
      }
  
      if (typeof name !== 'string' || typeof password !== 'string'  || typeof email !== 'string' || typeof role_id !== 'number' || typeof category !== 'number') {
        throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }
  
      if (email.length > 50) {
        throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')
      }
  
      if (!this._isValidEmail(email)) {
        throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
      }
    }
    _isValidEmail(email) {
        // Regular expression for validating an email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
  }
  
  export default RegisterUser