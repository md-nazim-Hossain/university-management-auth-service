import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitle,
} from './academicSemester.interface';

const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
const academicSemesterCodes: IAcademicSemesterCodes[] = ['01', '02', '03'];

export const AcademicSemesterConstant = {
  academicSemesterMonths,
  academicSemesterTitle,
  academicSemesterCodes,
};
