import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwt: JwtService) { }

  async setTokensOnRequest(response: Response, tokens: Record<string, string>) {
    const token_expiresIn =
      parseInt(process.env.JWT_TK_EXPIRESIN.replace(/\D/gm, '')) || 15;
    const refresh_token_expiresIn =
      parseInt(process.env.JWT_RT_EXPIRESIN.replace(/\D/gm, '')) || 7;

    response.cookie('access_token', tokens.access_token, {
      expires: dayjs().add(token_expiresIn, 'minutes').toDate(),
      httpOnly: true,
      secure: true,
    });
    response.cookie('refresh_token', tokens.refresh_token, {
      expires: dayjs().add(refresh_token_expiresIn, 'days').toDate(),
      httpOnly: true,
      secure: true,
    });
  }

  private async generateTokens(payload: Record<string, string>) {
    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_TK_SECRET,
      expiresIn: process.env.JWT_TK_EXPIRESIN || '15m',
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_RT_SECRET,
      expiresIn: process.env.JWT_RT_EXPIRESIN || '7d',
    });
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async signIn(login: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(login);

      if (!user) throw new NotAcceptableException('User not found');

      const passwordValid = await bcrypt.compare(pass, user.password);

      if (!passwordValid) {
        throw new UnauthorizedException();
      }

      const payload = {
        name: user.fullName,
        email: user.email,
        sub: user.id,
      };

      return await this.generateTokens(payload);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async refreshToken(refresh_token: string): Promise<any> {
    if (!refresh_token) {
      throw new ForbiddenException('Login expirado!');
    }

    try {
      const { iat, exp, ...payload } = await this.jwt.verify(refresh_token, {
        secret: process.env.JWT_RT_SECRET,
      });

      return await this.generateTokens(payload);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
