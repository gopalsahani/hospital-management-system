const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
  getdoctorInfo,
  updateProfile,
  getdoctorbyidcntl,
} = require("../controllers/doctorctrl");
const router = express.Router();

router.get("/getdoctorinfo", authmiddleware, getdoctorInfo);
router.post("/updateProfile", authmiddleware, updateProfile);
router.post("/getdoctorbyid", authmiddleware, getdoctorbyidcntl);
module.exports = router;
