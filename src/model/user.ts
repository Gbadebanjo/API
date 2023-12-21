import mongoose, { Schema } from "mongoose";

/*User Interface*/
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

/*User Schema*/
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
