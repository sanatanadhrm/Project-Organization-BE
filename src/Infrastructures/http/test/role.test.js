const request = require('supertest');
const createServer = require('../CreateServer');
const { PrismaClient } = require('@prisma/client');
const RoleTableHelper = require('../../../lib/RoleTableHelper');

describe('Role API', () => {
    let server;
    let prisma;
    beforeAll(() => {
        prisma = new PrismaClient();
    });

    beforeEach(async () => {
        server = await createServer();
        await RoleTableHelper.cleanTable();
    });

    afterEach(async () => {
        await RoleTableHelper.cleanTable();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('POST /roles/add', () => {
        it('should response 201 and new role', async () => {
            const response = await request(server).post('/roles/add').send({ name: 'organization' });

            expect(response.status).toEqual(201);
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.data).toMatchObject({
                id: response.body.data.id,
                name: 'organization'
            });
        });

        it('should response 400 when role name is exists', async () => {
            await RoleTableHelper.addRole({ name: 'organization' });

            const response = await request(server).post('/roles/add').send({ name: 'organization' });

            expect(response.status).toEqual(400);
            expect(response.body).toHaveProperty('status', 'fail');
            expect(response.body).toHaveProperty('message', 'role yang Anda gunakan sudah terdaftar');
        });
    });

    describe('GET /roles', () => {
        it('should response 200 and return all roles', async () => {
            await RoleTableHelper.addRole({ name: 'organization'});
            await RoleTableHelper.addRole({ name: 'admin'});
            await RoleTableHelper.addRole({ name: 'member'});
            await RoleTableHelper.addRole({ name: 'guest'});
            await RoleTableHelper.addRole({ name: 'user'});
            await RoleTableHelper.addRole({ name: 'superadmin'});
            await RoleTableHelper.addRole({ name: 'superuser'});
            await RoleTableHelper.addRole({ name: 'supermember'});
            await RoleTableHelper.addRole({ name: 'superguest'});
           
            const response = await request(server).get('/roles');
            expect(response.status).toEqual(200);
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.data).toHaveLength(9);
        });
    });

});