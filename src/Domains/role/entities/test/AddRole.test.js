import AddRole from "../AddRole";

describe("AddRole entities", () => {
    it("should throw error when payload did not contain needed property", () => {
        // Arrange
        const payload = {
        };
    
        // Action & Assert
        expect(() => new AddRole(payload)).toThrowError(
        "ADD_ROLE.NOT_CONTAIN_NEEDED_PROPERTY"
        );
    });
    
    it("should throw error when payload did not meet data type specification", () => {
        // Arrange
        const payload = {
        name: 123,
        };
    
        // Action & Assert
        expect(() => new AddRole(payload)).toThrowError(
        "ADD_ROLE.NOT_MEET_DATA_TYPE_SPECIFICATION"
        );
    });
    
    it("should create AddRole object correctly", () => {
        // Arrange
        const payload = {
        name: "dicoding",
        };
    
        // Action
        const { name } = new AddRole(payload);
    
        // Assert
        expect(name).toEqual(payload.name);
    });
});