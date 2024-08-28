import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { policy_permission, resource, user_role_policy } from "@/entities";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(policy_permission)
    private readonly policyPermissionRepository: Repository<policy_permission>,
    @InjectRepository(resource)
    private readonly resourceRepository: Repository<resource>,
    @InjectRepository(user_role_policy)
    private readonly userRolePolicyRepository: Repository<user_role_policy>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming you have user information in the request

    const requiredApi = this.reflector.get("api", context.getHandler());
    if (!requiredApi) {
      return true;
    }

    const resource = await this.resourceRepository.findOne({
      where: {
        resource_name: requiredApi,
      },
    });
    if (!resource) {
      throw new ForbiddenException("Invalid API");
    }

    const userRolePolicy = await this.userRolePolicyRepository.findOne({
      where: { user_id: user.user_id },
      relations: { role_policy_: true },
    });

    const policy = await this.policyPermissionRepository.findOne({
      where: {
        policy_id: userRolePolicy.role_policy_.policy_id,
        resource_id: resource.resource_id,
      },
    });

    if (!policy.can_view) {
      throw new ForbiddenException("Insufficient permissions");
    }
    return true;
  }
}
