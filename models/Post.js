const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model
class Post extends Model {}

// Initialize the Post model with its attributes and options
Post.init(
  {
    // The unique ID of the post, which is an integer that auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // The title of the post, which is a string that cannot be null
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The content of the post, which is a string that cannot be null
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The ID of the user who created the post, which is an integer that references the 'id' attribute of the 'user' model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    // Connect the Post model to the sequelize instance, freeze the table name, use underscores instead of camelCase, and set the model name
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// Export the Post model
module.exports = Post;