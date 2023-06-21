import { z } from 'zod';
import { UserConstant } from '../user/user.constant';

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),

    dateOfBirth: z.string().optional(),
    gender: z.enum(UserConstant.gender as [string, ...string[]]).optional(),
    bloodGroup: z
      .enum(UserConstant.bloodGroup as [string, ...string[]])
      .optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z
      .object({
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
      })
      .optional(),
    contact: z.string().optional(),
    emergencyContact: z.string().optional(),
    guardian: z
      .object({
        name: z
          .string({
            required_error: 'Guardian name is required',
          })
          .optional(),
        phone: z
          .string({
            required_error: 'Guardian phone is required',
          })
          .optional(),
        occupation: z
          .string({
            required_error: 'Guardian occupation is required',
          })
          .optional(),
        relation: z
          .string({
            required_error: 'Guardian relation is required',
          })
          .optional(),
      })
      .optional(),
    profileImage: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicSemester: z.string().optional(),
  }),
});

export const StudentValidation = {
  updateStudentZodSchema,
};
