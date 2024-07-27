class UserLogin { 
    constructor (payload) {
        this._verifyPayload(payload)
        const { email, password } = payload
        this.email = email
        this.password = password
    }
     
    _verifyPayload ({ email, password }) {
        if (!email || !password) {
        throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
        }
     
        if (typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }

        if (email.length > 50) {
        throw new Error('USER_LOGIN.EMAIL_LIMIT_CHAR')
        }
      
        if (!this._isValidEmail(email)) {
        throw new Error('USER_LOGIN.EMAIL_CONTAIN_RESTRICTED_CHARACTER')
        }
    }
    _isValidEmail(email) {
        // Regular expression for validating an email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
module.exports = UserLogin;