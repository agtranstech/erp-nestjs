import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { role } from "./role";
import { user } from "./user";

@Index("user_role_pkey", ["user_role_id"], { unique: true })
@Entity("user_role")
export class user_role {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_role_id" })
  user_role_id?: number;

  @ManyToOne(() => role, (role) => role.user_roles)
  @JoinColumn([{ name: "role_id", referencedColumnName: "role_id" }])
  role_?: role;

  @ManyToOne(() => user, (user) => user.user_roles)
  @JoinColumn([{ name: "user_id", referencedColumnName: "user_id" }])
  user_?: user;

  @RelationId((user_role: user_role) => user_role.role_)
  role_id?: number;

  @RelationId((user_role: user_role) => user_role.user_)
  user_id?: number;
}
