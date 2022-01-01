const {
  getAllAdvertisement,
  postAdvertisement,
  getAdvertisement,
  getAdvertisementOfUser,
  deleteAdvertisement,
  updateAdvertisement,
} = require("../handlers/advertisement");
const express = require("express");
const { loginRequired, ensureCorrectUser } = require("../middlewares/auth");
const router = express.Router();
router.get("/", getAllAdvertisement);
router.get("/:id", getAdvertisement);
router.post("/", loginRequired, postAdvertisement);
router.get("/user/:userId", loginRequired, getAdvertisementOfUser);
router.delete(
  "/user/:userId/:productId",
  loginRequired,
  ensureCorrectUser,
  deleteAdvertisement
);
router.put(
  "/user/:userId/:productId",
  loginRequired,
  ensureCorrectUser,
  updateAdvertisement
);

module.exports = router;
