"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("tokens", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_token_association",
      references: {
        table: "users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint("tokens", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_token_association",
      references: {
        table: "users",
        field: "id",
      },
    });
  },
};
