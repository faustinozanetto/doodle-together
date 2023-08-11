import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { SocketWithAuth } from 'src/rooms/types';

@Catch()
export class GatewayExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: SocketWithAuth = host.switchToWs().getClient();

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse();
      const exceptionMessage = exceptionData['message'] ?? exceptionData ?? exception.name;

      console.log({ exceptionMessage });

      return;
    }
  }
}
