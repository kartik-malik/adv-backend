const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async function (req, res, next) {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  try {
    hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ password: hashPassword, name, email });
    let token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    });
  } catch (err) {
    next(err);
  }
};
exports.signin = async function (req, res, next) {
  const password = req.body.password;
  const email = req.body.email;
  try {
    const user = await User.findOne({ where: { email } });
    // res.send({ user });
    let { id, email: mail, name } = user;
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          email: mail,
          name,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        name,
        email: mail,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password",
      });
    }
  } catch (error) {
    return next({
      status: 400,
      message: "Invalid Email/Password",
    });
  }
};
