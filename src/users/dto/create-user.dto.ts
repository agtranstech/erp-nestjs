import { OmitType } from "@nestjs/swagger";
import { user } from "@/entities/user";

export class CreateUserDto extends OmitType(user, ["user_id"]) {}
