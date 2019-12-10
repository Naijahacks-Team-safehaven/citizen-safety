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
      Haven: DataTypes.STRING,
      havenLocation: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {});
    User.associate = (models) => {
      User.hasMany(models.Personnel, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        },
      });
      User.hasMany(models.eContact, {
        onDelete: 'CASCADE',
        foreignKey: 'id',
        targetKey: 'user_id'
      })
    };
    return User;
  };
  