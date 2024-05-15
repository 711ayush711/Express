import jsnwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserType from "../../types/userType";
import prisma from "../../utils/prismaClient";

//middleware for protected routing
const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      let token = bearerHeader.split(" ")[1];
      jsnwebtoken.verify(
        token,
        process.env.JWT_SECRET_KEY!,
        async (err, decoded) => {
          if (err) {
            res.status(401).send({ message: "Invalid token" });
          } else {
            let user: UserType | null = await prisma.user.findFirst({
              where: { id: (decoded as any).id },
            });
            (req as any).user = user;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
  }
};
export default protectedRoute;
