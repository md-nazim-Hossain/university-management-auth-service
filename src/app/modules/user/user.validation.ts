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
      guardian: z.object(
        {
          type: z.object({
            father: z
              .object({
                name: z.string({
                  required_error: 'Father name is required',
                }),
                phone: z.string({
                  required_error: 'Father phone is required',
                }),
                occupation: z.string({
                  required_error: 'Father occupation is required',
                }),
              })
              .optional(),
            mother: z
              .object({
                name: z.string({
                  required_error: 'Mother name is required',
                }),
                phone: z.string({
                  required_error: 'Mother phone is required',
                }),
                occupation: z.string({
                  required_error: 'Mother occupation is required',
                }),
              })
              .optional(),
          }),
        },
        {
          required_error: 'Guardian is required',
        }
      ),
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
