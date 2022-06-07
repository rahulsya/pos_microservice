module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      courier_number: {
        type: DataTypes.INTEGER(30),
        allowNull: true,
      },
      invoice_number: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      total_shipping: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courier_service: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      shipping_estimation: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      shipping_destination: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      payment_status: {
        values: ["SUBMIT", "PROCESS", "SUCCESS", "CANCEL"],
        type: DataTypes.ENUM,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.ENUM,
        values: ["CASH", "NONCASH"],
        allowNull: false,
      },
      status: {
        values: ["SUBMIT", "PROCESS", "CANCEL", "SUCCESS"],
        type: DataTypes.ENUM,
        allowNull: false,
      },
      createdAt: {
        //field aliases
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        //field aliases
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "orders",
      timestamps: true,
    }
  );

  Order.associate = (models) => {
    Order.hasMany(models.OrderItems, {
      foreignKey: "order_id",
      allowNull: false,
    });
  };
  return Order;
};
