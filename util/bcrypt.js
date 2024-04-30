import bcryptjs from "bcryptjs";
const salt = 15;

//encrypt\
export const hashPassword = (plainPass) => {
  return bcryptjs.hashSync(plainPass, salt);
};

//compare
//returns true or false
export const comparePassword = (plainPass, hashPassword) => {
  return bcryptjs.compareSync(plainPass, hashPassword);
};
