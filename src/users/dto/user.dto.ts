export class UserDto {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';

  static toDto(user: any): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.role = user.role;

    return dto;
  }
}
