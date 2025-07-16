export interface UserStrategy {
  signup(name: string, email: string, password: string): Promise<any>;
  signin(email: string, password: string): Promise<any>;
  
  updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
  validateRefreshToken(userId: number, refreshToken: string): Promise<boolean>;
  removeRefreshToken(userId: number): Promise<void>;
  signinById(id: number): Promise<any>;
}
