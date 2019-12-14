module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Alerts', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    details: {
      type: Sequelize.STRING,
    },
    proof: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.dropTable('Alerts'),
};
