import express, { Router } from "express";
import {
  resetPassword,
  emailVerification,
} from "../controllers/emailController";
const emailRoute: Router = express.Router();

emailRoute.get("/verifyEmail", emailVerification);

emailRoute.patch("/resetPassword", resetPassword);

export default emailRoute;
