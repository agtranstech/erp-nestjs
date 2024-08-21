export class CreateUserDto {
  username: string;
  password_hash: string;
  is_active: boolean;
}
