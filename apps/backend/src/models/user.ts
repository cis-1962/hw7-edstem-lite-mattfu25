import mongoose, { Schema } from 'mongoose';

interface IUser {
  username: string;
  password: string;
}

const schema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', schema);

export default User;
