import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidation, loginValidation } from "../utils/validation.js";
import dotevn from "dotenv";
dotevn.config();

export const createUser = async (req, res) => {
  //validation the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already  in the databae
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({ message: "Email already exists" });

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({
      user: user._id,
      data: savedUser,
      message: "user created successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Login
export const loginUser = async (req, res) => {
  //validation the data
  const { error } = loginValidation(req.body);
  if (error)
    return (
      res
        .status(400)
        //.json({ [error.details[0].context.key]: error.details[0].message });
        .json({ err: error })
    );

  //checking if the email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Email is not found" });

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

export const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getuser = async (req, res) => {
  console.log("----------------------------------------------------");
  console.log(req.user._id);
  console.log("----------------------------------------------------");

  try {
    const data = await User.findById(req.user._id);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    // const data = await User.save(req.body)
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    // const data = await User.save(req.body)
  } catch (error) {
    res.status(500).send(error);
  }
};
