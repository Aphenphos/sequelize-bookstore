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
      const data = await db.Author.findAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post
