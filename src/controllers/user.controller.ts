import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUsers() {
    return 'Esta es la ruta de usuarios'
  }
}
