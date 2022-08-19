const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/models');

describe('backend-express-template routes', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    await db.Books.bulkCreate([
      {
        title: 'A Book',
        published: '1999',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Book',
        published: '1111',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
  it('gets a list of books', async () => {
    const res = await request(app).get('/api/v1/books');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      published: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });
});
