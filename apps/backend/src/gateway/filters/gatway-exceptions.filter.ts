import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class GatewayExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, _host: ArgumentsHost) {
    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse();
      const exceptionMessage = exceptionData['message'] ?? exceptionData ?? exception.name;

      console.log({ exceptionMessage });

      return;
    }
  }
}
