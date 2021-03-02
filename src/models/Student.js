import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlenght: [2, "min 2 charcter"],
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: [true, "Email id already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: String,
    min: 10,
    max: 10,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default new mongoose.model("Student", studentSchema);
