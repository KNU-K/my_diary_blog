const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Profile = sequelize.define("Profile", {
    /**
     *
     */
    image: {
      type: DataTypes.BLOB, // 바이너리 데이터로 이미지 저장
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
