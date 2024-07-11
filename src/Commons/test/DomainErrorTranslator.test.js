import InvariantError from "../InvariantError";
import DomainErrorTranslator from "../DomainErrorTranslator";

describe("DomainErrorTranslator", () => {
    it("should return error correctly", () => {
        const error = new Error("an error occurs");
        const translatedError = DomainErrorTranslator.translate(error);

        expect(translatedError).toBeInstanceOf(Error);
        expect(translatedError).toBe(error);
    });
});
