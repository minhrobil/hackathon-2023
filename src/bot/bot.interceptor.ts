import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { Response } from 'express';

  @Injectable()
  export class HeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const session = request.headers['x-session-id'];
        const token = request.headers['x-token'];
        
        const response: Response = context.switchToHttp().getResponse();
        if(session){
            response.setHeader('x-session-id', session);
        }
        if(token){
            response.setHeader('x-token', token);
        }
        response.status(200)
        return next.handle();
    }
  }
  