import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.listen(process.env.PORT, () => {
  console.log(`server is listening in ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
