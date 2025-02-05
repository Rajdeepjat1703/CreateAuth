import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  private readonly jsonServerUrl = 'http://localhost:3001/users'; // URL of your JSON server

  async login(credentials: { email: string; password: string }): Promise<any> {
    try {
      
      const response = await fetch(this.jsonServerUrl);
      const users = await response.json();

      // Find the user with the matching email and password
      const user = users.find(
        (u: any) => u.email === credentials.email && u.password === credentials.password,
      );

      if (user) {
        return {
          message: 'Login successful!',
          user,
        };
      } else {
        return {
          status: 'error',
          message: 'Invalid email or password',
        };
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to login',
        error: error.message,
      };
    }
  }
}
