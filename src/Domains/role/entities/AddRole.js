class AddRole {
    constructor(payload) {
        this._verifyPayload(payload);
        const { name } = payload;

        this.name = name;
    }

    _verifyPayload({ name }) {
        if (!name ) {
            throw new Error('ADD_ROLE.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof name !== 'string' ) {
            throw new Error('ADD_ROLE.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
module.exports = AddRole;