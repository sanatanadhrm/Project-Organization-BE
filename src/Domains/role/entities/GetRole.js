class GetRole {
    constructor(payload) {
        this._verifyPayload(payload);
        const { id, name, createdAt, updatedAt } = payload;
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    _verifyPayload({ id, name, createdAt, updatedAt }) {
        if (!id || !name || !createdAt || !updatedAt) {
            throw new Error("GET_ROLE.NOT_CONTAIN_NEEDED_PROPERTY");
        }
        if (typeof id !== "number" || typeof name !== "string" || typeof createdAt !== "string" || typeof updatedAt !== "string") {
            throw new Error("GET_ROLE.NOT_MEET_DATA_TYPE_SPECIFICATION");
        }
    }
}
export default GetRole;