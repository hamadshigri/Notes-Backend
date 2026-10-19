import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {router} from "./routes/note.route.js";
import cors from "cors";
import authRoute from "./routes/user.route.js";
import { verifyAuthentication } from "./middlewares/auth.middleware.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cors());
connectDB();

app.use("/auth", authRoute);
app.use(verifyAuthentication);
app.use("/", router);


app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
