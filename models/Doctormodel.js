const mongoose = require("mongoose");

const doctorschema = new mongoose.Schema(
  {
    userid: {
      type: String,
    },
    firstname: {
      type: String,
      required: [true, "firstname is reqired"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is reqired"],
    },
    phone: {
      type: String,
      reuired: [true, "phone no is reqired"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    website: {
      type: String,
    },
    specialization: {
      type: String,
      required: [true, "specialization is required"],
    },
    experience: {
      type: String,
      reqired: [true, "experience is reqired"],
    },
    feesperConsultation: {
      type: Number,
      required: [true, "fees is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timing: {
      type: Object,
      required: [true, "timing is required"],
    },
  },
  { timestamps: true }
);

const doctormodel = mongoose.model("doctors", doctorschema);

module.exports = doctormodel;
