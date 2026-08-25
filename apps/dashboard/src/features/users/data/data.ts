import {
  Ban,
  CircleCheck,
  CircleMinus,
  CreditCard,
  Crown,
  Mail,
  ShieldCheck,
  UserCog,
} from 'lucide-react';
import {
  USER_ROLES,
  USER_STATUSES,
  type UserRole,
  type UserStatus,
} from './schema';

const statusIcons: Record<UserStatus, typeof CircleCheck> = {
  active: CircleCheck,
  inactive: CircleMinus,
  invited: Mail,
  suspended: Ban,
};

const roleIcons: Record<UserRole, typeof CircleCheck> = {
  superadmin: Crown,
  admin: ShieldCheck,
  manager: UserCog,
  cashier: CreditCard,
};

export const userStatusOptions = USER_STATUSES.map((value) => ({
  value,
  icon: statusIcons[value],
}));

export const userRoleOptions = USER_ROLES.map((value) => ({
  value,
  icon: roleIcons[value],
}));
