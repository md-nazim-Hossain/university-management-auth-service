import { z } from 'zod';
import { AcademicSemesterConstant } from './academicSemester.constant';

// req-validation
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(
      AcademicSemesterConstant.academicSemesterTitle as [string, ...string[]],
      {
        required_error: 'Title is required',
      }
    ),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum(
      AcademicSemesterConstant.academicSemesterCodes as [string, ...string[]],
      {
        required_error: 'Code is required',
      }
    ),
    startMonth: z.enum(
      AcademicSemesterConstant.academicSemesterMonths as [string, ...string[]],
      {
        required_error: 'Start Month is required',
      }
    ),
    endMonth: z.enum(
      AcademicSemesterConstant.academicSemesterMonths as [string, ...string[]],
      {
        required_error: 'End Month is required',
      }
    ),
  }),
});

const updateSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum(
          AcademicSemesterConstant.academicSemesterTitle as [
            string,
            ...string[]
          ],
          {
            required_error: 'Title is required',
          }
        )
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum(
          AcademicSemesterConstant.academicSemesterCodes as [
            string,
            ...string[]
          ],
          {
            required_error: 'Code is required',
          }
        )
        .optional(),
      startMonth: z
        .enum(
          AcademicSemesterConstant.academicSemesterMonths as [
            string,
            ...string[]
          ],
          {
            required_error: 'Start Month is required',
          }
        )
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Title and Code both are required',
      path: ['body'],
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateSemesterZodSchema,
};
