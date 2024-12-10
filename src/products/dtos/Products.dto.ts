import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive  } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name:String;
  @IsString()
  @IsNotEmpty()

  readonly description: String;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()

  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()

  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()

  readonly imagen: String;
}
