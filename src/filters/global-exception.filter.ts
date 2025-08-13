import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorResponse: any = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message;
      errorResponse = exceptionResponse;
    } else if (
      exception &&
      typeof exception === 'object' &&
      'name' in exception &&
      (exception as any).name?.includes('QueryFailedError')
    ) {
      // TypeORM QueryFailedError
      status = HttpStatus.BAD_REQUEST;
      message = (exception as any).message || 'Database error';
      errorResponse = exception;
    } else if (
      exception &&
      typeof exception === 'object' &&
      'message' in exception
    ) {
      message = (exception as any).message;
      errorResponse = exception;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request?.url,
      message,
      error: errorResponse,
    });
  }
}
