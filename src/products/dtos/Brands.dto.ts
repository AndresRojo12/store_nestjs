import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive  } from 'class-validator';


export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  readonly name: String

}
