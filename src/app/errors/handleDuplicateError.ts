/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {

  const arrayError = err.message.split(' ');
  let index = arrayError.indexOf("dup");
  const match = arrayError[index-1]
  
  // The extracted value will be in the first capturing group
  const extractedMessage = match.slice(0, -2)

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleDuplicateError;
