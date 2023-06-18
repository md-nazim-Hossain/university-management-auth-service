import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './academicDepartment.interface';
import { model, Schema } from 'mongoose';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExit = await AcademicDepartment.findOne({
    title: this.title,
    academicFaculty: this.academicFaculty,
  });

  if (isExit) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Department already exists'
    );
  }
  next();
});

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
