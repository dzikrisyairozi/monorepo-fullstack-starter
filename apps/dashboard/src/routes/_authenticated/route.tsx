import {
  createFileRoute,
  redirect,
  type LinkProps,
} from '@tanstack/react-router';
import { AuthenticatedLayout } from '../../components/layout/authenticated-layout';
import { useAuthStore } from '../../stores/auth-store';

// /sign-in lands in a later phase - typed loosely so this compiles
// against the current route tree in the meantime.
const SIGN_IN_URL: LinkProps['to'] | (string & {}) = '/sign-in';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const { accessToken } = useAuthStore.getState();
    if (!accessToken) {
      throw redirect({
        to: SIGN_IN_URL,
        search: { redirect: location.href },
      });
    }
  },
  component: AuthenticatedLayout,
});
