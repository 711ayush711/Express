import jsonwebtoken from "jsonwebtoken";

//genrate jwt token and expire in 3 days
const generateToken = (id: string) => {
  let data = { id };
  let token = jsonwebtoken.sign(data, process.env.JWT_SECRET_KEY!, {
    expiresIn: "3d",
  });
  return token;
};
export default generateToken;
