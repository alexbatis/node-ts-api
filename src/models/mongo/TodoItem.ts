import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

export type TodoModel = mongoose.Document & {
  description: String,
  completed: Boolean
};

const todoItemSchema = new mongoose.Schema({
  description: String,
  completed: { type: Boolean, default: false }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
// userSchema.pre("save", function save(next) {
//   const user = this;
//   if (!user.isModified("password")) { return next(); }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err); }
//     bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
//       if (err) { return next(err); }
//       user.password = hash;
//       next();
//     });
//   });
// });

// userSchema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
//   bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
//     cb(err, isMatch);
//   });
// };


/**
 * Helper method for getting user's gravatar.
 */
// userSchema.methods.gravatar = function (size: number) {
//   if (!size) {
//     size = 200;
//   }
//   if (!this.email) {
//     return `https://gravatar.com/avatar/?s=${size}&d=retro`;
//   }
//   const md5 = crypto.createHash("md5").update(this.email).digest("hex");
//   return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
// };

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const TodoItem = mongoose.model("TodoItem", todoItemSchema);
export default TodoItem;