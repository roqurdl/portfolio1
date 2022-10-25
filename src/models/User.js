import mongoose from "mongoose";
/** admin, social,login, live upload 구문을 지어야함. */
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const User = mongoose.model(`User`, userSchema);

export default User;
