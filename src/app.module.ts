import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './Todo/todo.controller';
import { TodoService } from './Todo/todo.service';
import { TodoModule } from './Todo/todo.module';
import { SignupModule } from './CreateAuth/signup.module';
import { LoginModule } from './CreateAuth/login.module';
@Module({
  imports: [TodoModule,SignupModule,LoginModule],
  controllers: [AppController,TodoController],
  providers: [AppService,TodoService],
})
export class AppModule {}
