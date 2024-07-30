import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const OrganizationTableHelper = {
    async cleanTable() {
        await prisma.organization.deleteMany();
    },
    async addOrganization({id , name , user_id , category_id }) {
        return prisma.organization.create({
            data: {
                id,
                name,
                user_id,
                category_id,
                createdAt: new Date('2021-09-28T07:50:40.017Z'),
                updatedAt: new Date('2021-09-28T07:50:40.017Z'),
            },
        });
    },
};
module.exports = OrganizationTableHelper;
