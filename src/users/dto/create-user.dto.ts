import {
  IsDefined,
  IsEmail,
  IsNotEmpty, IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsStrongPassword()
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  username: string;
}
