import { Injectable } from '@nestjs/common';

@Injectable()
export class SignupService {
  private readonly jsonServerUrl = 'http://localhost:3001/users'; 

  async signup(userData: any): Promise<any> {
    try {
    
      const response = await fetch(this.jsonServerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      });

     
      const data = await response.json();

      
      if (response.ok) {
        return {
          message: 'User registered successfully!',
          user: data,
        };
      } else {
        return {
          status: 'error',
          message: 'Failed to register user',
          error: data,
        };
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to register user',
        error: error.message,
      };
    }
  }
}
