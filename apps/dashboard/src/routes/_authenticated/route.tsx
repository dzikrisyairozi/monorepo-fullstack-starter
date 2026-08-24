import { createFileRoute, redirect } from '@tanstack/react-router';
import { AuthenticatedLayout } from '../../components/layout/authenticated-layout';
import { useAuthStore } from '../../stores/auth-store';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const { accessToken } = useAuthStore.getState();
    if (!accessToken) {
      throw redirect({
        to: '/sign-in',
        search: { redirect: location.href },
      });
    }
  },
  component: AuthenticatedLayout,
});
