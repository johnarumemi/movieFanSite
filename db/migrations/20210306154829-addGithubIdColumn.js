'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return await queryInterface.addColumn('users','github_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {

    return await queryInterface.removeColumn('users', 'github_id')
  }
};
