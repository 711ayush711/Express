import { Request, Response } from "express";
import hashPassword from "../../utils/hashPassword";
import prisma from "../../utils/prismaClient";
import bcrypt from "bcrypt";
import UserType from "../../types/userType";
import generateToken from "../../utils/genrateToken";
import sendMail from "../../utils/sendMail";

const loginUser = async (req: Request, res: Response) => {
  try {
    let { email: enteredEmail, password: enteredPassword } = req.body;

    //find the user if it exists or not
    let user: UserType | null = await prisma.user.findFirst({
      where: { email: enteredEmail },
    });

    //checking the password with encrypted password
    if (
      user &&
      (await bcrypt.compare(enteredPassword, user.password)) &&
      user.verifyEmail
    ) {
      let token = generateToken(user.id);
      res.status(200).send({ token });
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    let {
      name: userName,
      email: userEmail,
      password: userPassword,
      phoneNumber: userPhoneNumber,
    } = req.body;
    let checkEmail = await prisma.user.findFirst({
      where: { email: userEmail },
    });
    //if email not found create user
    if (!checkEmail) {
      userPassword = await hashPassword(userPassword);
      const user: UserType = await prisma.user.create({
        data: {
          name: userName,
          email: userEmail,
          password: userPassword,
          phoneNumber: userPhoneNumber,
        },
      });
      await sendMail(userEmail, user.id, "emailVerification");
      res.status(201).send(user);
    } else {
      res.status(400).send({ message: "User already exists" });
    }
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    //find all users
    const allUser: UserType[] = await prisma.user.findMany({});
    res.status(200).send(allUser);
  } catch (err) {
    console.log(err);
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    let { oldPassword, newPassword } = req.body;
    //getting user data from request
    let user: UserType | null = (req as any).user;

    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      //change password
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: await hashPassword(newPassword),
        },
      });
      res.status(200).send({ message: "Password Changed" });
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const resetMail = async (req: Request, res: Response) => {
  try {
    let { userEmail } = req.body;
    let user = await prisma.user.findFirst({ where: { email: userEmail } });
    if (user) {
      await sendMail(user.email, user.id, "resetMail");
      res.status(200).send({ message: "Reset mail send" });
    } else {
      res.status(400).send({ message: "No User Found" });
    }
  } catch (err) {
    console.log(err);
  }
};
export { registerUser, loginUser, getUser, changePassword, resetMail };
