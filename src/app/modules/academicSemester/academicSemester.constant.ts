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

const AcademicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

const academicSemesterSearchFields = ['title', 'year', 'code'];
const academicSemesterFiltersFields = ['searchTerm', 'title', 'code', 'year'];

export const AcademicSemesterConstant = {
  academicSemesterMonths,
  academicSemesterTitle,
  academicSemesterCodes,
  AcademicSemesterTitleCodeMapper,
  academicSemesterSearchFields,
  academicSemesterFiltersFields,
};
