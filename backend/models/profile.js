const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Profile = sequelize.define("Profile", {
    /**
     *
     */
    image: {
      type: DataTypes.TEXT, // 바이너리 데이터로 이미지 저장
      defaultValue: "/image/default.jpg",
    },
    introduction: {
      type: DataTypes.TEXT,
      defaultValue: "",
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
