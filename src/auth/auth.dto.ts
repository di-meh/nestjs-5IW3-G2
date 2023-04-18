import { IsDefined, IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsStrongPassword()
  password: string;
}
