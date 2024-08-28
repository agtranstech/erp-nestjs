import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { role_policy } from "./role_policy";
import { user } from "./user";

@Index("user_role_policy_pkey", ["user_role_policy_id"], { unique: true })
@Entity("user_role_policy")
export class user_role_policy {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_role_policy_id" })
  user_role_policy_id?: number;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "false",
  })
  is_active?: boolean | null;

  @ManyToOne(() => role_policy, (role_policy) => role_policy.user_role_policies)
  @JoinColumn([
    { name: "role_policy_id", referencedColumnName: "role_policy_id" },
  ])
  role_policy_?: role_policy;

  @ManyToOne(() => user, (user) => user.user_role_policies)
  @JoinColumn([{ name: "user_id", referencedColumnName: "user_id" }])
  user_?: user;

  @RelationId(
    (user_role_policy: user_role_policy) => user_role_policy.role_policy_
  )
  role_policy_id?: number;

  @RelationId((user_role_policy: user_role_policy) => user_role_policy.user_)
  user_id?: number;
}
