import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  
  @Injectable()
  export class VerificationGuard implements CanActivate {
    constructor() {}
  
    public async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      
      
      if (!request.user.isVerified) {
        throw new UnauthorizedException(
          {
            message: 'User is not verified',
            data: null,
            errors: null,
          },
          '401',
        );
      }
      return true;
    }
  }
  