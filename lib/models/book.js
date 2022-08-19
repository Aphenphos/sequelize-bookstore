'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsToMany(models.Authors, {
        through: 'authors_books',
        foreignKey: 'book_id'
      });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    published: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Book;
};
