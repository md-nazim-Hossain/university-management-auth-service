import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import { UserUtils } from './user.utils';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData: IUser | null = null;
  // default password
  if (!user.password) {
    user.password = config.student_pass as string;
  }

  if (!user?.role) {
    user.role = 'student';
  }
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await UserUtils.generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created student');
    }
    user.student = newStudent[0]?._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created users');
    }

    await session.commitTransaction();
    await session.endSession();
    newUserAllData = newUser[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id })
      .populate({
        path: 'student',
        populate: [
          { path: 'academicSemester' },
          { path: 'academicFaculty' },
          { path: 'academicDepartment' },
        ],
      })
      .lean();
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
