const express = require("express");
const Router = express.Router();
const {
  createCategory,
  createRegiter,
  createLogin,
  getCategory,
  getSingleCategory,
  deleteCategory,
  putCategory,
  UserController,
  forgotpassword,
  getCategorys,
  search,
} = require("../controller/index");

const uploadimage = require("../multer/fileUpload");

Router.route("/content").post(uploadimage.single("img"), createCategory);
Router.route("/register").post(createRegiter);
Router.route("/login").post(createLogin);
Router.route("/getCategory").get(getCategory);
Router.route("/getSingleCategory/:_id").get(getSingleCategory);
Router.route("/deleteCategory/:_id").delete(deleteCategory);
Router.route("/getcategory/:id").get(getCategorys);

Router.route("/putCategory/:_id").put(uploadimage.single("img"), putCategory);
Router.route("/sendpasswordlink").post(UserController);
Router.route("/forgot").get(forgotpassword);
Router.route("/search/:key").get(search);

module.exports = Router;
