import { ROLE_PERMISSIONS } from "../constants/rolePermissions";

export const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.includes(permission);
};