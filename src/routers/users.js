import express from "express";
import {
  insertUser,
  deleteUser,
  getUsers,
  getUserByEmail,
} from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../../util/bcrypt.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getUsers();
    console.log(result);
    res.json({
      status: "success",
      message: "get post",
      result: result,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    //destructure the req.body
    const { email, password } = req.body;
    //find by email and get user from db
    //import from userModel
    const user = await getUserByEmail(email);

    if (user?._id) {
      //check if the password match
      const isMatched = comparePassword(password, user.password);

      user.password = undefined;

      if (isMatched) {
        return res.json({
          status: "success",
          message: "logged in Successfully",
        });
      }
    }
    return res.json({
      status: "error",
      message: "Invalid login Credentials",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const result = await insertUser(req.body);
    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "account creation successful",
          result: result,
        })
      : res.json({
          status: "error",
          message: "Unable to process your request try again later",
        });
  } catch (error) {
    console.log(error);
    let code = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      code = 200;
      error.message =
        "The email is already in use. Please use different account";
    }
    res.status(code).json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const result = await deleteUser(req.body);
    result
      ? res.json({
          status: "success",
          message: "Your task has been Deleted",
        })
      : res.json({
          status: "error",
          message: "Unable to delete, try again later",
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "something went wrong, try again later.",
    });
  }
});
export default router;
