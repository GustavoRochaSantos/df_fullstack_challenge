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
    const tokens = await this.authService.signIn(
      signInDto.login,
      signInDto.password,
    );

    await this.authService.setTokensOnRequest(response, tokens);

    return;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refreshToken')
  async refreshToken(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.refreshToken(req.cookies.refresh_token);

    return await this.authService.setTokensOnRequest(response, tokens);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
