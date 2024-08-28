import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { policy } from "./policy";
import { role } from "./role";
import { user_role_policy } from "./user_role_policy";

@Index("role_policy_pkey", ["role_policy_id"], { unique: true })
@Entity("role_policy")
export class role_policy {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_policy_id" })
  role_policy_id?: number;

  @ManyToOne(() => policy, (policy) => policy.role_policies)
  @JoinColumn([{ name: "policy_id", referencedColumnName: "policy_id" }])
  policy_?: policy;

  @ManyToOne(() => role, (role) => role.role_policies)
  @JoinColumn([{ name: "role_id", referencedColumnName: "role_id" }])
  role_?: role;

  @OneToMany(
    () => user_role_policy,
    (user_role_policy) => user_role_policy.role_policy_
  )
  user_role_policies?: user_role_policy[];

  @RelationId((role_policy: role_policy) => role_policy.policy_)
  policy_id?: number;

  @RelationId((role_policy: role_policy) => role_policy.role_)
  role_id?: number;
}
