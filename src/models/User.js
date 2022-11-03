import mongoose from "mongoose";
import bcrypt from "bcrypt";
/** admin, social,login, live upload 구문을 지어야함. */
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  social: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  lives: [{ type: mongoose.Schema.Types.ObjectId, ref: "Live" }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
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
