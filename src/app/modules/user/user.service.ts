import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import { UserUtils } from './user.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';
import { IStudent } from '../student/student.interface';
import { IAdmin } from '../admin/admin.interfcae';
import { Admin } from '../admin/admin.model';

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
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created Student');
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

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData: IUser | null = null;
  // default password
  if (!user.password) {
    user.password = config.faculty_pass as string;
  }

  if (!user?.role) {
    user.role = 'faculty';
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await UserUtils.generateFacultyId();
    user.id = id;
    faculty.id = id;
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created faculty');
    }
    user.faculty = newFaculty[0]?._id;
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
        path: 'faculty',
        populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }],
      })
      .lean();
  }

  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData: IUser | null = null;
  // default password
  if (!user.password) {
    user.password = config.admin_pass as string;
  }

  if (!user?.role) {
    user.role = 'admin';
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await UserUtils.generateAdminId();
    user.id = id;
    admin.id = id;
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created admin');
    }
    user.admin = newAdmin[0]?._id;
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
        path: 'admin',
        populate: [{ path: 'managementDepartment' }],
      })
      .lean();
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
