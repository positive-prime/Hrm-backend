const { v4: uuidv4 } = require("uuid");
const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Tokens = sequelize.define("tokens", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidv4(),
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blackListed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    user_id: {
      type: Sequelize.UUID,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });
  Tokens.associate = (models) => {
    // associations can be defined here
    Tokens.belongsTo(models.users, { foreignKey: "user_id" });
  };
  return Tokens;
};
