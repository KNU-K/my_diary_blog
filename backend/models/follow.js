const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Follow = sequelize.define("Follow", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  Follow.associate = (models) => {
    Follow.belongsTo(models.User, {
      foreignKey: "u_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Follow.belongsTo(models.User, {
      foreignKey: "following_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Follow;
};
