import { AbilityBuilder, PureAbility, AbilityClass, CreateAbility } from "@casl/ability";
import { PrismaQuery, createPrismaAbility } from "@casl/prisma";

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | string;
type Subjects = 'User' | 'Role' | 'Permission' | 'Study' | 'all';

export type AppAbility = PureAbility<[Actions, Subjects], PrismaQuery>;

export const AppAbility = createPrismaAbility as CreateAbility<AppAbility>;

export function defineAbilitiesFor(user: any) {
  const { can, build } = new AbilityBuilder<AppAbility>(AppAbility);

  const roleName = user?.role?.name || '';
  const permissions = user?.role?.permissions || [];

  if (roleName === 'ROOT') {
    can('manage', 'all');
  } else {
    // Dynamic permissions from DB
    permissions.forEach((p: any) => {
      // We use a simple "action-subject" or "permission-name" string convention
      // For simplicity, we map the permission name to actions
      if (p.name === 'view-dashboard') can('read', 'all'); // Basic access
      if (p.name === 'manage-users') can('manage', 'User');
      if (p.name === 'manage-roles') can('manage', 'Role');
      if (p.name === 'view-worklist') can('read', 'Study');
      // Add more as needed based on seed.js
    });
  }

  return build();
}
