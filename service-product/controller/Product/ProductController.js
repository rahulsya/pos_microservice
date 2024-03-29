const { Product, Category } = require("../../models");
const sequelize = require("sequelize");
const fs = require("fs");

const readFileUpload = (file) => {
  const tmp_path = file.path;
  const originalExt =
    file.originalname.split(".")[file.originalname.split(".").length - 1];
  const fileName = file.filename + "." + originalExt;
  const target_path = `public/images/${fileName}`;

  return {
    tmp_path,
    target_path,
    fileName,
  };
};

const index = async (req, res) => {
  try {
    let {
      category = "",
      price = "",
      stock = "",
      product_status = "DESC",
      limit = 8,
      page = 1,
    } = req.query;

    let offset = (page - 1) * limit;

    let productSort = [];
    let criteria = {};
    if (category !== "all") {
      criteria = { ...criteria, category_id: category };
    }

    if (price) {
      productSort = [...productSort, ["price", price]];
    }
    if (stock) {
      // const sortStock = ;
      productSort = [...productSort, ["amount_stock", stock]];
    }
    if (product_status) {
      productSort = [...productSort, ["createdAt", product_status]];
    }

    const products = await Product.findAll({
      include: [Category],
      order: productSort,
      where: criteria,
      limit,
      offset,
    });

    return res.json({
      status: "success",
      data: products,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const product = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findByPk(id, { include: [Category] });
    return res.json({
      status: "success",
      data: products,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const productsById = async (req, res) => {
  try {
    const { productsId } = req.query;
    const id = productsId || [];
    const products = await Product.findAll({
      include: [Category],
      order: [["createdAt", "DESC"]],
      where: {
        id: id,
      },
    });
    return res.json({
      status: "success",
      data: products,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(req.body);
    if (!data.category_id) {
      return res.status(400).json({
        status: "error",
        message: "field category is required",
      });
    }
    if (req.file) {
      const { tmp_path, fileName, target_path } = readFileUpload(req.file);

      // Store File Image To Folder /Public/images/${fileName}
      const src = fs.createReadStream(tmp_path); //create stream for origial file path
      const dest = fs.createWriteStream(target_path); //write stream to target path
      src.pipe(dest);

      src.on("end", async () => {
        const createProduct = await Product.create({
          name: data.name,
          image_url: `images/${fileName}`,
          category_id: data.category_id,
          base_price: data.price,
          discount: data?.discount,
          price: data?.discount ? data.price - data?.discount : data.price,
          amount_stock: data.stock,
        });

        return res.json({
          status: "success",
          data: createProduct,
        });
      });
      src.on("error", async () => {
        next(error);
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Image file is required",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const update = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const payload = req.body;

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "product not found",
      });
    }

    const updateData = {
      ...payload,
      price: payload?.discount
        ? payload.price - payload?.discount
        : payload.base_price,
      // base_price as price
      base_price: payload.price,
      discount: payload?.discount,
    };

    if (req.file) {
      const { tmp_path, fileName, target_path } = readFileUpload(req.file);

      // Store File Image To Folder /Public/images/${fileName}
      const src = fs.createReadStream(tmp_path); //create stream for origial file path
      const dest = fs.createWriteStream(target_path); //write stream to target path
      src.pipe(dest);

      src.on("end", async () => {
        let currentImage = `public/${product.image_url}`;

        if (fs.existsSync(currentImage)) {
          fs.unlinkSync(`public/${product.image_url}`);
        }

        await Product.update(
          { ...updateData, image_url: `images/${fileName}` },
          { where: { id: product_id } }
        );
        return res.json({
          status: "success",
          message: "product updated",
        });
      });
      src.on("error", async () => {
        next(error);
      });
    } else {
      await Product.update(
        { ...updateData },
        {
          where: {
            id: product_id,
          },
        }
      );

      return res.json({
        status: "success",
        message: "product updated",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const product_id = req.params.id;

    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "product not found",
      });
    }

    await Product.destroy({ where: { id: product_id } });
    let currentImage = `public/${product.image_url}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    return res.json({
      status: "success",
      message: "prduct deleted",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { index, create, update, destroy, product, productsById };
