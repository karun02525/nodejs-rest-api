import { v4 as uuidv4 } from "uuid";
import Student from "../model/student.js";

let students = [];

export const createStudent = async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      email: req.body.email,
    });
    const createStudent = await student.save();
    res.status(201).send(createStudent);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getStudents = async (req, res) => {
  try {
    const data = await Student.find({}).sort({ name: 1 });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getStudent = async (req, res) => {
  try {
    //const { _id } = req.params;
    //const data = await Student.find({ _id });
    const _id = req.params._id;
    const data = await Student.findById(_id);

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "no data found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateData);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const data = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send({ message: "id not match" });
    }
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};
