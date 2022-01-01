const Product = require("../models/products");
const user = require("../models/user");
exports.postAdvertisement = function (req, res, next) {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const userId = req.body.userId;

  const description = req.body.description;
  Product.create({
    imageUrl,
    title,
    description,
    price,
    userId,
  })
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getAdvertisement = function (req, res, next) {
  const id = req.params.id;
  Product.findByPk(id)
    .then((response) => {
      res.send({ data: response });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getAllAdvertisement = async function (req, res, next) {
  try {
    const data = await Product.findAll({ where: { publishStatus: true } });
    return res.send(data);
  } catch (err) {
    next(err);
  }
};
exports.getAdvertisementOfUser = function (req, res, next) {
  const userId = req.params.userId;
  Product.findAll({ where: { userId }, include: user })
    .then((response) => {
      res.send({ data: response });
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteAdvertisement = async function (req, res, next) {
  const productId = req.params.productId;
  try {
    const data = await Product.destroy({ where: { id: productId } });
    res.send({ message: "deleted succecfully" });
  } catch (err) {
    next(err);
  }
};
exports.updateAdvertisement = async function (req, res, next) {
  const productId = req.params.productId;
  const publishStatus = req.body.publishStatus;
  try {
    const data = await Product.update(
      { publishStatus },
      { where: { id: productId } }
    );
    res.send({ message: "deleted succecfully" });
  } catch (err) {
    next(err);
  }
};
