const GetCategory = require("../GetCategory");

describe("GetCategory entities", () => {
    it("should throw error when payload did not contain needed property", () => {
        // Arrange
        const payload = {
        id: "abc",
        };
    
        // Action and Assert
        expect(() => new GetCategory(payload)).toThrowError(
        "GET_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY"
        );
    });
    
    it("should throw error when payload did not meet data type specification", () => {
        // Arrange
        const payload = {
        id: true,
        name: 123,
        };
    
        // Action and Assert
        expect(() => new GetCategory(payload)).toThrowError(
        "GET_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION"
        );
    });
    
    it("should create GetCategory object correctly", () => {
        // Arrange
        const payload = {
        id: 1,
        name: "category",
        };
    
        // Action
        const { id, name } = new GetCategory(payload);
    
        // Assert
        expect(id).toEqual(payload.id);
        expect(name).toEqual(payload.name);
    });
});
