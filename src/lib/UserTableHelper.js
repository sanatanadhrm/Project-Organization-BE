const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UserTableHelper = {
    async cleanTable() {
        await prisma.user.deleteMany();
        await prisma.role.deleteMany();
    },
    async findUsersByEmail(email) {
        return prisma.user.findMany({
            where: {
                email,
            },
        });
    },
    async addRoleTable() {
            await prisma.role.create({
                data: {
                    id: 1,
                    name: 'organization',
                },
            });
    },
    async addUser({id = 1, email = 'dicoding@gmail.com', password='secret', name='Dicoding Indonesia', role_id=1}) {
        return prisma.user.create({
            data: {
                id,
                email,
                password,
                name,
                role_id,
            },
        });
    }
};
module.exports = UserTableHelper;