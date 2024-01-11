const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    u_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    u_name: {
      type: DataTypes.STRING,
    },
    u_password: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Board, {
      foreignKey: "u_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Comment, {
      foreignKey: "u_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
