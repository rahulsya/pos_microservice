module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
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
      tableName: "categories",
      timestamps: true,
    }
  );

  category.associate = (models) => {
    category.hasMany(models.Product, {
      foreignKey: "category_id",
      allowNull: false,
    });
  };

  return category;
};
