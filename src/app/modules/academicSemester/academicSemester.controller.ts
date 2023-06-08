import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
const createdSemesters: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(201).json({
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createdSemesters,
};
