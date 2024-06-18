module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(8, 2),
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
    pickup_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    pickup_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    payment_details: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'pending',
    },
  }, {
    tableName: 'orders',
    timestamps: false,
  });

  return Order;
};