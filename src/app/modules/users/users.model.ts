import { Model, Schema, model } from 'mongoose';
import { IUser } from './users.interface';

type UserModel = Model<IUser, object | NonNullable<unknown>>;

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
    },
    role: {
      type: String,
      required: [true, 'role is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
