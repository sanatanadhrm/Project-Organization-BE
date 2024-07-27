import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const CategoryTableHelper = {
    async cleanTable() {
        await prisma.category.deleteMany();
    },
    async addCategory({id, name }) {
        return prisma.category.create({
            data: {
                id,
                name,
            },
        });
    },
};
module.exports = CategoryTableHelper;