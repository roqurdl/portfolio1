import mongoose from "mongoose";
import bcrypt from "bcrypt";
/** admin, social,login, live upload 구문을 지어야함. */
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const saltRounds = 5;

userSchema.pre(`save`, function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.hash(user.password, saltRounds, function (err, hashedPw) {
      if (err) return next(err);
      user.password = hashedPw;
      next();
    });
  }
});

const User = mongoose.model(`User`, userSchema);

export default User;
