import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (key: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: key?.path,
        message: key?.message,
      };
    }
  );

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleValidationError;
