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
        type: DataTypes.STRING(25),
        allowNull: true,
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
  return Order;
};