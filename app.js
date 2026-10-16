import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import {router} from "./routes/note.route.js";
import cors from "cors";
import authRoute from "./routes/user.route.js";
import { verifyAuthentication } from "./middlewares/auth.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use("/auth", authRoute);
app.use(verifyAuthentication);
app.use("/", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected!");
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  }).catch((err) => {
    console.log(err);
  }) 
