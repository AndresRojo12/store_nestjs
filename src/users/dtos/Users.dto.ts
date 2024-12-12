import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsEmail,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly email: String;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: String;

  @IsNotEmpty()
  readonly role: String;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
