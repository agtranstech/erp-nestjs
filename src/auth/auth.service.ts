import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "@/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(username, pass) {
    const user = await this.usersService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      user_id: user.user_id,
      username: user.username,
      role_id: user.role_id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(payload: CreateUserDto) {
    const user = await this.usersService.create(payload);
    return user;
  }
}
