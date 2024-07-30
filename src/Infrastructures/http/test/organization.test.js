const request = require('supertest');
const createServer = require('../CreateServer');
const { PrismaClient } = require('@prisma/client');
const CategoryTableHelper = require('../../../lib/CategoryTableHelper');
const OrganizationTableHelper = require('../../../lib/OrganizationTableHelper');
const UserTableHelper = require('../../../lib/UserTableHelper');
const RoleTableHelper = require('../../../lib/RoleTableHelper');

describe('Organization API', () => {
    let server;
    let prisma;
    
    beforeAll(() => {
        prisma = new PrismaClient();
    });
    
    beforeEach(async () => {
        server = await createServer();
        await CategoryTableHelper.cleanTable();
        await OrganizationTableHelper.cleanTable();
        await UserTableHelper.cleanTable();
        await RoleTableHelper.cleanTable();
    });
    
    afterEach(async () => {
        await CategoryTableHelper.cleanTable();
        await OrganizationTableHelper.cleanTable();
        await UserTableHelper.cleanTable();
        await RoleTableHelper.cleanTable();
    });
    
    afterAll(async () => {
        await prisma.$disconnect();
    });
    
    describe('POST /organization', () => {
        it('should response 200 and new organization', async () => {
            // Arrange
            const responseRole = await request(server)
                .post('/roles/add')
                .send({ name: 'organization' });
            const responsecategory = await request(server)
                .post('/category/add')
                .send({ name: 'sports' });
            const newUser = {
                email: 'test@example.com',
                password: 'password',
                name: 'Test User',
                role_id: responseRole.body.data.id, // Sesuaikan dengan role ID yang ada di database Anda
                category: responsecategory.body.data.id
            };
            await request(server)
                .post('/users/add')
                .send(newUser)

            // Action
            const response = await request(server).get('/organization')
            // Assert
            expect(response.status).toEqual(200);
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0]).toStrictEqual({
                id: response.body.data[0].id,
                name: 'Test User',
                user_id: response.body.data[0].user_id,
                category_id: responsecategory.body.data.id,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                category: {
                    id: responsecategory.body.data.id,
                    name: 'sports'
                }
            });
         });
    });
        


});
