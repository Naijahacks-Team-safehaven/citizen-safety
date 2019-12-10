export default (sequelize, DataTypes) => {
    const Personnel = sequelize.define('Personnel', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: DataTypes.STRING,
    }, {});
    Personnel.associate = (models) => {
      Personnel.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: 'id',
      });
    };
    return Personnel;
  };
  