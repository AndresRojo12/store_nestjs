import { Controller, Get } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Get()
  getOrders() {
    return 'Esta es la ruta de ordenes'
  }
}
