const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define("Comment", {
    contents: {
      type: DataTypes.STRING,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "u_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Comment.belongsTo(models.Board, {
      foreignKey: "b_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Comment.hasMany(models.Reply, {
      foreignKey: "c_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Comment;
};
