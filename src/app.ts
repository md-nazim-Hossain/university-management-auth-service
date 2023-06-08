import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorsHandler';
import { UserRoutes } from './app/modules/user/user.routes';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.routes';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application route
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

//Testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

//global error handler
app.use(globalErrorHandler);
export default app;
