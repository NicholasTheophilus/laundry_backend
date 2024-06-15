module.exports = (sequelize, DataTypes) => {
  const Migration = sequelize.define('Migration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    migration: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    batch: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'migrations',
    timestamps: false,
  });

  return Migration;
};