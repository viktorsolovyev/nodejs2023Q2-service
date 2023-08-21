import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
