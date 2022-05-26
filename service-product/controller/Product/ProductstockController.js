const { Product } = require("../../models");

const manageProductStock = async (req, res) => {
  try {
    const { payload } = req.body;

    if (payload.length) {
      for (let i = 0; i < payload.length; i++) {
        const getProduct = await Product.findByPk(payload[i].id);
        if (getProduct) {
          const { amount_stock } = getProduct;
          await Product.update(
            { amount_stock: amount_stock - payload[i].qty },
            {
              where: {
                id: getProduct.id,
              },
            }
          );
        } else {
          return res.status(400).json({
            status: "error",
            message: `cannot find product ${payload[i].name}`,
          });
        }
      }
    }

    return res.json({
      status: "success",
      message: "stock product updated",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { manageProductStock };
