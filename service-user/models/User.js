const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
        validate: {
          notNull: {
            msg: "field nama harus di-isi",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "field email harus di-isi",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "field password harus di-isi",
          },
        },
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
      phone_number: {
        type: DataTypes.STRING(12),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "customer"],
        defaultValue: "customer",
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
      tableName: "users",
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Address, {
      foreignKey: "user_id",
      allowNull: false,
    });
  };

  return User;
};
