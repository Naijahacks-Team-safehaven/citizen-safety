export default (sequelize, DataTypes) => {
    const Alert = sequelize.define('Alert', {
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
      location: DataTypes.STRING,
      address: DataTypes.STRING,
      details: DataTypes.STRING,
      proof: DataTypes.STRING,
    }, {});
    Alert.associate = (models) => {
      // Alert.belongsTo(models.Personnel, {
      //   onDelete: 'CASCADE',
      //   foreignKey: {
      //     allowNull: false
      //   },
      // });
    };
    return Alert;
  };
  