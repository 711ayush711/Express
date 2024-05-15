import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  getUser,
  changePassword,
  resetMail,
} from "../controllers/userController";
import protectedRoute from "../middleware/protectedRoute";
const userRoute: Router = express.Router();

userRoute.post("/registerUser", registerUser);
userRoute.post("/loginUser", loginUser);
userRoute.patch("/changePassword", protectedRoute, changePassword);
userRoute.post("/resetMail", resetMail);
userRoute.route("/getUser").get(protectedRoute, getUser);
export default userRoute;
