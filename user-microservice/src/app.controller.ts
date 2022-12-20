import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { EventPattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'create_user' })
  // @EventPattern('create_user')
  async createUser(User) {
    return await this.appService.createUser(User);
  }

  @MessagePattern({ cmd: 'getAllUsers' })
  async getAllUsers() {
    console.log('yes!!!');
    return await this.appService.getUsers();
  }
}
