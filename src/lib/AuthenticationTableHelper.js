import { PrismaClient } from "@prisma/client";
import InvariantError from "../Commons/InvariantError";
const prisma = new PrismaClient();

const AuthenticationTableHelper = {
    async cleanTable() {
        await prisma.authentication.deleteMany();
    },
    async addToken(token) {
        return prisma.authentication.create({
        data: { token },
        });
    },
    async checkAvailabilityToken(token) {
        const responsetoken = await prisma.authentication.findFirst({
        where: {
            token,
        },
        });
        return responsetoken;
    },
    async deleteToken(token) {
        await prisma.authentication.delete({
        where: {
            token,
        },
        });
    },
};
export default AuthenticationTableHelper;