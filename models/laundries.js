module.exports = (sequelize, DataTypes) => {
    const Laundry = sequelize.define('Laundry', {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      tableName: 'laundries',
      timestamps: false,
    });
  
    return Laundry;
  };
  