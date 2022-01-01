require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/errors");
const port = process.env.PORT || 3000;
const db = require("./db");
const Product = require("./models/products");
const User = require("./models/user");
const Comment = require("./models/comments");
const adRouter = require("./routes/advertisement");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comments");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const sequelize = require("./db");
app.use("/ad", adRouter);
app.use("/user", authRouter);
app.use("/ad/comment", commentRouter);
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);
Product.belongsTo(User, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});
User.hasMany(Product);
Comment.belongsTo(Product, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});
Comment.belongsTo(User, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});
Product.hasMany(Comment);
User.hasMany(Comment);
db.sync({ alter: true }).then((res) => {
  // console.log(res);
  app.listen(port, function () {
    console.log(`Server started on ${port}`);
  });
});
