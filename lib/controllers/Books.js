const { Router } = require('express');
const db = require('../models');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await db.Books.findAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const book = await db.Books.findByPk(req.params.id, {
        include: { model: db.Authors }
      });
      if  (!book) { next(); }
      else { res.json(book); }
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/authors', async (req, res, next) => {
    try {
      const data = await db.Books.create(req.body);
      await db.authors_books.create({
        author_id: data.id,
        book_id: req.params.id,
      });
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await db.Books.create(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
