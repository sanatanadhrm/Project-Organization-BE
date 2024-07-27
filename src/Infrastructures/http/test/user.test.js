const request = require('supertest'); // Tambahkan impor ini
const createServer = require('../CreateServer'); // Sesuaikan dengan path yang benar
const { PrismaClient } = require('@prisma/client');
const UserTableHelper = require('../../../lib/UserTableHelper');
const CategoryTableHelper = require('../../../lib/CategoryTableHelper');
const RoleTableHelper = require('../../../lib/RoleTableHelper');
const OrganizationTableHelper = require('../../../lib/OrganizationTableHelper');
const AddedOrganization = require('../../../Domains/organization/entities/AddedOrganization');
const { category } = require('../../database/mysql/mysql');

const prisma = new PrismaClient();

describe('Users API', () => {
  let server;

  beforeEach(async () => {
    server = await createServer();
    // await UserTableHelperr.addRoleTable();
    // await UserTableHelperr.cleanTable();
    // await CategoryTableHelper.cleanTable();
  });

  afterEach(async () => {
    await OrganizationTableHelper.cleanTable();
    await UserTableHelper.cleanTable();
    await CategoryTableHelper.cleanTable();
    await RoleTableHelper.cleanTable();
    
  });

  afterAll(async () => {
    await prisma.$disconnect(); // Putus koneksi Prisma setelah semua pengujian selesai
  });

  describe('POST /users/add', () => {
    it('should create a new user', async () => {

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
      const response = await request(server)
        .post('/users/add')
        .send(newUser)
        
      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body.data.addedUser).toMatchObject(new AddedOrganization({
        id: response.body.data.addedUser.id,
        name: response.body.data.addedUser.name
      }));
    });
    it('should return 400 if email or password or name is not provided', async () => {
      const responseRole = await request(server)
        .post('/roles/add')
        .send({ name: 'organization' });
      const responsecategory = await request(server)
        .post('/category/add')
        .send({ name: 'sports' });
      const response = await request(server)
        .post('/users/add')
        .send({
          password: 'password',
          name: 'Test User',
          role_id: responseRole.body.data.id,
          category: responsecategory.body.data.id
        });
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada');
    });

    it('should return 400 if email or password or name is not meet specific data type', async () => {
      const responseRole = await request(server)
        .post('/roles/add')
        .send({ name: 'organization' });
      const responsecategory = await request(server)
        .post('/category/add')
        .send({ name: 'sports' });
      const response = await request(server)
        .post('/users/add')
        .send({
          email: 1234,
          password: 'password',
          name: 'Test User',
          role_id: responseRole.body.data.id,
          category: responsecategory.body.data.id
        });
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena tipe data tidak sesuai');
    });

    it('should return 400 if email not have valid email format', async () => {
      const responseRole = await request(server)
        .post('/roles/add')
        .send({ name: 'organization' });
      const responsecategory = await request(server)
        .post('/category/add')
        .send({ name: 'sports' });
      const response = await request(server)
        .post('/users/add')
        .send({
          email: 'test',
          password: 'password',
          name: 'Test User',
          role_id: responseRole.body.data.id,
          category: responsecategory.body.data.id
        });
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena email tidak valid');
    });

    it('should return 400 if email already exist in database', async () => {
      const responseRole = await request(server)
        .post('/roles/add')
        .send({ name: 'organization' });
      const responsecategory = await request(server)
        .post('/category/add')
        .send({ name: 'sports' });
      const newUser = {
        email: 'testing@gmail.com',
        password: 'password',
        name: 'Test User',
        role_id: responseRole.body.data.id,
        category: responsecategory.body.data.id
      }
      await request(server)
        .post('/users/add')
        .send(newUser);
      const response = await request(server)
        .post('/users/add')
        .send({
          email: newUser.email,
          password: 'password',
          name: 'Test User 2',
          role_id: responseRole.body.data.id,
          category: responsecategory.body.data.id
        });
        
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('email yang Anda gunakan sudah terdaftar');
    });
    it('should return 400 if role_id not exist in database', async () => {
      const responsecategory = await request(server)
        .post('/category/add')
        .send({ name: 'sports' });
      const response = await request(server)
        .post('/users/add')
        .send({
          email: 'test@gmail.com',
          password: 'password',
          name: 'Test User',
          role_id: 999,
          category: responsecategory.body.data.id
        })
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena role_id tidak valid');
    });
    it('should return 400 if category_id not exist in database', async () => {
      const responseRole = await request(server)
        .post('/roles/add')
        .send({ name: 'organization' });
      const response = await request(server)
        .post('/users/add')
        .send({
          email: 'test@gmail.com',
          password: 'password',
          name: 'Test User',
          role_id: responseRole.body.data.id,
          category: 999
        })
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena category_id tidak valid');
    });
  });


  // Tambahkan pengujian untuk endpoint lainnya seperti PUT, DELETE, dll. sesuai kebutuhan
});
