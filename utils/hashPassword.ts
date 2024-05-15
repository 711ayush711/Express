import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<any> => {
  try {
    //genrate salt
    const salt: string = await bcrypt.genSalt(10);
    //encrypt the password
    password = await bcrypt.hash(password, salt);
    return password;
  } catch (err) {
    console.log(err);
  }
};

export default hashPassword;
