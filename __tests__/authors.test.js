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
    await db.Authors.bulkCreate([
      {
        name: 'Geg',
        age: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Greg',
        age: 333,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
    await db.authors_books.bulkCreate([
      {
        author_id: 1,
        book_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 1,
        book_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author_id: 2,
        book_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
  it('gets a list of authors', async () => {
    const res = await request(app).get('/api/v1/authors');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      age: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });
  it('gets specific author with their books', async () => {
    const res = await request(app).get('/api/v1/authors/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'Geg',
      age: 3,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      Books: expect.any(Array)
    });
  });
  it('adds a author with their book', async () => {
    const newAuthor = {
      name: 'Gdeg',
      age: 50
    };
    const res = await request(app)
      .post('/api/v1/authors')
      .send(newAuthor);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(Number),
      name: 'Gdeg',
      age: 50,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
