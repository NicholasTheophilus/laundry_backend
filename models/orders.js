module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service_id: {
        type: DataTypes.BIGINT,
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
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pickup_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pickup_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      }
    }, {
      tableName: 'orders',
      timestamps: false,
    });
  
    return Order;
  };
  