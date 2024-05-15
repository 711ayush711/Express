import express, { Application } from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes";
import emailRoute from "./routes/emailRoutes";
dotenv.config();
const app: Application = express();
const port = process.env.PORT;
//middleware
app.use(express.json());
//routes
app.use("/api/", userRoute);
app.use("/", emailRoute);
//server listen
app.listen(port, () => {
  console.log("server running on port 8000");
});
