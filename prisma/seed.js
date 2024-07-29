const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const seed = async () => {
    await prisma.role.createMany({
        data: [
            {name: 'admin'},
            {name: 'organization'},
            {name: 'leader'},
            {name: 'secretary'},
            {name: 'finance'},
            {name: 'division'}
        ]
    })
    await prisma.category.createMany({
        data: [
            {name: 'sports'},
            {name: 'technology'},
            {name: 'politics'},
            {name: 'entertainment'},
            {name: 'economics'}
        ]
    })
}

seed()
    .catch(e => {
        console.log(e)
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })