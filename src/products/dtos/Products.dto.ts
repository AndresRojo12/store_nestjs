import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: String;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()

  readonly description: String;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()

  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()

  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()

  readonly imagen: String;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
