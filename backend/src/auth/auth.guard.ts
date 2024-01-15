import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './setMetadata';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  private extractTokenFromHeader(request: Request): string | undefined {
    // @ts-ignore
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new ForbiddenException('Login expirado!');
    }


    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_TK_SECRET,
      });
      console.log('payload')
      request['user'] = payload;
      request.body.changedByUser = payload.sub;

    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
