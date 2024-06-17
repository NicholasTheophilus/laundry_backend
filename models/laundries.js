module.exports = (sequelize, DataTypes) => {
  const Laundry = sequelize.define('Laundry', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    open: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    distance: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  }, {
    tableName: 'laundries',
    timestamps: false,
  });

  return Laundry;
};