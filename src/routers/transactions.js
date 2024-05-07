import express from "express";
import {
  getTransactionsByUserId,
  insertNewTrans,
} from "../models/transactions/transactionModel.js";
const router = express.Router();

// router = {
//     get(),
//     post()
// }
router.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const trans = (await getTransactionsByUserId(authorization)) ?? [];
    console.log(trans);
    res.json({
      status: "success",
      message: "Here are list of the transactions",
      trans,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { authorization } = req.headers;

    const result = await insertNewTrans({ ...req.body, userId: authorization });
    result?._id
      ? res.json({
          status: "success",
          message: "New transaction has been added",
        })
      : res.json({
          status: "error",
          message: "Falied adding transaction",
        });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
export default router;
