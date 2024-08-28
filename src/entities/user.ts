import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { role } from "./role";
import { user_role } from "./user_role";
import { user_role_policy } from "./user_role_policy";
import { ApiProperty } from "@nestjs/swagger";

@Index("user_pkey", ["user_id"], { unique: true })
@Index("user_username_key", ["username"], { unique: true })
@Entity("user")
export class user {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_id" })
  user_id?: number;

  @ApiProperty()
  @Column("character varying", { name: "username", unique: true, length: 255 })
  username?: string;

  @ApiProperty()
  @Column("character varying", { name: "password", length: 255 })
  password?: string;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  is_active?: boolean | null;

  @ManyToOne(() => role, (role) => role.users)
  @JoinColumn([{ name: "role_id", referencedColumnName: "role_id" }])
  role_?: role;

  @OneToMany(() => user_role, (user_role) => user_role.user_)
  user_roles?: user_role[];

  @OneToMany(
    () => user_role_policy,
    (user_role_policy) => user_role_policy.user_
  )
  user_role_policies?: user_role_policy[];

  @RelationId((user: user) => user.role_)
  role_id?: number | null;
}
