import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import hashPassword from "../../utils/hashPassword";
import UserType from "../../types/userType";
const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    const userId = req.query.userId;
    if (userId) {
      await prisma.user.update({
        where: {
          id: userId as string,
        },
        data: { password: await hashPassword(newPassword) },
      });
      res.status(200).send({ message: "Password reset" });
    } else {
      res.status(400).send({ message: "Password can't be reset" });
    }
  } catch (err) {
    console.log(err);
  }
};

const emailVerification = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    let user: UserType | null = await prisma.user.findFirst({
      where: { id: userId as string },
    });
    if (user) {
      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: { verifyEmail: true },
      });
      res.status(200).send({ message: "User email verified" });
    } else {
      res.status(400).send({ message: "email is not verified" });
    }
  } catch (err) {
    console.log(err);
  }
};
export { emailVerification, resetPassword };
