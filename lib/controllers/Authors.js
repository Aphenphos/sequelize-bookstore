const { Router } = require('express');
const db = require('../models');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const author = await db.Authors.findByPk(req.params.id, {
        include: { model: db.Books }
      });
      if  (!author) { next(); }
      else { res.json(author); }
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await db.Authors.findAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/books', async (req, res, next) => {
    try {
      const data = await db.Books.create(req.body);
      await db.authors_books.create({
        author_id: req.params.id,
        book_id: data.id,
      });
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await db.Authors.create(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
