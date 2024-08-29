import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { role_policy } from "./role_policy";
import { user } from "./user";
import { user_role } from "./user_role";

@Index("role_pkey", ["role_id"], { unique: true })
@Index("role_role_name_key", ["role_name"], { unique: true })
@Entity("role")
export class role {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_id" })
  role_id?: number;

  @Column("character varying", { name: "role_name", unique: true, length: 255 })
  role_name?: string;

  @Column("text", { name: "description", nullable: true })
  description?: string | null;

  @OneToMany(() => role_policy, (role_policy) => role_policy.role_)
  role_policies?: role_policy[];

  @OneToMany(() => user, (user) => user.role_)
  users?: user[];

  @OneToMany(() => user_role, (user_role) => user_role.role_)
  user_roles?: user_role[];
}
