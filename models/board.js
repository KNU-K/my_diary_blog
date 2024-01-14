const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Board = sequelize.define("Board", {
    b_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    b_title: {
      type: DataTypes.STRING,
    },
    b_contents: {
      type: DataTypes.TEXT,
    },
  });

  Board.associate = (models) => {
    Board.belongsTo(models.User, {
      foreignKey: "u_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Board.hasMany(models.Comment, {
      foreignKey: "b_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Board;
};
