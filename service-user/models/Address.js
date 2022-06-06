module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define(
    "Address",
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detail_address: {
        type: DataTypes.TEXT,
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
      tableName: "address",
      timestamps: true,
    }
  );

  address.associate = (models) => {
    address.belongsTo(models.User, {
      foreignKey: "user_id",
      allowNull: false,
    });
  };

  return address;
};
