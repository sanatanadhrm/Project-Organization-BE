import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const OrganizationTableHelper = {
    async cleanTable() {
        await prisma.organization.deleteMany();
    },
    // async addOrganization({id = 1, name = 'UKM Silat', user_id = 1, category_id = 1}) {
    //     return prisma.organization.create({
    //         data: {
    //             id,
    //             name,
    //         },
    //     });
    // },
};
export default OrganizationTableHelper;
