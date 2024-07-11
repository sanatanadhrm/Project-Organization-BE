import AddedRole from "../AddedRole";

describe("AddedRole entities", () => {
    it("should throw error when payload did not contain needed property", () => {
        // Arrange
        const payload = {
            id: 1
        };
    
        // Action & Assert
        expect(() => new AddedRole(payload)).toThrowError(
        "ADDED_ROLE.NOT_CONTAIN_NEEDED_PROPERTY"
        );
    });
    
    it("should throw error when payload did not meet data type specification", () => {
        // Arrange
        const payload = {
            id:"dicoding",
            name: 123,
        };
    
        // Action & Assert
        expect(() => new AddedRole(payload)).toThrowError(
        "ADDED_ROLE.NOT_MEET_DATA_TYPE_SPECIFICATION"
        );
    });
    
    it("should create AddedRole object correctly", () => {
        // Arrange
        const payload = {
        name: "dicoding",
        id: 1
        };
    
        // Action
        const { name, id } = new AddedRole(payload);
    
        // Assert
        expect(name).toEqual(payload.name);
        expect(id).toEqual(payload.id);
    });
});