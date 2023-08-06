import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorException, errorMessages } from 'src/exceptions/error.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: ErrorException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errno =
      exception instanceof ErrorException ? exception.getErrorCode() : null;
    const errors =
      exception instanceof ErrorException ? exception.getErrors() : null;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseData = {
      errno,
      message: errors ? errorMessages[exception.message]?.message : null,
    };
    if (Object.keys(errors)?.length) {
      responseData['errors'] = errors;
    }
    response.status(status).json(responseData);
  }
}
