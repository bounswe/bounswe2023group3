import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { ModeratorService } from '../moderator.service';
  
  @Injectable()
  export class ModeratorGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private readonly moderatorService: ModeratorService,
      ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException({
          message: 'Token not found.',
          data: null,
          errors: null,
        },
        '401',);
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: 'very-secret-key'
          }
        );
        const moderator = await this.moderatorService.searchModerator({email: payload.email});
        if (payload.userType != 1) {
          throw new UnauthorizedException({
            message: 'User is not moderator.',
            data: null,
            errors: null,
          },
          '401',);
        }
        request['moderator'] = moderator;
      } catch {
        throw new UnauthorizedException({
          message: 'Token is invalid.',
          data: null,
          errors: null,
        },
        '401',);
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }