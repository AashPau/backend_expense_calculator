import UserSchema from "./UserSchema.js";

// insert user
export const insertUser = (userObj) => {
  console.log(userObj);
  return UserSchema(userObj).save();
};

//get user
export const getUsers = () => {
  return UserSchema.find();
};

export const deleteUser = (_id) => {
  return UserSchema.findByIdAndDelete(_id);
};

// get one user by email
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email }); //because we can write {email: email}
};
