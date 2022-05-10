module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define(
    "OrderItems",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
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
      tableName: "order_item",
      timestamps: true,
    }
  );

  OrderItems.associate = (models) => {
    OrderItems.belongsTo(models.Order, {
      foreignKey: "order_id",
      allowNull: false,
    });
  };
  return OrderItems;
};
