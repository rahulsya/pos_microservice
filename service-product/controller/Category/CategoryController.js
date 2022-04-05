const { Category } = require("../../models");

const allCategories = async (req, res) => {
  try {
    const category = await Category.findAll();
    return res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const data = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "category not found",
      });
    }

    await Category.update({ ...data }, { where: { id: req.params.id } });

    return res.json({
      status: "success",
      message: "update success",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;

    const category = await Category.create(data);
    return res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "category not found",
      });
    }

    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      status: "success",
      message: "category deleted",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { create, allCategories, update, destroy };
