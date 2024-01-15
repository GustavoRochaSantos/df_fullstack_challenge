import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/UserSignIn.dto';
import { Public } from './setMetadata';
import { RefreshTokenDto } from './dto/RefreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: UserSignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.signIn(
      signInDto.login,
      signInDto.password,
    );

  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refreshToken')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('CONTROLER', refreshTokenDto)
    return await this.authService.refreshToken(refreshTokenDto.refresh_token);

  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
