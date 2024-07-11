import GetRole from "../GetRole";

describe("GetRole entities", () => {
    it("should throw error when payload did not contain needed property", () => {
        // Arrange
        const payload = {
        };
    
        // Action & Assert
        expect(() => new GetRole(payload)).toThrowError(
        "GET_ROLE.NOT_CONTAIN_NEEDED_PROPERTY"
        );
    });
    
    it("should throw error when payload did not meet data type specification", () => {
        // Arrange
        const payload = {
        name: 123,
        id: "dicoding",
        createdAt: 123,
        updatedAt: 123,
        };
    
        // Action & Assert
        expect(() => new GetRole(payload)).toThrowError(
        "GET_ROLE.NOT_MEET_DATA_TYPE_SPECIFICATION"
        );
    });
    
    it("should create GetRole object correctly", () => {
        // Arrange
        const payload = {
        name: "dicoding",
        id: 1,
        createdAt: "2021-08-08T07:22:33.555Z",
        updatedAt: "2021-08-08T07:22:33.555Z",
        };
    
        // Action
        const { name, id, createdAt, updatedAt } = new GetRole(payload);
    
        // Assert
        expect(name).toEqual(payload.name);
        expect(id).toEqual(payload.id);
        expect(createdAt).toEqual(payload.createdAt);
        expect(updatedAt).toEqual(payload.updatedAt);

    });
});