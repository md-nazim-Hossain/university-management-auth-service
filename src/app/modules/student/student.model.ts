import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';
import { UserConstant } from '../user/user.constant';

export const studentSchema = new Schema<IStudent, StudentModel>(
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
      required: [true, 'guardian is required'],
      type: {
        father: {
          name: {
            type: String,
          },
          phone: {
            type: String,
          },
          occupation: {
            type: String,
          },
        },
        mother: {
          name: {
            type: String,
          },
          phone: {
            type: String,
          },
          occupation: {
            type: String,
          },
        },
      },
    },

    profileImage: {
      type: String,
    },

    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'academic faculty is required'],
      ref: 'AcademicFaculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'academic department is required'],
      ref: 'AcademicDepartment',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'academic semester is required'],
      ref: 'AcademicSemester',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
