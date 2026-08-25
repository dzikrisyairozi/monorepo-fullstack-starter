import { sidebarData } from '../components/layout/data/sidebar-data';
import { type NavUser } from '../components/layout/types';
import { useAuthStore } from '../stores/auth-store';

/**
 * The signed-in user's name/email come from the auth store; avatar has no
 * equivalent there (mock auth never collects one), so it always falls back
 * to the sidebar fixture.
 */
export function useCurrentUser(): NavUser {
  const authUser = useAuthStore((state) => state.user);
  return {
    ...sidebarData.user,
    ...(authUser ? { name: authUser.name, email: authUser.email } : {}),
  };
}
