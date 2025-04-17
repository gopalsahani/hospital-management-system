const usermodel = require("../models/userModels");
const doctormodel = require("../models/Doctormodel");
const getalldoctors = async (req, res) => {
  try {
    const doctors = await doctormodel.find({});
    return res.status(200).send({
      success: true,
      message: "avilable doctors ",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in finding doctors",
      error,
    });
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await usermodel.find({});
    return res.status(200).send({
      success: true,
      message: "all users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in finding users",
      error,
    });
  }
};

const changestatus = async (req, res) => {
  try {
    const doc = await doctormodel.findOne({ _id: req.body.doctorId });
    doc.status = req.body.status;
    await doc.save();
    const user = await usermodel.findOne({ _id: req.body.userId });
    user.isDoctor = req.body.status === "Approved" ? true : false;
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-update",
      message: `your doctor account request  status ${req.body.status}`,
      onClickPath: "/notification",
    });
    await user.save();
    return res.status(200).send({
      success: true,
      message: "status changed",
      doc,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "doctor not found",
      error,
    });
  }
};

module.exports = { getalldoctors, getallusers, changestatus };
