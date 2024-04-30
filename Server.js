import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 8000;

import morgan from "morgan";
import userRouter from "./src/routers/users.js";
import transactionRouter from "./src/routers/transactions.js";

// mongoDB connect
import { connectDB } from "./src/config/dbConnect.js";
connectDB();

//middleware
import cors from "cors";

app.use(express.json());
app.use(cors());

//dev env
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${port}`);
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);
