const { User } = require("../../models");

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
      erros: error.errors,
    });
  }
};

module.exports = { Register };
