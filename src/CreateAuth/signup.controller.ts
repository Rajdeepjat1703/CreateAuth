import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signup(@Body() userData: any): Promise<any> {
    return this.signupService.signup(userData);
  }
}
