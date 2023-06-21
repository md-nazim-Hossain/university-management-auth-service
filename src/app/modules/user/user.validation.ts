import { z } from 'zod';
import { UserConstant } from './user.constant';

// req-validation
const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum(UserConstant.gender as [string, ...string[]]),
      bloodGroup: z
        .enum(UserConstant.bloodGroup as [string, ...string[]])
        .optional(),
      phone: z.string({
        required_error: 'Phone is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      address: z.object({
        presentAddress: z.string({
          required_error: 'Present address is required',
        }),
        permanentAddress: z.string({
          required_error: 'Permanent address is required',
        }),
      }),
      contact: z.string({
        required_error: 'Contact is required',
      }),
      emergencyContact: z.string({
        required_error: 'Emergency contact is required',
      }),
      guardian: z.object({
        name: z.string({
          required_error: 'Guardian name is required',
        }),
        phone: z.string({
          required_error: 'Guardian phone is required',
        }),
        occupation: z.string({
          required_error: 'Guardian occupation is required',
        }),
        relation: z.string({
          required_error: 'Guardian relation is required',
        }),
      }),
      profileImage: z.string().optional(),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
};
