import AuthenticationTableHelper from '../../../lib/AuthenticationTableHelper';
import CategoryTableHelper from '../../../lib/CategoryTableHelper';
import OrganizationTableHelper from '../../../lib/OrganizationTableHelper';
import RoleTableHelper from '../../../lib/RoleTableHelper';
import UserTableHelper from '../../../lib/UserTableHelper';
import prisma from '../../database/mysql/mysql';
import createServer from '../CreateServer';
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