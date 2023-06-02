import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASSWORD,
};
