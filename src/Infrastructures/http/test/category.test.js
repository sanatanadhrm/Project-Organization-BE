const request = require('supertest');
const createServer = require('../CreateServer');
const { PrismaClient } = require('@prisma/client');
const CategoryTableHelper = require('../../../lib/CategoryTableHelper');

describe('Category API', () => {
  let server;
  let prisma;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    server = await createServer();
    await CategoryTableHelper.cleanTable();
  });

  afterEach(async () => {
    await CategoryTableHelper.cleanTable();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /category/add', () => {
    it('should response 201 and new category', async () => {
      // Action
      const response = await request(server).post('/category/add').send({ name: 'sports' });
      // Assert
      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body.data).toMatchObject({
        id: response.body.data.id,
        name: 'sports'
      });
    });

    it('should response 400 when category name is exists', async () => {
      // Arrange
      await CategoryTableHelper.addCategory({ name: 'sports' });

      // Action
      const response = await request(server).post('/category/add').send({ name: 'sports' });

      // Assert
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body).toHaveProperty('message', 'category yang Anda gunakan sudah terdaftar');
    });
  });

  describe('GET /category', () => {
    it('should response 200 and return all categories', async () => {
      // Arrange
      await CategoryTableHelper.addCategory({ name: 'sports' });
      await CategoryTableHelper.addCategory({ name: 'technology' });

      // Action
      const response = await request(server).get('/category');

      // Assert
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body.data).toHaveLength(2);
    });
  });
});
