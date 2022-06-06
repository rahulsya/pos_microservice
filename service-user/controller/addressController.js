const { Address } = require("../models");

const index = async (req, res) => {
  try {
    const id = req.params.id;
    const address = await Address.findAll({
      where: {
        user_id: id,
      },
    });

    return res.json({
      status: "success",
      address,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

const store = async (req, res) => {
  try {
    const create = await Address.create(req.body);
    return res.json({
      status: "success",
      address: create,
    });
  } catch (error) {
    return res.error(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    await Address.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const newAddress = await Address.findOne({ where: { id: req.params.id } });

    return res.json({
      status: "success",
      data: newAddress,
    });
  } catch (error) {
    return res.error(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    await Address.destroy({ where: { id } });

    return res.json({
      status: "success",
      message: "address deleted",
    });
  } catch (error) {
    return res.error(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { store, index, update, destroy };
