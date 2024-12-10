import { Controller, Get } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  @Get()
  getCustomers() {
    return 'Esta es la ruta de clientes'
  }
}
