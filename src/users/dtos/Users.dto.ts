import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsEmail,
  IsStrongPassword,
  Length,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: String;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: String;

  @IsNotEmpty()
  @ApiProperty()
  readonly role: String;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
