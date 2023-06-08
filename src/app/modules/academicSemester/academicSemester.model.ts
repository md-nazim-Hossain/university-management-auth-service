import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import { AcademicSemesterConstant } from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.academicSemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

//handling same year and same semester hooks
academicSemesterSchema.pre('save', async function (next) {
  const isExit = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExit) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester already exists of this year'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
