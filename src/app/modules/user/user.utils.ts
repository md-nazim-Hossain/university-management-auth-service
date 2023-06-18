import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';
type Role = 'super_admin' | 'admin' | 'student' | 'faculty';
const findUserId = async (role: Role) => {
  const lastUser = await User.findOne({ role }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();

  const lastDigit = role === 'student' ? 4 : 2;

  return lastUser?.id ? lastUser?.id.substring(lastDigit) : null;
};

const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentUserId = (await findUserId('student')) || '00000';
  let incrementedId = (+currentUserId + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester?.year?.substring(2, 4)}${
    academicSemester?.code
  }${incrementedId}`;

  return incrementedId;
};

const generateFacultyId = async (): Promise<string> => {
  const currentUserId = (await findUserId('faculty')) || '00000';
  let incrementedId = (+currentUserId + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};

const generateAdminId = async (): Promise<string> => {
  const currentUserId = (await findUserId('admin')) || '00000';
  let incrementedId = (+currentUserId + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;
  return incrementedId;
};

export const UserUtils = {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
};
