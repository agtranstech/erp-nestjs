import { Module } from "@nestjs/common";
import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { UsersModule } from "@/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { user } from "@/entities/user";
import { jwtConstants } from "@/constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@/auth/guards/auth.guard";
import { UsersService } from "@/users/users.service";
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
    TypeOrmModule.forFeature([user]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    UsersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
