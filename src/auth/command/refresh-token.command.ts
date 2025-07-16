export class RefreshTokenCommand {
  constructor(
    public readonly userId: number,
    public readonly refreshToken: string,
    public readonly role: 'admin' | 'teacher' | 'student'
  ) {}
}