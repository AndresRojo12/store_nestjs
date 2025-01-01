import { IsString, IsNotEmpty } from 'class-validator'

import { PartialType } from '@nestjs/swagger'

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name : String;
  @IsString()
  @IsNotEmpty()
  readonly lastName : String;
  @IsString()
  @IsNotEmpty()
  readonly phone : String;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
