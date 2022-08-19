'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authors_books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      // authors_books.belongsTo(models.Book, {
      //   foreignKey: 'book_id',
      // });
      // authors_books.belongsTo(models.Author, {
      //   foreignKey: 'author_id',
      // });
    }
  }
  authors_books.init({
    author_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'authors_books',
  });
  return authors_books;
};
