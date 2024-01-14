const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Reply = sequelize.define("Reply", {
    /**
     *
     */
    r_id: {
      type: DataTypes.INTEGER, // 바이너리 데이터로 이미지 저장
      primaryKey: true,
      autoIncrement: true,
    },
    r_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Reply.associate = (models) => {
    Reply.belongsTo(models.User, {
      foreignKey: "u_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Reply.belongsTo(models.Comment, {
      foreignKey: "c_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Reply.belongsTo(models.Board, {
      foreignKey: "b_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Reply;
};
