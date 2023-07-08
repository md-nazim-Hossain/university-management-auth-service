import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config/index';

const userSchema = new Schema<IUser, Record<string, unknown>, IUserMethods>(
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
      select: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    passwordChangeAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExist = async function (
  id: string
): Promise<Pick<IUser, 'id' | 'password' | 'status' | 'role'> | null> {
  const user = await User.findOne(
    { id },
    { status: 1, id: 1, password: 1, role: 1 }
  ).lean();

  return user;
};

userSchema.methods.isPasswordMatch = async function (
  givenPass: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPass, savePassword);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bycrypt_salt));
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
