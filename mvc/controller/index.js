const ContentSchema = require("../modals/Content");
const User = require("../modals/admin/adminmodel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createCategory = async (req, res) => {
  try {
    let { fname, lname, contact, email, location } = req.body;
    const img = req.file.filename;
    let newData = new ContentSchema({
      fname,
      lname,
      contact,
      email,
      img,
      location,
    });

    const result = await newData.save();

    res.status(201).json({
      status: 201,
      message: "Upload successful",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createRegiter = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log request body
    const { name, email, password, contact } = req.body;
    if (!name || !email || !password || !contact) {
      return res.status(400).json({ message: "Please fill in all details" });
    }
    console.log(name);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user_data = new User(req.body);
    const result = await user_data.save();
    const myToken = await user_data.generateAuthToken(); // Using generateAuthToken method

    res.status(201).json({
      result,
      message: "Token was generated successfully",
      token: myToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please fill in all the details" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "abhisinghxteam@gmail.com",
            pass: "zplv biax gpyu ssjk",
          },
        });

        const mailOptions = {
          from: "abhisinghxteam@gmail.com",
          to: email,

          subject: "Login Successful",
          text: "You have successfully  login pls create the resumre Template.",
        };
        console.log(email);
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return res.status(201).send({
          user,
          message: "Login was successful",
        });
      } else {
        return res.status(401).send({ message: "Invalid password" });
      }
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "An error occurred",
    });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "abhisinghxteam@gmail.com",
    pass: "zplv biax gpyu ssjk",
  },
});

let secretKey = "gdshskfjkdggndh";

const UserController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ status: 400, message: "Please provide your email" });
  }

  try {
    const userFind = await User.findOne({ email });

    if (!userFind) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const token = jwt.sign({ _id: userFind._id }, secretKey, {
      expiresIn: "120s",
    });

    const setUserToken = await User.findByIdAndUpdate(
      { _id: userFind._id },
      { verifytoken: token },
      { new: true }
    );

    if (!setUserToken) {
      return res
        .status(500)
        .json({ status: 500, message: "Failed to update user token" });
    }

    const mailOptions = {
      user: "abhisinghxteam@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `Click on the following link to reset your password: <a href="http://localhost:3000/forgotpassword/${userFind._id}/${token}">Reset Password</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email", error);
        return res.status(500).json({ status: 500, message: "Email not sent" });
      } else {
        console.log("Email sent successfully", info.response);
        return res
          .status(200)
          .json({ status: 200, message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

const getCategory = async (req, res) => {
  try {
    let data = await ContentSchema.find();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const forgotpassword = async (req, res) => {
  const { id, token } = req.params;

  try {
    const validuser = await User.findOne({
      _id: id,
      verifytoken: token,
    });

    const verifyToken = jwt.verify(token, keysecret);

    console.log(verifyToken);

    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

// const changePassword = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     user.password = password;
//     await user.save();
//     console.log("save", user);
//     return res.status(200).json({
//       status:200,
//       data:user,
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// };

// single data gte krne ke api

const getSingleCategory = async (req, res) => {
  try {
    const data = await ContentSchema.findOne({ _id: req.params._id });
    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCategory = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await ContentSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};

const getCategorys = async (req, res) => {
  try {
    const result = await ContentSchema.findOne({ _id: req.params.id });

    if (result) {
      res.send(result);
    } else {
      res.status(404).json({ error: "No Data Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putCategory = async (req, res) => {
  try {
    let { fname, lname, contact, email, location } = req.body;
    let img = null;

    if (req.file) {
      img = req.file.filename;
    }

    let data = await ContentSchema.updateOne(
      { _id: req.params._id },
      { $set: { fname, lname, contact, email, img, location } }
    );
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const search = async (req, res) => {
  try {
    const key = req.params.key; // Get the search key from request parameters

    const result = await ContentSchema.find({
      $or: [
        { fname: { $regex: new RegExp(key, "i") } },
        { lname: { $regex: new RegExp(key, "i") } },
        { contact: { $regex: new RegExp(key, "i") } },
        { location: { $regex: new RegExp(key, "i") } },
        { email: { $regex: new RegExp(key, "i") } },
      ],
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCategory,
  createRegiter,
  createLogin,
  getCategory,
  getSingleCategory,
  deleteCategory,
  putCategory,
  UserController,
  getCategorys,
  forgotpassword,
  search,
};
