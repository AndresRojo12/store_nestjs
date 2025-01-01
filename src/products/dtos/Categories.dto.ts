import { PartialType, ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: String;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
