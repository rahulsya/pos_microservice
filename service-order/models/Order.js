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
      payment_status: {
        values: ["SUBMIT", "PROCESS", "COMPLETED", "CANCEL"],
        type: DataTypes.ENUM,
        allowNull: false,
      },
      status: {
        values: ["SUBMIT", "PROCESS", "COMPLETED", "CANCEL"],
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
