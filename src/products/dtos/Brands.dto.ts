import { PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive  } from 'class-validator';


export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  readonly name: String

}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {

}
