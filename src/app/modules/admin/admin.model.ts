import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interfcae';
import { UserConstant } from '../user/user.constant';

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
    },
    name: {
      firstName: {
        type: String,
        required: [true, 'first name is required'],
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: [true, 'last name is required'],
      },
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
      unique: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, 'date of birth is required'],
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      enum: UserConstant.gender,
    },
    bloodGroup: {
      type: String,
      enum: UserConstant.bloodGroup,
    },
    address: {
      presentAddress: {
        type: String,
        required: [true, 'present address is required'],
      },
      permanentAddress: {
        type: String,
        required: [true, 'permanent address is required'],
      },
    },
    contact: {
      type: String,
      required: [true, 'contact is required'],
      unique: true,
    },
    emergencyContact: {
      type: String,
      required: [true, 'emergency contact is required'],
    },
    guardian: {
      name: {
        type: String,
        required: [true, 'guardian name is required'],
      },
      phone: {
        type: String,
        required: [true, 'guardian phone is required'],
      },
      occupation: {
        type: String,
        required: [true, 'guardian occupation is required'],
      },
      relation: {
        type: String,
        required: [true, 'guardian relation is required'],
      },
    },

    designation: {
      type: String,
      required: [true, 'designation is required'],
    },

    profileImage: {
      type: String,
    },

    managementDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'academic department is required'],
      ref: 'AcademicDepartment',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
