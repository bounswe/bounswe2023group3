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
      
      
      if (!request.moderator.isVerified) {
        throw new UnauthorizedException(
          {
            message: 'Moderator is not verified',
            data: null,
            errors: null,
          },
          '401',
        );
      }
      return true;
    }
  }
  