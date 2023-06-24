import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  student_pass: process.env.DEFAULT_STUDENT_PASSWORD,
  faculty_pass: process.env.DEFAULT_FACULTY_PASSWORD,
};
