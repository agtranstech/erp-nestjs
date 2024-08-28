import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { policy_permission } from "./policy_permission";
import { role_policy } from "./role_policy";

@Index("policy_pkey", ["policy_id"], { unique: true })
@Index("policy_policy_name_key", ["policy_name"], { unique: true })
@Entity("policy")
export class policy {
  @PrimaryGeneratedColumn({ type: "integer", name: "policy_id" })
  policy_id?: number;

  @Column("character varying", {
    name: "policy_name",
    unique: true,
    length: 255,
  })
  policy_name?: string;

  @Column("text", { name: "description", nullable: true })
  description?: string | null;

  @OneToMany(
    () => policy_permission,
    (policy_permission) => policy_permission.policy_
  )
  policy_permissions?: policy_permission[];

  @OneToMany(() => role_policy, (role_policy) => role_policy.policy_)
  role_policies?: role_policy[];
}
