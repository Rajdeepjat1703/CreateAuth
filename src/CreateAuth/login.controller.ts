import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() credentials: { email: string; password: string }): Promise<any> {
    return this.loginService.login(credentials);
  }
}
