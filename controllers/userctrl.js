const usermodel = require("../models/userModels");
const bycrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const doctormodel = require("../models/Doctormodel");

const registercontroller = async (req, res) => {
  try {
    const existuser = await usermodel.findOne({ email: req.body.email });
    if (existuser) {
      return res.status(200).send({
        success: false,
        message: "email already exists",
      });
    }
    const password = req.body.password;
    const salt = await bycrypt.genSalt(10);
    const hashpassword = await bycrypt.hash(password, salt);
    req.body.password = hashpassword;
    const newuser = new usermodel(req.body);
    await newuser.save();
    return res.status(200).send({
      success: true,
      message: "register successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: `register controller ${error.message}`,
    });
  }
};
const logincontroller = async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "not a user",
      });
    }
    const ismatch = await bycrypt.compare(req.body.password, user.password);
    if (!ismatch) {
      return res.status(200).send({
        success: false,
        message: "invalid email or password",
      });
    }
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `error in login${error.message}`,
    });
  }
};

const authcontroller = async (req, res) => {
  try {
    const user = await usermodel.findOne({ _id: req.body.userid });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "user does not exist",
      });
    } else {
      return res.status(200).send({
        success: true,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      suuccess: false,
      message: "auth failed",
      error,
    });
  }
};

const doctorcontroller = async (req, res) => {
  try {
    const newdoctor = await doctormodel({ ...req.body, status: "pending" });
    await newdoctor.save();
    const adminuser = await usermodel.findOne({ isAdmin: true });
    const notification = adminuser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newdoctor.firstname} ${newdoctor.lastname} applied for a doctor account  `,
      data: {
        doctorId: newdoctor._id,
        name: `${newdoctor.firstname} ${newdoctor.lastname}`,
        path: "/admin/doctors",
      },
    });
    await usermodel.findByIdAndUpdate(adminuser._id, { notification });
    res.status(201).send({
      success: true,
      message: "doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "doctor account application failed",
    });
  }
};

const notificationcontroller = async (req, res) => {
  try {
    const user = await usermodel.findOne({ _id: req.body.userid });
    const notification = user.notification;
    const seenotification = user.seenotification;
    seenotification.push(...notification);
    user.notification = [];
    user.seenotification = seenotification;
    const updateuser = await user.save();
    return res.status(200).send({
      success: true,
      message: "all notification marked as read",
      updateuser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in notification",
      error,
    });
  }
};

const deleteallnotification = async (req, res) => {
  try {
    const user = await usermodel.findOne({ _id: req.body.userid });
    // user.notification=[];
    user.seenotification = [];
    const updateuser = await user.save();
    return res.status(200).send({
      success: true,
      message: "all notification deleted",
      updateuser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in deletion",
      error,
    });
  }
};

const getalldoccntl = async (req, res) => {
  try {
    const doctors = await doctormodel.find({ status: "Approved" });
    res.status(200).send({
      success: true,
      message: "available doctors",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      message: "no doctor found",
      success: false,
      error,
    });
  }
};

module.exports = {
  logincontroller,
  registercontroller,
  authcontroller,
  doctorcontroller,
  notificationcontroller,
  deleteallnotification,
  getalldoccntl,
};
