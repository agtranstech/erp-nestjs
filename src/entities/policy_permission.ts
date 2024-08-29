import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { policy } from "./policy";
import { resource } from "./resource";

@Index("policy_permission_pkey", ["policy_permission_id"], { unique: true })
@Entity("policy_permission")
export class policy_permission {
  @PrimaryGeneratedColumn({ type: "integer", name: "policy_permission_id" })
  policy_permission_id?: number;

  @Column("boolean", {
    name: "can_view",
    nullable: true,
    default: () => "false",
  })
  can_view?: boolean | null;

  @Column("boolean", {
    name: "can_edit",
    nullable: true,
    default: () => "false",
  })
  can_edit?: boolean | null;

  @Column("boolean", {
    name: "can_delete",
    nullable: true,
    default: () => "false",
  })
  can_delete?: boolean | null;

  @Column("boolean", {
    name: "can_add",
    nullable: true,
    default: () => "false",
  })
  can_add?: boolean | null;

  @ManyToOne(() => policy, (policy) => policy.policy_permissions)
  @JoinColumn([{ name: "policy_id", referencedColumnName: "policy_id" }])
  policy_?: policy;

  @ManyToOne(() => resource, (resource) => resource.policy_permissions)
  @JoinColumn([{ name: "resource_id", referencedColumnName: "resource_id" }])
  resource_?: resource;

  @RelationId(
    (policy_permission: policy_permission) => policy_permission.policy_
  )
  policy_id?: number;

  @RelationId(
    (policy_permission: policy_permission) => policy_permission.resource_
  )
  resource_id?: number;
}
