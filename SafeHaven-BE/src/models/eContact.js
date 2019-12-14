export default (sequelize, DataTypes) => {
    const eContact = sequelize.define('eContact', {
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
    }, {});
    eContact.associate = (models) => {
      // Personnel.belongsTo(models.Alert, {
      //   onDelete: 'CASCADE',
      //   foreignKey: {
      //     allowNull: false
      //   },
      // });
    };
    return eContact;
  };
  