const express = require("express");
const {
  getalldoctors,
  getallusers,
  changestatus,
} = require("../controllers/adminctrl");
const authmiddleware = require("../middlewares/authmiddleware");
const router = express.Router();

router.get("/getalldoctor", authmiddleware, getalldoctors);
router.get("/getalluser", authmiddleware, getallusers);
router.post("/changestatus", authmiddleware, changestatus);
module.exports = router;
