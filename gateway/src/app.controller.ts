import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/createusers.dto';
@Controller('user')
export class AppController {
  constructor(
    @Inject('USERSERVICE') private readonly communicationClient: ClientProxy,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('register')
  async createUser(@Body() user: CreateUserDto, @Req() req, @Res() res) {
    console.log('Inside register endpoint');

    const obs = await this.communicationClient.send(
      { cmd: 'create_user' },
      user,
    );

    //////////////////
    // the .send returns observable and is directly gets subscribed if we return it directly but sometimes this don't works
    //so here we stored the response observable in variable obs then subscribed it from there and return the stuff from there
    /////////////////

    obs.subscribe((resp) => {
      return res.status(resp.status).send({ response: resp.response });
    });
  }
  @Get('getUsers')
  async getUsers(@Res() res) {
    console.log('Inside getUsers');

    const obs = await this.communicationClient.send({ cmd: 'getAllUsers' }, '');

    obs.subscribe((resp) => {
      return res.status(resp.status).send({ response: resp.response });
    });
  }
}
