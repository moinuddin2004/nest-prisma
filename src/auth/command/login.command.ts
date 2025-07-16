import { IsEmail, IsNotEmpty, IsIn, MinLength } from 'class-validator';

export class LoginCommand {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsIn(['admin', 'teacher', 'student'])
  role: 'admin' | 'teacher' | 'student';
}
