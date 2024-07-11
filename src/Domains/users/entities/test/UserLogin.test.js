import UserLogin from "../UserLogin";

describe("UserLogin entities", () => {
    it("should throw error when payload did not contain needed property", () => {
        // Arrange
        const payload = {
        email: "dicoding@gmail.com",
        };
    
        // Action and Assert
        expect(() => new UserLogin(payload)).toThrow(
        "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY"
        );
    });

    it("should throw error when payload did not meet data type specification", () => {
        // Arrange
        const payload = {
        email: 123,
        password: 123,
        };

        // Action and Assert
        expect(() => new UserLogin(payload)).toThrow(
        "USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION"
        );
    });

    it("should throw error when email more than 50 character", () => {
        // Arrange
        const payload = {
        email: "dicoding".repeat(10) + "@mail.com",
        password: "secret",
        };

        // Action and Assert
        expect(() => new UserLogin(payload)).toThrow(
        "USER_LOGIN.EMAIL_LIMIT_CHAR"
        );
    });

    it("should throw error when email contain restricted character", () => {
        // Arrange
        const payload = {
        email: "dicoding",
        password: "secret",
        };

        // Action and Assert
        expect(() => new UserLogin(payload)).toThrow(
        "USER_LOGIN.EMAIL_CONTAIN_RESTRICTED_CHARACTER"
        );
    });
    
    it("should create UserLogin object correctly", () => {
        // Arrange
        const payload = {
        email: "dicoding@gmail.com",
        password: "secret",
        };
    
        // Action
        const { email, password } = new UserLogin(payload);
    
        // Assert
        expect(email).toEqual(payload.email);
        expect(password).toEqual(payload.password);
    });
});