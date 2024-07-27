import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const RoleTableHelper = {
    async cleanTable() {
        await prisma.role.deleteMany();
    },
    async addRoleTable() {
        await prisma.role.createMany({
            data: [
                {
                    id: 1,
                    name: 'admin',
                },
                {
                    id: 2,
                    name: 'user',
                },
            ],
        });
    },
    async addRole({id, name}) {
        return prisma.role.create({
            data: {
                id,
                name,
            },
        });
    },
};
module.exports = RoleTableHelper;