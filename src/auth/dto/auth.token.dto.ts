import { TokensDto } from './token.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Admin, Teacher, Student } from '@prisma/client';

type AnyUser = Admin | Teacher | Student;

export class AuthTokenDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;

  public static toDto(token: TokensDto, user: AnyUser): AuthTokenDto {
    const dto = new AuthTokenDto();
    dto.user = UserDto.toDto(user);
    dto.accessToken = token.accessToken;
    dto.refreshToken = token.refreshToken;
    return dto;
  }
}
