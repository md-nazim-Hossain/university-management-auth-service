import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';
import { ZodError } from 'zod';
const handleZodError = (err: ZodError): IGenericErrorResponse => {
  //   const errors: IGenericErrorMessage[] = Object.values(err.errors).map(key => {
  //     return {
  //       path: key?.path,
  //       message: key?.message,
  //     };
  //   });

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: [],
  };
};
export default handleZodError;
