import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// KnCcihyNGjLVe0nU

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const MONGO_URL =
  "mongodb+srv://zuhriddin-tech:KnCcihyNGjLVe0nU@cluster0.xcsxxsk.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
  )
  .catch((err) => console.log(err.message));
