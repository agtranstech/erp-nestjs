import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Public } from "./strategies/public.strategy";
import { CreateUserDto } from "@/users/dto/create-user.dto";


@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  @ApiBody({ type: CreateUserDto })
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post("signup")
  @ApiBody({ type: CreateUserDto })
  signUp(@Body() signUpDto: CreateUserDto) {
    const payload = {
      username: signUpDto.username,
      password: signUpDto.password,
    };
    return this.authService.signUp(payload);
  }
}
