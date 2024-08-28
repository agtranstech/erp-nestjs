import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { policy_permission } from "./policy_permission";

@Index("resource_pkey", ["resource_id"], { unique: true })
@Index("resource_resource_name_key", ["resource_name"], { unique: true })
@Entity("resource")
export class resource {
  @PrimaryGeneratedColumn({ type: "integer", name: "resource_id" })
  resource_id?: number;

  @Column("character varying", {
    name: "resource_name",
    unique: true,
    length: 255,
  })
  resource_name?: string;

  @Column("text", { name: "description", nullable: true })
  description?: string | null;

  @OneToMany(
    () => policy_permission,
    (policy_permission) => policy_permission.resource_
  )
  policy_permissions?: policy_permission[];
}
