const InvariantError = require('../Commons/InvariantError')
const DomainErrorTranslator = {
    translate (error) {
      return DomainErrorTranslator._directories[error.message] || error
    }
}
DomainErrorTranslator._directories = {
'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena email tidak valid'),
'USER_EMAIL.NOT_AVAILABLE': new InvariantError('email yang Anda gunakan sudah terdaftar'),
'ROLE_NOT_FOUND': new InvariantError('tidak dapat membuat user baru karena role_id tidak valid'),
'CATEGORY_ID_NOT_FOUND': new InvariantError('tidak dapat membuat user baru karena category_id tidak valid'),
'USER_EMAIL.NOT_MATCH': new InvariantError('email tidak di temukan'),
'CATEGORY_NAME_ALREADY_EXISTS': new InvariantError('category yang Anda gunakan sudah terdaftar'),
'ROLE_NAME_ALREADY_EXISTS': new InvariantError('role yang Anda gunakan sudah terdaftar'),
}
module.exports = DomainErrorTranslator