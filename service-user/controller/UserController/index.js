const { User, RefreshToken } = require("../../models");
const bcrypt = require("bcrypt");

const GetAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });

    return res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

const GetUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

const Register = async (req, res) => {
  try {
    const data = req.body;

    const create = await User.create(data);
    return res.json({
      status: "success",
      create,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      error: error.errors,
    });
  }
};

const Update = async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        messsage: "user not found",
      });
    }

    if (req.body.email) {
      const checkEmail = await User.findOne({
        where: { email: req.body.email },
      });
      if (checkEmail) {
        return res.status(400).json({
          status: "error",
          message: "email already exist",
        });
      }
    }
    await User.update({ ...data }, { where: { id } });
    const updatedData = await User.findOne({
      where: { id },
      attributes: ["id", "name", "email", "role"],
    });
    return res.json({
      status: "success",
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    const { id, name, role, address } = user;

    return res.json({
      status: "success",
      data: {
        id,
        name,
        email: user.email,
        role,
        address,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

const Logout = async (req, res) => {
  try {
    const { user_id } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "user not found",
      });
    }

    await RefreshToken.destroy({
      where: { user_id },
    });

    return res.json({
      status: "success",
      message: "refresh token deleted",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};
module.exports = { Register, Login, GetAllUser, GetUser, Logout, Update };
