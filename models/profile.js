const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Profile = sequelize.define("Profile", {
    /**
     *
     */
    image: {
      type: DataTypes.BLOB, // ���̳ʸ� �����ͷ� �̹��� ����
    },
    introduction: {
      type: DataTypes.TEXT,
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: "u_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Profile;
};
