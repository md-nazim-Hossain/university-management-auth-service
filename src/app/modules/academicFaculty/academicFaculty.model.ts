import { model, Schema } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicFacultySchema.pre('save', async function (next) {
  const isExit = await AcademicFaculty.findOne({
    title: this.title,
  });

  if (isExit) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic faculty already exists');
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
