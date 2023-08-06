import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controllerClass = context.getHandler();
    const responseMessage = this.reflector.get<string>(
      'responseMessage',
      controllerClass,
    );

    return next.handle().pipe(
      map((data) => ({
        errno: 0,
        message: responseMessage || '请求成功',
        data,
      })),
    );
  }
}
