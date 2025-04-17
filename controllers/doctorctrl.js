const doctormodel = require("../models/Doctormodel");

const getdoctorInfo = async (req, res) => {
  try {
    const doctor = await doctormodel.find({ userid: req.body.userid });
    return res.status(200).send({
      success: true,
      message: "doctor found",
      data: doctor,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "doctor not found",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const doctor = await doctormodel.findOneAndUpdate(
      { userid: req.body.userid },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "update successfull",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " doctor not found",
      error,
    });
  }
};
const getdoctorbyidcntl = async (req, res) => {
  try {
    const doctor = await doctormodel.findOne({ _id: req.body.doctorid });
    res.status(200).send({
      success: true,
      message: "doctor found",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "doctor not found",
      error,
    });
  }
};

module.exports = { getdoctorInfo, updateProfile, getdoctorbyidcntl };
