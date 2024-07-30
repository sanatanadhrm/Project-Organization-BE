const AuthenticationTableHelper = require('../../../lib/AuthenticationTableHelper');
const CategoryTableHelper = require('../../../lib/CategoryTableHelper');
const OrganizationTableHelper = require('../../../lib/OrganizationTableHelper');
const RoleTableHelper = require('../../../lib/RoleTableHelper');
const UserTableHelper = require('../../../lib/UserTableHelper');
const prisma = require('../../database/mysql/mysql');
const createServer = require('../CreateServer');
const request = require('supertest');

describe('authentication', () => {
    let server;

    beforeEach(async () => {
        server = await createServer();
    });

    afterEach(async()=>{
        await AuthenticationTableHelper.cleanTable();
        await OrganizationTableHelper.cleanTable();
        await UserTableHelper.cleanTable();
        await CategoryTableHelper.cleanTable();
        await RoleTableHelper.cleanTable();
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('when POST /sign in', () => {
        it('should response 201 and new token', async () => {
            const responseRole = await request(server)
                .post('/roles/add')
                .send({ name: 'organization' });
            const responseCategory = await request(server)
                .post('/category/add')
                .send({ name: 'sports' });
            const responseUser = await request(server)
                .post('/users/add')
                .send({
                    email: 'test@gmail.com',
                    password: 'password',
                    name: 'test',
                    role_id: responseRole.body.data.id,
                    category: responseCategory.body.data.id
                });
            const response = await request(server)
                .post('/sign-in')
                .send({
                    email: 'test@gmail.com',
                    password: 'password'
                });
            expect(response.status).toEqual(201);
            expect(response.body.data).toHaveProperty('accessToken');
            expect(response.body.data).toHaveProperty('refreshToken');
        });

        it('should response 400 when email and password not match', async () => {
            const responseRole = await request(server)
                .post('/roles/add')
                .send({ name: 'organization'});
            const responseCategory = await request(server)
                .post('/category/add')
                .send({ name: 'sports' });
            const responseUser = await request(server)
                .post('/users/add')
                .send({
                    email: 'test@gmail.com',
                    password: 'password',
                    name: 'test',
                    role_id: responseRole.body.data.id,
                    category: responseCategory.body.data.id
                });
            const response = await request(server)
                .post('/sign-in')
                .send({
                    email: 'test@gmail.com',
                    password: 'password1'
                });
            expect(response.status).toEqual(401);
            expect(response.body.message).toEqual('kredensial yang Anda masukkan salah');
        });

        it('should response 400 when email not found', async () => {
            const response = await request(server)
                .post('/sign-in')
                .send({
                    email: 'test@gmail.com',
                    password: 'password'
                });
            expect(response.status).toEqual(400);
            expect(response.body.message).toEqual('email tidak di temukan');
        });
    });

    describe('when POST /sign-out', () => {
        it('should response 200 and message', async () => {
            const responseRole = await request(server)
                .post('/roles/add')
                .send({ name: 'organization' });
            const responseCategory = await request(server)
                .post('/category/add')
                .send({ name: 'sports' });
            const responseUser = await request(server)
                .post('/users/add')
                .send({
                    email: 'test@gmail.com',
                    password: 'password',
                    name: 'test',
                    role_id: responseRole.body.data.id,
                    category: responseCategory.body.data.id
                });
            const responseSignIn = await request(server)
                .post('/sign-in')
                .send({
                    email: 'test@gmail.com',
                    password: 'password'
                });
            const response = await request(server)
                .post('/sign-out')
                .set('Authorization', `Bearer ${responseSignIn.body.data.accessToken}`)
                .send({ refreshToken: responseSignIn.body.data.refreshToken });
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual('success');
        });
                    
    });

    
});