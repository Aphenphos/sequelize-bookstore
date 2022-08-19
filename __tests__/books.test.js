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
  it('gets specific book with authors', async () => {
    const res = await request(app).get('/api/v1/books/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      title: 'A Book',
      published: '1999',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      Authors: expect.any(Array)
    });
  });
  it('adds a book with the author', async () => {
    const newBook = {
      title: 'Best Book',
      published: '0'
    };
    const res = await request(app)
      .post('/api/v1/books')
      .send(newBook);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(Number),
      title: 'Best Book',
      published: '0',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
