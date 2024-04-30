import express from "express";
const router = express.Router();

// router = {
//     get(),
//     post()
// }
router.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "get post",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "todo post",
    });
  } catch (error) {
    console.log(error);
  }
});
export default router;
