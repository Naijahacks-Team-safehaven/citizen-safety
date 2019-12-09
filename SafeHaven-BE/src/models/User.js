export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
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
      haven: DataTypes.STRING,
      havenLocation: DataTypes.STRING,
    }, {});
    User.associate = (models) => {
      // User.belongsTo(models.Alert, {
      //   onDelete: 'CASCADE',
      //   foreignKey: {
      //     allowNull: false
      //   },
      // });
    };
    return User;
  };
  