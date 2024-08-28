import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { user } from "@/entities/user";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(user)
    private usersRepository: Repository<user>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save({ ...createUserDto });
  }

  findAll(): Promise<user[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<user | null> {
    return this.usersRepository.findOne({
      where: { user_id: id },
      relations: { role_: true },
    });
  }

  findOneByUsername(username: string): Promise<user | null> {
    return this.usersRepository.findOne({
      where: { username: username },
      relations: { role_: true },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.save({ ...updateUserDto, user_id: id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
